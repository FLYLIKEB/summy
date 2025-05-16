import { useState } from 'react';
import { ResponseStyle } from '../types';
import axios from 'axios';

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
  keywords: number;
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
    userName: "지우"
  },
  friendly: {
    response: '안녕하세요! 회의 내용 잘 확인했어요. 제안해주신 내용들 정말 좋네요. 다음 주 월요일까지 검토하고 피드백 드릴게요!',
    reasons: [
      "친근한 어조로 소통하여 관계를 돈독히 하고자 했습니다.",
      "긍정적인 평가를 통해 제안에 대한 감사를 표현했습니다.",
      "명확한 일정을 제시하여 기대치를 관리했습니다."
    ],
    userName: "지우"
  },
  concise: {
    response: '회의 내용 확인했습니다. 다음 주 월요일까지 피드백 드리겠습니다.',
    reasons: [
      "핵심 정보만 간결하게 전달했습니다.",
      "시간 효율성을 위해 불필요한 내용을 생략했습니다.",
      "명확한 후속 조치를 약속했습니다."
    ],
    userName: "지우"
  }
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
  const [userName, setUserName] = useState<string>("지우");
  // 추가 통계 데이터
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

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
      
      /**
       * API 응답 형식:
       * {
       *   response: string;    // 생성된 답변 텍스트
       *   reasons: string[];   // 답변 작성 이유 목록 (최대 3개)
       *   style: ResponseStyle; // 사용된 답변 스타일 (formal, friendly, concise)
       *   userName: string;    // 사용자 이름
       *   participants?: number;
       *   keywords?: number;
       *   time?: string;
       *   progress?: number;
       * }
       */
      // 내부 API 엔드포인트 호출
      const response = await axios.post<ApiResponse>('/api/response', {
        message: input,
        style: selectedStyle
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 60초로 증가
      });
      
      // 전체 응답 로깅
      console.log('[useResponse] 전체 응답 데이터:', JSON.stringify(response.data, null, 2));
      
      if (response.data && response.data.response) {
        // API 응답에서 답변과 이유를 추출
        const { 
          response: answer, 
          reasons, 
          userName: responseUserName, 
          participants, 
          keywords, 
          time, 
          progress 
        } = response.data;
        
        setSuggestedResponse(answer);
        setEditedResponse(answer);
        setResponseReasons(reasons || []);
        
        if (responseUserName) {
          setUserName(responseUserName);
        }
        
        // 추가 통계 데이터 저장
        if (participants !== undefined || keywords !== undefined || 
            time !== undefined || progress !== undefined) {
          setResponseData({
            participants: participants || 2,
            keywords: keywords || 4,
            time: time || '30분',
            progress: progress || 75
          });
        }
        
        console.log(`[useResponse] 응답 수신 완료: ${answer.substring(0, 30)}...`);
      } else if (response.data && response.data.error) {
        throw new Error(response.data.error);
      } else {
        throw new Error('응답 형식이 올바르지 않습니다.');
      }
    } catch (error: any) {
      console.error('답변 제안 중 오류가 발생했습니다:', error);
      setError('답변을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.');
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
      // 스타일 변경 시에도 API 호출
      const response = await axios.post<ApiResponse>('/api/response', {
        message: suggestedResponse, // 현재 답변을 기반으로 새 스타일 적용
        style: style
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 60초로 증가
      });
      
      // 전체 응답 로깅
      console.log('[useResponse] 스타일 변경 응답 데이터:', JSON.stringify(response.data, null, 2));
      
      if (response.data && response.data.response) {
        const { 
          response: answer, 
          reasons, 
          userName: responseUserName,
          participants, 
          keywords, 
          time, 
          progress
        } = response.data;
        
        setSuggestedResponse(answer);
        setEditedResponse(answer);
        setResponseReasons(reasons || []);
        
        if (responseUserName) {
          setUserName(responseUserName);
        }
        
        // 추가 통계 데이터 저장
        if (participants !== undefined || keywords !== undefined || 
            time !== undefined || progress !== undefined) {
          setResponseData({
            participants: participants || 2,
            keywords: keywords || 4,
            time: time || '30분',
            progress: progress || 75
          });
        }
      } else if (response.data && response.data.error) {
        throw new Error(response.data.error);
      } else {
        throw new Error('응답 형식이 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('스타일 변경 중 오류가 발생했습니다:', error);
      
      // 개발 환경에서는 기본 응답 사용
      if (process.env.NODE_ENV === 'development') {
        const { response, reasons, userName: defaultUserName } = DEFAULT_RESPONSES[style];
        setSuggestedResponse(response);
        setEditedResponse(response);
        setResponseReasons(reasons);
        if (defaultUserName) {
          setUserName(defaultUserName);
        }
      }
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
    setIsEditing(false);
    setSuggestedResponse(editedResponse);
  };

  /**
   * 답변 작성 이유 표시 여부를 토글하는 함수
   */
  const toggleReason = () => {
    setShowReason(!showReason);
  };

  /**
   * 편집 중인 답변 내용을 업데이트하는 함수
   * 
   * @param response - 새로운 답변 내용
   */
  const updateEditedResponse = (response: string) => {
    setEditedResponse(response);
  };

  /**
   * 답변 편집을 취소하고 원래 답변으로 되돌리는 함수
   */
  const cancelEditing = () => {
    setIsEditing(false);
    setEditedResponse(suggestedResponse);
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
    cancelEditing
  };
}; 