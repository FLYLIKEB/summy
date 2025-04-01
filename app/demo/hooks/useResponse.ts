import { useState } from 'react';
import { ResponseStyle } from '../types';

export const useResponse = () => {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedResponse, setSuggestedResponse] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<ResponseStyle>('formal');
  const [isEditing, setIsEditing] = useState(false);
  const [editedResponse, setEditedResponse] = useState<string>('');
  const [showReason, setShowReason] = useState(false);

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

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(editedResponse);
  };

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
      case 'professional':
        newResponse = '회의 내용을 확인했습니다. 제안하신 사항들에 대해 전문적인 관점에서 검토하여 다음 주 월요일까지 상세한 피드백을 드리도록 하겠습니다.';
        break;
    }
    setEditedResponse(newResponse);
    setSuggestedResponse(newResponse);
  };

  const handleEditResponse = () => {
    setIsEditing(true);
  };

  const handleSaveResponse = () => {
    setIsEditing(false);
    setSuggestedResponse(editedResponse);
  };

  const toggleReason = () => {
    setShowReason(!showReason);
  };

  const updateEditedResponse = (response: string) => {
    setEditedResponse(response);
  };

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