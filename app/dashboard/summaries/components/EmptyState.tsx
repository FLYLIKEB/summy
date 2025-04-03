'use client';

import { EmptyState as CommonEmptyState } from '@/components/common';
import { EmptyStateProps } from './types';

/**
 * 검색 결과가 없을 때 표시되는 빈 상태 컴포넌트
 * 공통 컴포넌트를 감싸서 요약 페이지에 맞게 사용
 */
const EmptyState = ({ hasFilters, resetFilters, startNewSummary }: EmptyStateProps) => {
  return (
    <CommonEmptyState
      hasFilters={hasFilters}
      resetFilters={resetFilters}
      createNewItem={startNewSummary}
      emptyMessage="아직 요약이 없습니다"
      noResultsMessage="검색 결과가 없습니다"
      createButtonText="새 요약 만들기"
    />
  );
};

export default EmptyState; 