'use client';

import { motion } from 'framer-motion';
import { FolderSearch, PlusCircle, RefreshCw } from 'lucide-react';
import { EmptyStateProps } from './types';
import { ANIMATION } from './constants';

/**
 * 검색 결과가 없을 때 표시되는 빈 상태 컴포넌트
 * 필터 적용된 경우와 초기 상태에 따라 다른 메시지를 표시
 */
const EmptyState = ({ hasFilters, resetFilters, startNewSummary }: EmptyStateProps) => {
  return (
    <motion.div
      initial={ANIMATION.initial}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION.duration, ease: ANIMATION.easing }}
      className="flex flex-col items-center justify-center h-60 p-8 my-8 gap-4 bg-gray-50 dark:bg-gray-900 rounded-2xl"
    >
      <FolderSearch className="w-12 h-12 text-gray-400" />
      
      <div className="text-center">
        <h3 className="text-lg font-medium mb-1">
          {hasFilters ? '검색 결과가 없습니다' : '아직 요약이 없습니다'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {hasFilters 
            ? '검색 조건을 변경하여 다시 시도해보세요' 
            : '첫 번째 대화 요약을 만들어보세요'}
        </p>
        
        <div className="flex flex-wrap justify-center gap-2">
          {hasFilters ? (
            <button
              onClick={resetFilters}
              className="apple-button flex items-center gap-1 text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              필터 초기화
            </button>
          ) : (
            <button
              onClick={startNewSummary}
              className="apple-button flex items-center gap-1 text-sm font-medium"
            >
              <PlusCircle className="w-4 h-4" />
              새 요약 만들기
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState; 