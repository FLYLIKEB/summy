import { useState } from 'react';
import { EXAMPLE_SUMMARY } from '../constants';

export const useSummarize = () => {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [result, setResult] = useState<string>('');

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