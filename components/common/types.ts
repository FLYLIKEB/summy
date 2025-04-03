import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

/**
 * 목록 항목 타입 정의
 * 요약, 게시글 등 목록에서 표시되는 항목의 공통 인터페이스
 */
export interface ListItem {
  /** 항목 고유 식별자 */
  id: number;
  /** 항목 제목 */
  title: string;
  /** 항목 카테고리 또는 타입 */
  category: string;
  /** 항목 생성 날짜 */
  date: string;
  /** 항목 내용 */
  content: string;
  /** 추가 메타데이터 (선택적) */
  metadata?: Record<string, any>;
}

/**
 * 카테고리 옵션 타입 정의
 */
export interface CategoryOption {
  /** 카테고리 이름 */
  name: string;
  /** 카테고리 아이콘 컴포넌트 */
  icon: LucideIcon;
}

/**
 * 검색 및 필터 패널 Props 타입 정의
 */
export interface FilterPanelProps {
  /** 현재 검색어 */
  searchQuery: string;
  /** 검색어 업데이트 함수 */
  setSearchQuery: (query: string) => void;
  /** 선택된 카테고리 */
  selectedCategory: string | null;
  /** 카테고리 선택 업데이트 함수 */
  setSelectedCategory: (category: string | null) => void;
  /** 필터 패널 표시 여부 */
  isFilterOpen: boolean;
  /** 필터 패널 표시 상태 업데이트 함수 */
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /** 지원되는 카테고리 목록 */
  categories: CategoryOption[];
  /** 카테고리 라벨 (기본값: '카테고리') */
  categoryLabel?: string;
}

/**
 * 빈 상태 컴포넌트 Props 타입 정의
 */
export interface EmptyStateProps {
  /** 필터 적용 여부 */
  hasFilters: boolean;
  /** 필터 초기화 함수 */
  resetFilters: () => void;
  /** 새 항목 생성 함수 */
  createNewItem: () => void;
  /** 빈 상태 메시지 (선택적) */
  emptyMessage?: string;
  /** 필터링 결과 없음 메시지 (선택적) */
  noResultsMessage?: string;
  /** 새 항목 생성 버튼 텍스트 (선택적) */
  createButtonText?: string;
}

/**
 * 콘텐츠 카드 컴포넌트 Props 타입 정의
 */
export interface ContentCardProps<T extends ListItem> {
  /** 항목 데이터 */
  item: T;
  /** 애니메이션 지연을 위한 카드 인덱스 */
  index: number;
  /** 카드 헤더 렌더링 함수 (선택적) */
  renderHeader?: (item: T) => ReactNode;
  /** 카드 메타데이터 렌더링 함수 (선택적) */
  renderMeta?: (item: T) => ReactNode;
  /** 카드 콘텐츠 렌더링 함수 (선택적) */
  renderContent?: (item: T) => ReactNode;
  /** 카드 푸터 렌더링 함수 (선택적) */
  renderFooter?: (item: T) => ReactNode;
  /** 상세 보기 이동 함수 (선택적) */
  onViewDetail?: (item: T) => void;
}

/**
 * 애니메이션 관련 상수
 * 컴포넌트 애니메이션에 사용되는 설정값
 */
export const ANIMATION = {
  /** 초기 상태 (등장 전) */
  initial: { opacity: 0, y: 20 },
  /** 항목 간 지연 시간 (초) */
  stagger: 0.1,
  /** 애니메이션 지속 시간 (초) */
  duration: 0.5,
  /** 이징 함수 (애니메이션 가속도) */
  easing: [0.25, 1, 0.5, 1],
  /** 호버 시 적용할 효과 */
  hover: { scale: 1.01, y: -2 }
}; 