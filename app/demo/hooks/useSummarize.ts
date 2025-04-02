import { useState } from 'react';
import { EXAMPLE_SUMMARY } from '../constants';

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

  /**
   * 입력된 텍스트를 요약하는 함수
   * AI를 통해 주요 내용을 추출하고 구조화된 요약을 생성합니다.
   * 
   * @param input - 요약할 텍스트 내용
   */
  const handleSummarize = async (input: string) => {
    setIsSummarizing(true);
    try {
      // TODO: API 호출 구현
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult(EXAMPLE_SUMMARY);
    } catch (error) {
      console.error('요약 중 오류가 발생했습니다:', error);
    } finally {
      setIsSummarizing(false);
    }
  };

  return {
    isSummarizing,
    result,
    handleSummarize
  };
}; 