'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { ListItem, CategoryOption } from './types';
import FilterPanel from './FilterPanel';
import EmptyState from './EmptyState';
import ContentCard from './ContentCard';

interface ContentListProps<T extends ListItem> {
  /** 항목 목록 */
  items: T[];
  /** 지원되는 카테고리 목록 */
  categories: CategoryOption[];
  /** 페이지 제목 */
  title: string;
  /** 페이지 설명 */
  description?: string;
  /** 새 항목 생성 버튼 텍스트 */
  createButtonText?: string;
  /** 새 항목 생성 핸들러 함수 */
  onCreateItem?: () => void;
  /** 항목 상세 보기 핸들러 함수 */
  onViewDetail?: (item: T) => void;
  /** 항목 카드 헤더 렌더링 함수 (선택적) */
  renderHeader?: (item: T) => React.ReactNode;
  /** 항목 카드 메타데이터 렌더링 함수 (선택적) */
  renderMeta?: (item: T) => React.ReactNode;
  /** 항목 카드 콘텐츠 렌더링 함수 (선택적) */
  renderContent?: (item: T) => React.ReactNode;
  /** 항목 카드 푸터 렌더링 함수 (선택적) */
  renderFooter?: (item: T) => React.ReactNode;
  /** 카테고리 라벨 */
  categoryLabel?: string;
  /** 빈 상태 메시지 */
  emptyMessage?: string;
  /** 검색 결과 없음 메시지 */
  noResultsMessage?: string;
}

/**
 * 콘텐츠 목록 컴포넌트
 * 요약, 게시글 등 다양한 콘텐츠 목록을 표시하고 검색/필터링 기능 제공
 */
const ContentList = <T extends ListItem>({
  items,
  categories,
  title,
  description,
  createButtonText,
  onCreateItem,
  onViewDetail,
  renderHeader,
  renderMeta,
  renderContent,
  renderFooter,
  categoryLabel,
  emptyMessage,
  noResultsMessage
}: ContentListProps<T>) => {
  // 상태 관리
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // 필터 초기화 핸들러
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
  }, []);
  
  // 새 항목 생성 핸들러
  const createNewItem = useCallback(() => {
    if (onCreateItem) {
      onCreateItem();
    }
  }, [onCreateItem]);
  
  // 필터링된 항목 목록 계산
  const filteredItems = items.filter((item) => {
    // 카테고리 필터 확인
    if (selectedCategory && item.category !== selectedCategory) {
      return false;
    }
    
    // 검색어 필터 확인 (제목과 내용에서 검색)
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });
  
  // 필터 적용 여부 확인
  const hasFilters = Boolean(searchQuery || selectedCategory);

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* 접근성 스킵 네비게이션 링크 */}
      <div className="sr-only focus:not-sr-only focus:mb-4">
        <a href="#content-list" className="apple-button">목록으로 건너뛰기</a>
      </div>
      
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          {onCreateItem && (
            <button
              onClick={createNewItem}
              className="apple-button flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" />
              {createButtonText || '새 항목'}
            </button>
          )}
        </div>
        {description && (
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
      
      {/* 검색 및 필터 패널 */}
      <FilterPanel
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        categories={categories}
        categoryLabel={categoryLabel}
      />
      
      {/* 콘텐츠 목록 */}
      <div id="content-list" className="space-y-4">
        <AnimatePresence>
          {filteredItems.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-4">
                {filteredItems.map((item, index) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    index={index}
                    renderHeader={renderHeader}
                    renderMeta={renderMeta}
                    renderContent={renderContent}
                    renderFooter={renderFooter}
                    onViewDetail={onViewDetail ? () => onViewDetail(item) : undefined}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <EmptyState
              hasFilters={hasFilters}
              resetFilters={resetFilters}
              createNewItem={createNewItem}
              emptyMessage={emptyMessage}
              noResultsMessage={noResultsMessage}
              createButtonText={createButtonText}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContentList; 