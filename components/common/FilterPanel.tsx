'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { FilterPanelProps } from './types';

/**
 * 검색 및 필터링 패널 컴포넌트
 * 검색어 입력과 카테고리 필터 선택 기능을 제공
 */
const FilterPanel = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  isFilterOpen,
  setIsFilterOpen,
  categories,
  categoryLabel = '카테고리'
}: FilterPanelProps) => {
  // 검색어 초기화 핸들러
  const clearSearch = () => setSearchQuery('');
  
  // 필터 패널 토글 핸들러
  const toggleFilterPanel = () => setIsFilterOpen(prev => !prev);

  return (
    <div className="w-full space-y-3 mb-6">
      {/* 검색 바 */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 pl-10 pr-10 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            aria-label="검색어 지우기"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 필터 토글 버튼 */}
      <div className="flex justify-between items-center">
        <button
          onClick={toggleFilterPanel}
          className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          필터
          {isFilterOpen ? (
            <ChevronUp className="ml-1 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-1 h-4 w-4" />
          )}
        </button>

        {/* 필터 초기화 버튼 (필터가 적용된 경우에만 표시) */}
        {(selectedCategory || searchQuery) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
            }}
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* 확장 가능한 필터 패널 */}
      {isFilterOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="pt-2"
        >
          <div className="flex flex-wrap gap-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center mr-2">{categoryLabel}:</h4>
            
            {/* 전체 카테고리 버튼 */}
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === null
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              전체
            </button>
            
            {/* 개별 카테고리 버튼 */}
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.name;
              
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(isSelected ? null : category.name)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors flex items-center gap-1 ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FilterPanel; 