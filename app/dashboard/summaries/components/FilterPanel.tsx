'use client';

import { FilterPanel as CommonFilterPanel } from '@/components/common';
import { FilterPanelProps } from './types';
import { PLATFORMS } from './constants';

/**
 * 검색 및 플랫폼 필터링 패널 컴포넌트
 * 공통 컴포넌트를 감싸서 요약 페이지에 맞게 사용
 */
const FilterPanel = ({
  searchQuery,
  setSearchQuery,
  selectedPlatform,
  setSelectedPlatform,
  isFilterOpen,
  setIsFilterOpen
}: FilterPanelProps) => {
  return (
    <CommonFilterPanel
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedCategory={selectedPlatform}
      setSelectedCategory={setSelectedPlatform}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
      categories={PLATFORMS}
      categoryLabel="플랫폼"
    />
  );
};

export default FilterPanel; 