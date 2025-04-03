'use client';

import React from 'react';
import { EmptyStateProps } from './types';
import { FileBox, Filter } from 'lucide-react';

/**
 * 빈 상태 컴포넌트
 * 데이터가 없거나 필터링 결과가 없을 때 표시
 */
const EmptyState = ({
  hasFilters,
  resetFilters,
  createNewItem,
  emptyMessage = '아직 항목이 없습니다',
  noResultsMessage = '검색 결과가 없습니다',
  createButtonText = '새로 만들기'
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
        {hasFilters ? (
          <Filter className="w-8 h-8 text-white/40" />
        ) : (
          <FileBox className="w-8 h-8 text-white/40" />
        )}
      </div>
      
      <h3 className="text-lg font-medium mb-2">
        {hasFilters ? noResultsMessage : emptyMessage}
      </h3>
      
      <p className="text-white/60 text-sm max-w-md mb-6">
        {hasFilters
          ? '다른 검색어나 필터를 사용해보세요'
          : '첫 번째 항목을 만들어 시작하세요'}
      </p>
      
      <div className="flex gap-3">
        {hasFilters && (
          <button
            onClick={resetFilters}
            className="apple-button apple-button-secondary text-sm rounded-lg"
          >
            필터 초기화
          </button>
        )}
        
        <button
          onClick={createNewItem}
          className="apple-button apple-button-primary text-sm rounded-lg"
        >
          {createButtonText}
        </button>
      </div>
    </div>
  );
};

export default EmptyState; 