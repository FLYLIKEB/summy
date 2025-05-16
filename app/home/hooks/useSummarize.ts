import { useState } from 'react';
import { EXAMPLE_SUMMARY } from '../constants';
import axios from 'axios';
import { 
  API_URL, 
  API_TIMEOUT, 
  sanitizeInput, 
  getSummaryPrompt,
  parseJsonResponse,
  createFallbackResponse
} from '../../lib/client-api';

// 개발 환경에서만 로그 출력
const logDebug = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[useSummarize] ${message}`, data || '');
  }
};

// 샘플 요약 (폴백용)
const SAMPLE_SUMMARY = `
1. 주요 내용
- 프로젝트 상황: 프로젝트와 관련된 구체적인 논의가 진행 중이며 기능 개발 및 디자인 작업 진행 중
- 진행 상황: 전체 진행률 약 75% 완료, 핵심 기능 구현 완료
- 기타 정보: 팀원들의 역할 분담이 명확하게 이루어짐

2. 참여자별 발언
- 지우: 담당 업무 보고, 프론트엔드 개발 80% 완료
- 나: 디자인 및 UI 개선 작업 진행 중, 백엔드 70% 완료

3. 다음 단계
- 다음 작업 목록: 나머지 기능 구현 및 테스트 진행
- 추가 작업 계획: 버그 수정 및 디자인 개선
- 일정 계획: 다음 주 기능 완료 예정
`;

/**
 * 대화 내용 요약 기능을 관리하는 커스텀 훅
 * AI를 통해 대화 내용을 분석하고 요약합니다.
 * 
 * @returns {Object} 요약 관련 상태와 핸들러
 */
export const useSummarize = () => {
  // 요약 처리 중 상태
  const [isSummarizing, setIsSummarizing] = useState(false);
  // 요약 결과
  const [result, setResult] = useState<string>('');
  // 에러 상태
  const [error, setError] = useState<string | null>(null);
  // 재시도 횟수
  const [retryCount, setRetryCount] = useState(0);
  // 최대 재시도 횟수
  const MAX_RETRIES = 3;

  /**
   * 입력된 텍스트를 요약하는 함수
   * 외부 API를 직접 호출하여 주요 내용을 추출하고 구조화된 요약을 생성합니다.
   * 
   * @param input - 요약할 텍스트 내용
   */
  const handleSummarize = async (input: string) => {
    if (!input || input.trim() === '') {
      setError('요약할 내용을 입력해주세요.');
      return;
    }
    
    setIsSummarizing(true);
    setError(null);
    
    logDebug('요약 요청 시작', { 
      inputLength: input.length, 
      apiUrl: API_URL,
      startTime: new Date().toISOString() 
    });
    
    try {
      // 입력 텍스트 정리 (최대 3000자)
      const sanitizedMessage = sanitizeInput(input, 3000);
      
      // 요약 프롬프트 생성
      const prompt = getSummaryPrompt(sanitizedMessage);
      
      // 외부 API 직접 호출
      const startTime = Date.now();
      const response = await axios.post(API_URL, {
        message: prompt
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: API_TIMEOUT
      });
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // 전체 응답 로깅
      console.log('[useSummarize] 전체 응답 데이터:', JSON.stringify(response.data, null, 2));
      
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const content = response.data.choices[0].message.content;
        
        try {
          // JSON 응답 파싱
          const parsedJson = parseJsonResponse(content);
          
          // 파싱된 JSON을 저장
          const enhancedContent = JSON.stringify({
            summary: parsedJson.summary,
            metadata: parsedJson.metadata
          }, null, 2);
          
          setResult(enhancedContent);
          
          // 메타데이터 로깅
          console.log('[useSummarize] 파싱된 데이터:', {
            summary: Object.keys(parsedJson.summary || {}),
            participants: parsedJson.metadata?.participants,
            keywords: Array.isArray(parsedJson.metadata?.keywords) 
              ? `${parsedJson.metadata?.keywords.length}개 (${parsedJson.metadata?.keywords.join(', ')})` 
              : parsedJson.metadata?.keywords,
            time: parsedJson.metadata?.time,
            progress: parsedJson.metadata?.progress
          });
        } catch (parseError) {
          console.error('[useSummarize] JSON 파싱 오류:', parseError);
          // 파싱 실패 시 원본 텍스트 사용
          setResult(content);
        }
        
        logDebug('요약 결과 설정 완료', { responseTime: `${responseTime}ms` });
        
        // 성공 시 재시도 카운트 초기화
        setRetryCount(0);
      } else if (response.data?.error) {
        // API에서 반환된 오류
        throw new Error(response.data.error);
      } else {
        throw new Error('응답 데이터 형식이 올바르지 않습니다.');
      }
    } catch (error: any) {
      console.error('요약 중 오류가 발생했습니다:', error);
      
      // 세부적인 에러 메시지 처리
      let errorMessage = '요약을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.';
      let errorType = 'unknown';
      let shouldRetry = false;
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = '요청 시간이 초과되었습니다. 인터넷 연결을 확인하고 다시 시도해주세요.';
        errorType = 'timeout';
        shouldRetry = true; // 타임아웃은 재시도
      } else if (error.response) {
        // 서버 응답이 있는 경우
        errorType = `http_${error.response.status}`;
        if (error.response.status === 429) {
          errorMessage = '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
          shouldRetry = true; // 429 오류는 재시도
        } else if (error.response.status >= 500) {
          errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
          shouldRetry = true; // 서버 오류는 재시도
        }
        
        // API에서 반환된 오류 메시지가 있으면 사용
        if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        }
      } else if (error.request) {
        // 요청은 보냈지만 응답이 없는 경우
        errorMessage = '서버에 연결할 수 없습니다. 인터넷 연결을 확인하고 다시 시도해주세요.';
        errorType = 'network';
        shouldRetry = true; // 네트워크 오류는 재시도
      } else if (error.message) {
        // 기타 오류 (API에서 반환된 오류 등)
        errorMessage = error.message;
      }
      
      logDebug('API 오류 발생', { 
        errorType, 
        message: error.message, 
        retryCount: retryCount,
        maxRetries: MAX_RETRIES,
        shouldRetry
      });
      
      // 재시도 로직
      if (shouldRetry && retryCount < MAX_RETRIES) {
        logDebug('요청 재시도 중', { attempt: retryCount + 1, maxRetries: MAX_RETRIES });
        setRetryCount(prevCount => prevCount + 1);
        
        // 지연 후 재시도 (지수 백오프 적용: 2초, 4초, 8초...)
        const retryDelay = 2000 * Math.pow(2, retryCount); // 2초, 4초, 8초...
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        
        // 재귀적으로 다시 요청
        setIsSummarizing(false);
        handleSummarize(input);
        return;
      }
      
      // 개발 환경에서는 폴백 응답 사용
      if (process.env.NODE_ENV === 'development') {
        logDebug('개발 환경에서 폴백 응답 사용');
        await new Promise(resolve => setTimeout(resolve, 1500));
        setResult(SAMPLE_SUMMARY);
        setRetryCount(0); // 재시도 카운트 초기화
        return;
      }
      
      setError(errorMessage);
      setResult('');
      setRetryCount(0); // 재시도 카운트 초기화
    } finally {
      setIsSummarizing(false);
      logDebug('요약 요청 종료');
    }
  };

  return {
    isSummarizing,
    result,
    error,
    handleSummarize
  };
}; 