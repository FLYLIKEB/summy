import { LucideIcon } from 'lucide-react';
import { ListItem } from '@/components/common/types';

/**
 * 요약 항목 타입 정의
 * 대화 요약 정보를 나타내는 인터페이스
 */
export interface SummaryItem extends ListItem {
  /** 요약이 생성된 플랫폼 */
  platform: 'Slack' | 'KakaoTalk';
  /** 요약된 메시지 수 */
  messageCount: number;
  /** 요약 읽기 소요 시간 */
  summaryLength: string;
}

/**
 * 지원되는 플랫폼 옵션 타입 정의
 */
export interface PlatformOption {
  /** 플랫폼 이름 */
  name: 'Slack' | 'KakaoTalk';
  /** 플랫폼 아이콘 컴포넌트 */
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
  /** 선택된 플랫폼 */
  selectedPlatform: string | null;
  /** 플랫폼 선택 업데이트 함수 */
  setSelectedPlatform: (platform: string | null) => void;
  /** 필터 패널 표시 여부 */
  isFilterOpen: boolean;
  /** 필터 패널 표시 상태 업데이트 함수 */
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 빈 상태 컴포넌트 Props 타입 정의
 */
export interface EmptyStateProps {
  /** 필터 적용 여부 */
  hasFilters: boolean;
  /** 필터 초기화 함수 */
  resetFilters: () => void;
  /** 신규 요약 시작 함수 */
  startNewSummary: () => void;
}

/**
 * 요약 카드 컴포넌트 Props 타입 정의
 */
export interface SummaryCardProps {
  /** 요약 데이터 */
  summary: SummaryItem;
  /** 애니메이션 지연을 위한 카드 인덱스 */
  index: number;
  /** 상세 보기 이동 함수 (선택적) */
  onViewDetail?: (item: SummaryItem) => void;
} 