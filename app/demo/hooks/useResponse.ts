import { useState } from 'react';
import { ResponseStyle } from '../types';

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
  // 선택된 답변 스타일 (정중한, 친근한, 간결한)
  const [selectedStyle, setSelectedStyle] = useState<ResponseStyle>('formal');
  // 답변 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  // 편집 중인 답변 내용
  const [editedResponse, setEditedResponse] = useState<string>('');
  // 답변 작성 이유 표시 여부
  const [showReason, setShowReason] = useState(false);

  /**
   * 답변을 제안하는 함수
   * AI를 통해 입력된 내용에 대한 적절한 답변을 생성합니다.
   * 
   * @param input - 답변을 생성할 입력 텍스트
   */
  const handleSuggestResponse = async (input: string) => {
    setIsSuggesting(true);
    try {
      // TODO: API 호출 구현
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = '안녕하세요. 회의 내용을 잘 확인했습니다. 제안하신 사항들에 대해 검토 후 다음 주 월요일까지 피드백 드리도록 하겠습니다.';
      setSuggestedResponse(response);
      setEditedResponse(response);
    } catch (error) {
      console.error('답변 제안 중 오류가 발생했습니다:', error);
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
  const handleStyleChange = (style: ResponseStyle) => {
    setSelectedStyle(style);
    // 스타일에 따라 답변 내용 변경
    let newResponse = '';
    switch (style) {
      case 'formal':
        newResponse = '안녕하세요. 회의 내용을 잘 확인했습니다. 제안하신 사항들에 대해 검토 후 다음 주 월요일까지 피드백 드리도록 하겠습니다.';
        break;
      case 'friendly':
        newResponse = '안녕하세요! 회의 내용 잘 확인했습니다. 제안하신 내용들 정말 좋네요. 다음 주 월요일까지 검토하고 피드백 드릴게요.';
        break;
      case 'concise':
        newResponse = '회의 내용 확인했습니다. 다음 주 월요일까지 피드백 드리겠습니다.';
        break;
    }
    setEditedResponse(newResponse);
    setSuggestedResponse(newResponse);
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
    selectedStyle,
    isEditing,
    editedResponse,
    showReason,
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