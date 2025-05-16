import { useState, useEffect } from 'react';
import { ResponseStyle } from '../types';
import axios from 'axios';
import { 
  API_URL, 
  API_TIMEOUT, 
  sanitizeInput, 
  getResponsePrompt,
  parseJsonResponse
} from '../../lib/client-api';
import { DEFAULT_VALUES } from '../../constants/templates';

// API 응답 형식 정의
interface ApiResponse {
  /** 생성된 답변 텍스트 */
  response: string;
  /** 답변 작성 이유 목록 */
  reasons: string[];
  /** 사용된 답변 스타일 */
  style: ResponseStyle;
  /** 사용자 이름 */
  userName: string;
  /** 참여자 수 */
  participants?: number;
  /** 키워드 수 */
  keywords?: number;
  /** 시간 */
  time?: string;
  /** 진행률 */
  progress?: number;
  /** 오류 메시지 (있을 경우) */
  error?: string;
}

// 추가 통계 데이터 타입 정의
interface ResponseData {
  participants: number;
  keywords: number | string[];
  time: string;
  progress: number;
}

// 에러 발생시 기본 응답
const DEFAULT_RESPONSES = {
  formal: {
    response: '안녕하세요. 회의 내용을 잘 확인했습니다. 제안하신 사항들에 대해 검토 후 다음 주 월요일까지 피드백 드리도록 하겠습니다.',
    reasons: [
      "회의에서 제안된 내용에 대한 확인이 필요했습니다.",
      "향후 피드백 일정을 명확히 제시하여 기대치를 설정했습니다.",
      "정중한 어조로 전문적인 관계를 유지했습니다."
    ],
    userName: DEFAULT_VALUES.userName
  },
  friendly: {
    response: '안녕하세요! 회의 내용 잘 확인했어요. 제안해주신 내용들 정말 좋네요. 다음 주 월요일까지 검토하고 피드백 드릴게요!',
    reasons: [
      "친근한 어조로 소통하여 관계를 돈독히 하고자 했습니다.",
      "긍정적인 평가를 통해 제안에 대한 감사를 표현했습니다.",
      "명확한 일정을 제시하여 기대치를 관리했습니다."
    ],
    userName: DEFAULT_VALUES.userName
  },
  concise: {
    response: '회의 내용 확인했습니다. 다음 주 월요일까지 피드백 드리겠습니다.',
    reasons: [
      "핵심 정보만 간결하게 전달했습니다.",
      "시간 효율성을 위해 불필요한 내용을 생략했습니다.",
      "명확한 후속 조치를 약속했습니다."
    ],
    userName: DEFAULT_VALUES.userName
  }
};

// 요약 정보를 기반으로 응답 생성
const generateResponseFromSummary = (summary: any, style: ResponseStyle): { response: string, reasons: string[] } => {
  const mainPoints = summary?.mainPoints || [];
  const nextSteps = summary?.nextSteps || [];
  
  // 스타일에 따른 응답 생성
  let response = '';
  let reasons = [];
  
  switch(style) {
    case 'formal':
      response = `안녕하세요. 회의 내용을 확인했습니다.\n\n${mainPoints.length > 0 ? `논의된 주요 내용은 다음과 같습니다:\n- ${mainPoints.join('\n- ')}\n\n` : ''}${nextSteps.length > 0 ? `다음 단계는 다음과 같습니다:\n- ${nextSteps.join('\n- ')}` : ''}`;
      reasons = [
        "정중한 인사로 전문성을 유지했습니다.",
        "논의된 주요 내용을 명확하게 요약했습니다.",
        "다음 단계를 체계적으로 정리했습니다."
      ];
      break;
    case 'friendly':
      response = `안녕하세요! 회의 내용 살펴봤어요.\n\n${mainPoints.length > 0 ? `주요 내용은 이렇게 정리할 수 있어요:\n- ${mainPoints.join('\n- ')}\n\n` : ''}${nextSteps.length > 0 ? `앞으로 할 일은 다음과 같아요:\n- ${nextSteps.join('\n- ')}` : ''}`;
      reasons = [
        "친근한 인사로 편안한 분위기를 조성했습니다.",
        "주요 내용을 이해하기 쉽게 정리했습니다.",
        "앞으로의 계획을 명확하게 공유했습니다."
      ];
      break;
    case 'concise':
      response = `회의 요약:\n${mainPoints.length > 0 ? `- ${mainPoints.join('\n- ')}\n` : ''}${nextSteps.length > 0 ? `\n다음 단계:\n- ${nextSteps.join('\n- ')}` : ''}`;
      reasons = [
        "불필요한 인사말을 생략하고 핵심만 전달했습니다.",
        "요점만 간결하게 정리했습니다.",
        "다음 단계를 명확하게 제시했습니다."
      ];
      break;
    default:
      response = DEFAULT_RESPONSES.formal.response;
      reasons = DEFAULT_RESPONSES.formal.reasons;
  }
  
  return { response, reasons };
};

/**
 * 답변 제안 기능을 관리하는 커스텀 훅
 * 답변 생성, 스타일 변경, 편집 기능을 제공합니다.
 * 
 * @returns {Object} 답변 제안 관련 상태와 핸들러
 */
export const useResponse = () => {
  // 답변 제안 로딩 상태
  const [isSuggesting, setIsSuggesting] = useState(false);
  // 제안된 답변 내용
  const [suggestedResponse, setSuggestedResponse] = useState<string>('');
  // 답변 작성 이유 목록
  const [responseReasons, setResponseReasons] = useState<string[]>([]);
  // 선택된 답변 스타일 (정중한, 친근한, 간결한)
  const [selectedStyle, setSelectedStyle] = useState<ResponseStyle>('formal');
  // 답변 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  // 편집 중인 답변 내용
  const [editedResponse, setEditedResponse] = useState<string>('');
  // 답변 작성 이유 표시 여부
  const [showReason, setShowReason] = useState(false);
  // 오류 상태
  const [error, setError] = useState<string | null>(null);
  // 사용자 이름
  const [userName, setUserName] = useState<string>(DEFAULT_VALUES.userName);
  // 추가 통계 데이터
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  /**
   * 사용자 이름을 설정하는 함수
   * @param name - 설정할 사용자 이름
   */
  const handleSetUserName = (name: string) => {
    if (name && name.trim() !== '') {
      setUserName(name);
      // 로컬 스토리지에 저장하여 다음 방문 시에도 사용
      localStorage.setItem('summy_userName', name);
      
      // 이름 변경 후 이미 생성된 응답이 있다면 API 다시 호출
      if (suggestedResponse) {
        console.log(`[useResponse] 이름 변경 감지: ${name}. 응답 재생성 시작`);
        // 기존 응답을 입력으로 사용하여 새 이름으로 응답 재생성
        setIsSuggesting(true);
        
        // 입력 텍스트 정리
        const sanitizedMessage = sanitizeInput(suggestedResponse, 2000);
        
        // 응답 프롬프트 생성 (새 이름으로)
        const prompt = getResponsePrompt(sanitizedMessage, { 
          style: selectedStyle, 
          userName: name
        });
        
        // API 호출
        axios.post(API_URL, {
          message: prompt
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: API_TIMEOUT
        }).then(response => {
          if (response.data && response.data.choices && response.data.choices.length > 0) {
            const content = response.data.choices[0].message.content;
            
            try {
              // JSON 응답 파싱
              const parsedJson = parseJsonResponse(content);
              
              // 응답 데이터 추출
              const answer = parsedJson.response || '응답을 생성할 수 없습니다.';
              const reasons = parsedJson.reasons || [];
              
              console.log('[useResponse] 이름 변경 후 새 응답 생성 완료:', { answer, reasons: reasons.length });
              
              setSuggestedResponse(answer);
              setEditedResponse(answer);
              setResponseReasons(reasons);
            } catch (parseError) {
              console.error('[useResponse] 이름 변경 후 JSON 파싱 오류:', parseError);
            }
          }
        }).catch(error => {
          console.error('[useResponse] 이름 변경 후 API 호출 오류:', error);
        }).finally(() => {
          setIsSuggesting(false);
        });
      }
    }
  };

  // 컴포넌트 마운트 시 로컬 스토리지에서 사용자 이름 로드
  useEffect(() => {
    const savedName = localStorage.getItem('summy_userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  /**
   * 답변을 제안하는 함수
   * AI를 통해 입력된 내용에 대한 적절한 답변을 생성합니다.
   * 
   * @param input - 답변을 생성할 입력 텍스트
   */
  const handleSuggestResponse = async (input: string) => {
    if (!input || input.trim() === '') {
      setError('입력된 내용이 없습니다.');
      return;
    }
    
    setIsSuggesting(true);
    setError(null);
    
    try {
      console.log(`[useResponse] 요청 시작: ${selectedStyle} 스타일로 답변 생성`);
      
      // 입력 텍스트 정리 (최대 2000자)
      const sanitizedMessage = sanitizeInput(input, 2000);
      
      // 응답 프롬프트 생성
      const prompt = getResponsePrompt(sanitizedMessage, { 
        style: selectedStyle, 
        userName: userName  // 현재 사용자 이름 전달
      });
      
      // 외부 API 직접 호출
      const response = await axios.post(API_URL, {
        message: prompt
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: API_TIMEOUT
      });
      
      // 전체 응답 로깅
      console.log('[useResponse] 전체 응답 데이터:', JSON.stringify(response.data, null, 2));
      
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const content = response.data.choices[0].message.content;
        
        try {
          // JSON 응답 파싱
          const parsedJson = parseJsonResponse(content);
          
          // 응답 데이터 추출 - 직접 response와 reasons 필드 사용
          const answer = parsedJson.response || '응답을 생성할 수 없습니다.';
          const reasons = parsedJson.reasons || [];
          const responseUserName = parsedJson.userName || userName;
          const metadata = parsedJson.metadata || {};
          
          console.log('[useResponse] 파싱된 응답:', { answer, reasons: reasons.length, userName: responseUserName });
          
          setSuggestedResponse(answer);
          setEditedResponse(answer);
          setResponseReasons(reasons);
          
          if (responseUserName) {
            setUserName(responseUserName);
          }
          
          // 추가 통계 데이터 저장 (있는 경우)
          if (metadata && (metadata.participants !== undefined || metadata.keywords !== undefined || 
              metadata.time !== undefined || metadata.progress !== undefined)) {
            setResponseData({
              participants: metadata.participants || 2,
              keywords: metadata.keywords || 4,
              time: metadata.time || '30분',
              progress: metadata.progress || 75
            });
          }
          
          console.log(`[useResponse] 응답 수신 완료: ${answer.substring(0, 30)}...`);
        } catch (parseError) {
          console.error('[useResponse] JSON 파싱 오류:', parseError);
          // 개발 환경에서는 기본 응답 사용
          const { response, reasons } = DEFAULT_RESPONSES[selectedStyle];
          setSuggestedResponse(response);
          setEditedResponse(response);
          setResponseReasons(reasons);
        }
      } else if (response.data && response.data.error) {
        throw new Error(response.data.error);
      } else {
        throw new Error('응답 형식이 올바르지 않습니다.');
      }
    } catch (error: any) {
      console.error('답변 제안 중 오류가 발생했습니다:', error);
      setError('답변을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.');
      
      // 개발 환경에서는 기본 응답 사용
      if (process.env.NODE_ENV === 'development') {
        const { response, reasons } = DEFAULT_RESPONSES[selectedStyle];
        setSuggestedResponse(response);
        setEditedResponse(response);
        setResponseReasons(reasons);
      }
    } finally {
      setIsSuggesting(false);
    }
  };

  /**
   * 현재 답변을 클립보드에 복사하는 함수
   */
  const handleCopyResponse = async () => {
    try {
      await navigator.clipboard.writeText(editedResponse);
      console.log('[useResponse] 답변이 클립보드에 복사되었습니다.');
    } catch (error) {
      console.error('답변 복사 중 오류가 발생했습니다:', error);
    }
  };

  /**
   * 답변 스타일을 변경하는 함수
   * 선택된 스타일에 따라 답변 내용이 자동으로 변경됩니다.
   * 
   * @param style - 변경할 답변 스타일
   */
  const handleStyleChange = async (style: ResponseStyle) => {
    setSelectedStyle(style);
    
    // 입력된 텍스트가 없는 경우 기본 응답 사용
    if (!suggestedResponse) {
      const { response, reasons, userName: defaultUserName } = DEFAULT_RESPONSES[style];
      setSuggestedResponse(response);
      setEditedResponse(response);
      setResponseReasons(reasons);
      if (defaultUserName) {
        setUserName(defaultUserName);
      }
      return;
    }
    
    setIsSuggesting(true);
    
    try {
      // 입력 텍스트 정리 (최대 2000자)
      const sanitizedMessage = sanitizeInput(suggestedResponse, 2000);
      
      // 응답 프롬프트 생성
      const prompt = getResponsePrompt(sanitizedMessage, { 
        style: style, 
        userName: userName // 현재 사용자 이름 전달
      });
      
      // 외부 API 직접 호출
      const response = await axios.post(API_URL, {
        message: prompt
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: API_TIMEOUT
      });
      
      // 전체 응답 로깅
      console.log('[useResponse] 스타일 변경 응답 데이터:', JSON.stringify(response.data, null, 2));
      
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const content = response.data.choices[0].message.content;
        
        try {
          // JSON 응답 파싱
          const parsedJson = parseJsonResponse(content);
          
          // 응답 데이터 추출 - 직접 response와 reasons 필드 사용
          const answer = parsedJson.response || '응답을 생성할 수 없습니다.';
          const reasons = parsedJson.reasons || [];
          const responseUserName = parsedJson.userName || userName;
          const metadata = parsedJson.metadata || {};
          
          console.log('[useResponse] 파싱된 스타일 변경 응답:', { answer, reasons: reasons.length, userName: responseUserName });
          
          setSuggestedResponse(answer);
          setEditedResponse(answer);
          setResponseReasons(reasons);
          
          if (responseUserName) {
            setUserName(responseUserName);
          }
          
          // 추가 통계 데이터 저장 (있는 경우)
          if (metadata && (metadata.participants !== undefined || metadata.keywords !== undefined || 
              metadata.time !== undefined || metadata.progress !== undefined)) {
            setResponseData({
              participants: metadata.participants || 2,
              keywords: metadata.keywords || 4,
              time: metadata.time || '30분',
              progress: metadata.progress || 75
            });
          }
        } catch (parseError) {
          console.error('[useResponse] JSON 파싱 오류:', parseError);
          // 개발 환경에서는 기본 응답 사용
          const { response, reasons } = DEFAULT_RESPONSES[style];
          setSuggestedResponse(response);
          setEditedResponse(response);
          setResponseReasons(reasons);
        }
      } else {
        // 개발 환경에서는 기본 응답 사용
        const { response, reasons } = DEFAULT_RESPONSES[style];
        setSuggestedResponse(response);
        setEditedResponse(response);
        setResponseReasons(reasons);
      }
    } catch (error) {
      console.error('스타일 변경 중 오류가 발생했습니다:', error);
      
      // 개발 환경에서는 기본 응답 사용
      const { response, reasons } = DEFAULT_RESPONSES[style];
      setSuggestedResponse(response);
      setEditedResponse(response);
      setResponseReasons(reasons);
    } finally {
      setIsSuggesting(false);
    }
  };

  /**
   * 답변 편집 모드를 활성화하는 함수
   */
  const handleEditResponse = () => {
    setIsEditing(true);
  };

  /**
   * 편집된 답변을 저장하는 함수
   */
  const handleSaveResponse = () => {
    setSuggestedResponse(editedResponse);
    setIsEditing(false);
  };

  /**
   * 답변 작성 이유 표시 여부를 토글하는 함수
   */
  const toggleReason = () => {
    setShowReason(!showReason);
  };

  /**
   * 편집 중인 답변을 업데이트하는 함수
   * 
   * @param response - 새로운 답변 내용
   */
  const updateEditedResponse = (response: string) => {
    setEditedResponse(response);
  };

  /**
   * 편집 모드를 취소하고 원래 답변으로 되돌리는 함수
   */
  const cancelEditing = () => {
    setEditedResponse(suggestedResponse);
    setIsEditing(false);
  };

  return {
    isSuggesting,
    suggestedResponse,
    responseReasons,
    selectedStyle,
    isEditing,
    editedResponse,
    showReason,
    error,
    userName,
    responseData,
    handleSuggestResponse,
    handleCopyResponse,
    handleStyleChange,
    handleEditResponse,
    handleSaveResponse,
    toggleReason,
    updateEditedResponse,
    cancelEditing,
    handleSetUserName
  };
}; 