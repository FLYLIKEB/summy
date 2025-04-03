'use client';

import { motion } from 'framer-motion';
import { FolderSearch, PlusCircle, RefreshCw } from 'lucide-react';
import { EmptyStateProps, ANIMATION } from './types';

/**
 * 검색 결과가 없거나 항목이 없을 때 표시되는 빈 상태 컴포넌트
 * 필터 적용된 경우와 초기 상태에 따라 다른 메시지를 표시
 */
const EmptyState = ({ 
  hasFilters, 
  resetFilters, 
  createNewItem,
  emptyMessage = '아직 항목이 없습니다',
  noResultsMessage = '검색 결과가 없습니다',
  createButtonText = '새 항목 만들기'
}: EmptyStateProps) => {
  return (
    <motion.div
      initial={ANIMATION.initial}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION.duration, ease: ANIMATION.easing }}
      className="flex flex-col items-center justify-center h-60 p-8 my-8 gap-4 bg-white-opacity-02 rounded-2xl"
    >
      <FolderSearch className="w-12 h-12 text-medium-contrast" />
      
      <div className="text-center">
        <h3 className="text-lg font-medium mb-1 text-high-contrast">
          {hasFilters ? noResultsMessage : emptyMessage}
        </h3>
        <p className="text-medium-contrast mb-4">
          {hasFilters 
            ? '검색 조건을 변경하여 다시 시도해보세요' 
            : '첫 번째 항목을 만들어보세요'}
        </p>
        
        <div className="flex flex-wrap justify-center gap-2">
          {hasFilters ? (
            <button
              onClick={resetFilters}
              className="apple-button-secondary flex items-center gap-1 text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              필터 초기화
            </button>
          ) : (
            <button
              onClick={createNewItem}
              className="apple-button-primary flex items-center gap-1 text-sm font-medium"
            >
              <PlusCircle className="w-4 h-4" />
              {createButtonText}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState; 