import { NextResponse } from 'next/server';
import axios from 'axios';

// 외부 API URL
const API_URL = process.env.NEXT_PUBLIC_XAI_API_URL || 'http://52.78.150.124:8080/api/xai/complete';

// 타임아웃 설정 (60초로 증가)
const API_TIMEOUT = 60000;

// 입력 텍스트 정리 및 크기 제한 함수
const sanitizeInput = (text: string): string => {
  // 텍스트가 너무 길면 줄임 (최대 3000자)
  const MAX_LENGTH = 3000;
  if (text.length > MAX_LENGTH) {
    return text.substring(0, MAX_LENGTH) + "... (생략됨)";
  }
  return text;
};

export async function POST(request: Request) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    
    // 입력 텍스트 정리
    const sanitizedMessage = sanitizeInput(body.message || '');
    
    // 요약 작업에 필요한 지시문 추가 - 마크다운이 아닌 일반 텍스트 형식으로 응답 요청
    const enhancedPrompt = `다음 대화 내용을 요약해주세요. 마크다운 문법(*, #, - 등)을 사용하지 말고 일반 텍스트로 응답해주세요.

다음 형식으로 요약해주세요:
1. 주요 내용
- 프로젝트 상황
- 진행 상황
- 기타 정보

2. 참여자별 발언
- 이름: 담당, 진행 상황
- 이름: 담당, 진행 상황
- 이름: 담당, 진행 상황

3. 다음 단계
- 다음 작업 목록
- 추가 작업 계획
- 일정 계획

위 형식으로 대화 내용을 요약해주세요. 참여자가 누구인지, 어떤 내용이 논의되었는지 파악하여 정리해주세요.

대화 내용:
${sanitizedMessage}`;
    
    // API 요청 전송 - 요약 지시어 포함
    console.log(`[API Proxy] 요청 전송 시작: ${new Date().toISOString()}`);
    console.log(`[API Proxy] 요청 데이터 길이: ${enhancedPrompt.length}자`);
    
    const response = await axios.post(API_URL, {
      message: enhancedPrompt
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: API_TIMEOUT
    });
    
    console.log(`[API Proxy] 응답 수신 완료: ${new Date().toISOString()}`);
    
    // 응답 전달
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('프록시 API 오류:', error);
    
    // 에러 응답 생성
    let status = 500;
    let message = '서버 오류가 발생했습니다';
    
    if (error.response) {
      // 서버에서 응답이 왔지만 에러 상태 코드인 경우
      status = error.response.status;
      message = error.response.data?.message || '요청 처리 중 오류가 발생했습니다';
      console.error(`[API Proxy] 서버 응답 오류: ${status}`);
    } else if (error.code === 'ECONNABORTED') {
      // 타임아웃 발생
      status = 408;
      message = '요청 시간이 초과되었습니다';
      console.error(`[API Proxy] 타임아웃 발생: ${API_TIMEOUT}ms 초과`);
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      status = 503;
      message = '서비스에 연결할 수 없습니다';
      console.error(`[API Proxy] 서비스 연결 불가`);
    }
    
    // 개발 환경에서는 샘플 응답 제공
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Proxy] 개발 환경에서 샘플 응답 제공');
      return NextResponse.json({
        id: "sample-response",
        object: "chat.completion",
        created: Date.now(),
        model: "sample-model",
        choices: [
          {
            message: {
              role: "assistant",
              content: `
1. 주요 내용
- 프로젝트 상황: 프로젝트와 관련된 구체적인 논의가 없으며, 대화는 주로 자기소개에 관한 것임
- 진행 상황: 해당 없음
- 기타 정보: 첫 만남과 자기 소개에 관한 가벼운 대화

2. 참여자별 발언
- 지우: 자기소개를 하고 상대방의 나이를 물어봄
- 나: 간단한 자기소개와 장난스러운 대답

3. 다음 단계
- 다음 작업 목록: 없음
- 추가 작업 계획: 없음
- 일정 계획: 없음
`
            },
            index: 0,
            finishReason: null
          }
        ],
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0
        }
      });
    }
    
    return NextResponse.json(
      { error: message }, 
      { status }
    );
  }
} 