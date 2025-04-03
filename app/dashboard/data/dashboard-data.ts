import { BarChart3, MessageSquare, Clock, List, TrendingUp } from 'lucide-react'
import { SummaryItem } from '../summaries/components/types'

// 대시보드 통계 데이터
interface DashboardStat {
  label: string
  value: string
  icon: any
  change?: string
}

export const DASHBOARD_STATS: DashboardStat[] = [
  { label: '총 요약 개수', value: '12개', icon: List, change: '+3 추가' },
  { label: '이번 주 생성', value: '4개', icon: TrendingUp, change: '지난주 대비 +2' },
]

// 최근 요약 더미 데이터
export const RECENT_SUMMARIES: SummaryItem[] = [
  {
    id: 1,
    title: '프로젝트 킥오프 미팅',
    category: 'Slack',
    platform: 'Slack',
    date: '2023년 6월 10일',
    content: '이번 프로젝트의 킥오프 미팅에서는 주요 일정과 담당자를 선정했습니다.',
    messageCount: 45,
    summaryLength: '짧은'
  },
  {
    id: 2,
    title: '팀 주간 회의',
    category: 'KakaoTalk',
    platform: 'KakaoTalk',
    date: '2023년 6월 15일',
    content: '이번 주간 회의에서는 개발 진행 상황을 검토했습니다.',
    messageCount: 32,
    summaryLength: '중간'
  }
]

// 보관된 더미 데이터
export const ARCHIVED_SUMMARIES = [
  {
    id: 1,
    title: '마케팅팀 주간 회의',
    platform: 'Slack',
    date: '2024-03-20',
    messageCount: 125,
    summaryLength: '3분',
  },
  {
    id: 2,
    title: '제품 기획 논의',
    platform: 'KakaoTalk',
    date: '2024-03-19',
    messageCount: 89,
    summaryLength: '2분',
  },
  {
    id: 3,
    title: '디자인 피드백',
    platform: 'KakaoTalk',
    date: '2024-03-18',
    messageCount: 67,
    summaryLength: '1분',
  },
]

// 통계 데이터
export const STATS = [
  {
    label: '총 요약 횟수',
    value: '24회',
    icon: BarChart3,
    color: 'bg-purple-500',
  },
  {
    label: '총 메시지 수',
    value: '2,847개',
    icon: MessageSquare,
    color: 'bg-pink-500',
  },
  {
    label: '절약한 시간',
    value: '5.2시간',
    icon: Clock,
    color: 'bg-blue-500',
  },
] 