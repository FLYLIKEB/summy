'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { PlusCircle, ChevronRight } from 'lucide-react';
import { ListItem, CategoryOption } from './types';
import ContentCard from './ContentCard';
import EmptyState from './EmptyState';
import FilterPanel from './FilterPanel';

interface UniversalListProps<T extends ListItem> {
  /** 항목 목록 */
  items: T[];
  /** 지원되는 카테고리 목록 (선택적) */
  categories?: CategoryOption[];
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
  /** 모두 보기 링크 URL */
  viewAllUrl?: string;
  /** 리스트 모드 (카드 또는 간단) */
  mode?: 'card' | 'simple';
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 항목별 상세 페이지 URL 패턴 - {id}가 실제 ID로 대체됨 */
  detailUrlPattern?: string;
  /** 필터링 사용 여부 */
  enableFiltering?: boolean;
}

/**
 * 범용 리스트 컴포넌트
 * ContentList와 SummaryList의 기능을 통합한 유연한 리스트 표시 컴포넌트
 */
const UniversalList = <T extends ListItem>({
  items,
  categories = [],
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
  noResultsMessage,
  viewAllUrl,
  mode = 'card',
  isLoading = false,
  detailUrlPattern,
  enableFiltering = true
}: UniversalListProps<T>) => {
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
  const filteredItems = enableFiltering 
    ? items.filter((item) => {
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
      })
    : items;
  
  // 필터 적용 여부 확인
  const hasFilters = Boolean(searchQuery || selectedCategory);

  // 로딩 스켈레톤 컴포넌트
  const renderSkeletons = () => (
    <div className="divide-y divide-white-opacity-03">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 sm:p-5" aria-hidden="true">
          <div className="skeleton h-6 w-3/4 mb-4" />
          <div className="skeleton h-4 w-1/2" />
        </div>
      ))}
    </div>
  );

  // 항목이 없는 경우 표시할 빈 상태
  const renderEmptyState = () => (
    <EmptyState
      hasFilters={hasFilters}
      resetFilters={resetFilters}
      createNewItem={createNewItem}
      emptyMessage={emptyMessage}
      noResultsMessage={noResultsMessage}
      createButtonText={createButtonText}
    />
  );

  // 카드 모드로 항목 표시
  const renderCardMode = () => (
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
  );

  // 간단한 리스트 모드로 항목 표시
  const renderSimpleMode = () => (
    <ul className="divide-y divide-white-opacity-03">
      {filteredItems.map((item) => (
        <li key={item.id}>
          <Link 
            href={detailUrlPattern ? detailUrlPattern.replace('{id}', String(item.id)) : '#'} 
            className="block clickable interactive-card border-none rounded-none focus-visible-ring"
            tabIndex={0}
            aria-label={`${item.title}, ${item.category || ''}`}
            onClick={(e) => {
              if (onViewDetail) {
                e.preventDefault();
                onViewDetail(item);
              }
            }}
          >
            <div className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <h3 className="font-medium mb-1 sm:mb-0 text-high-contrast">{item.title}</h3>
                {item.date && (
                  <span className="text-xs sm:text-sm text-medium-contrast">{item.date}</span>
                )}
              </div>
              {renderMeta ? renderMeta(item) : (
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-medium-contrast">
                  {item.category && <span>{item.category}</span>}
                  {item.metadata && Object.entries(item.metadata).map(([key, value], i, arr) => (
                    <React.Fragment key={key}>
                      <span>{value}</span>
                      {i < arr.length - 1 && (
                        <span className="hidden sm:inline text-low-contrast" aria-hidden="true">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="apple-card overflow-hidden">
      {/* 헤더 섹션 */}
      <div className="p-4 sm:p-5 border-b border-white-opacity-04 flex justify-between items-center">
        <div>
          <h2 className="text-lg sm:text-xl font-medium text-high-contrast">{title}</h2>
          {description && (
            <p className="text-medium-contrast mt-1">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {viewAllUrl && (
            <Link 
              href={viewAllUrl} 
              className="text-medium-contrast hover:text-high-contrast transition-all text-sm flex items-center gap-1 group focus-visible-ring"
              aria-label="모든 항목 보기"
            >
              <span>모두 보기</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          )}
          {onCreateItem && (
            <button
              onClick={createNewItem}
              className="apple-button-primary flex items-center gap-1 rounded-lg"
            >
              <PlusCircle className="w-4 h-4" />
              {createButtonText || '새 항목'}
            </button>
          )}
        </div>
      </div>
      
      {/* 검색 및 필터 패널 (필터링이 활성화된 경우에만 표시) */}
      {enableFiltering && categories.length > 0 && (
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
      )}
      
      {/* 콘텐츠 목록 */}
      <div className="content-list">
        {isLoading ? (
          renderSkeletons()
        ) : filteredItems.length > 0 ? (
          <div>
            {mode === 'card' ? renderCardMode() : renderSimpleMode()}
          </div>
        ) : (
          renderEmptyState()
        )}
      </div>
    </div>
  );
};

export default UniversalList; 