import { Slack, MessageSquare } from 'lucide-react';
import { SummaryItem, PlatformOption } from './types';

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

/**
 * 지원되는 플랫폼 목록
 * 각 플랫폼과 해당하는 아이콘
 */
export const PLATFORMS: PlatformOption[] = [
  { name: 'Slack', icon: Slack },
  { name: 'KakaoTalk', icon: MessageSquare },
];

/**
 * 임시 요약 데이터
 * 실제 구현 시 API 호출로 대체될 예정
 */
export const MOCK_SUMMARIES: SummaryItem[] = [
  {
    id: 1,
    title: '마케팅팀 주간 회의',
    category: 'Slack',
    platform: 'Slack',
    date: '2024-03-20',
    messageCount: 125,
    summaryLength: '3분',
    content: '1. 신규 캠페인 진행 상황 점검\n2. SNS 광고 성과 분석\n3. 다음 분기 마케팅 전략 논의',
  },
  {
    id: 2,
    title: '제품 기획 논의',
    category: 'KakaoTalk',
    platform: 'KakaoTalk',
    date: '2024-03-19',
    messageCount: 89,
    summaryLength: '2분',
    content: '1. 신규 기능 우선순위 설정\n2. UI/UX 개선 사항\n3. 출시 일정 조정',
  },
  {
    id: 3,
    title: '디자인 피드백',
    category: 'KakaoTalk',
    platform: 'KakaoTalk',
    date: '2024-03-18',
    messageCount: 67,
    summaryLength: '1분',
    content: '1. 메인 페이지 디자인 리뷰\n2. 색상 체계 조정\n3. 모바일 대응 논의',
  },
  {
    id: 4,
    title: '개발팀 스프린트 회의',
    category: 'Slack',
    platform: 'Slack',
    date: '2024-03-17',
    messageCount: 156,
    summaryLength: '4분',
    content: '1. 이번 스프린트 목표 설정\n2. 기술 부채 해결 방안\n3. 코드 리뷰 프로세스 개선',
  },
  {
    id: 5,
    title: '고객 피드백 논의',
    category: 'KakaoTalk',
    platform: 'KakaoTalk',
    date: '2024-03-16',
    messageCount: 92,
    summaryLength: '2분',
    content: '1. 사용자 피드백 분석\n2. 개선 우선순위 설정\n3. 대응 방안 수립',
  },
]; 