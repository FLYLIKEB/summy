'use client'

import { useRouter } from 'next/navigation'
import { BarChart3, MessageSquare, Clock, PlusCircle, List, TrendingUp } from 'lucide-react'
import { Dashboard, StatCard, UniversalList } from '@/components/dashboard'
import { SummaryItem } from './summaries/components/types'

// 임시 데이터
const summaries = [
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

const stats = [
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

// 대시보드 더미 데이터
const DASHBOARD_STATS = [
  { label: '총 요약 개수', value: '12개', icon: List, change: '+3 추가' },
  { label: '이번 주 생성', value: '4개', icon: TrendingUp, change: '지난주 대비 +2' },
]

// 최근 요약 더미 데이터
const RECENT_SUMMARIES: SummaryItem[] = [
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

/**
 * 대시보드 메인 페이지
 * 사용자의 통계 정보와 최근 요약 내역을 표시
 */
export default function DashboardPage() {
  const router = useRouter()
  
  // 새 요약 페이지로 이동
  const createNewSummary = () => {
    router.push('/dashboard/new')
  }
  
  // 요약 상세 보기 페이지로 이동
  const viewSummaryDetail = (summary: SummaryItem) => {
    router.push(`/dashboard/summaries/${summary.id}`)
  }
  
  return (
    <div className="dashboard-container space-y-8 py-8">
      {/* 통계 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DASHBOARD_STATS.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            index={index}
          />
        ))}
      </div>
      
      {/* 새 요약 만들기 카드 */}
      <div className="apple-card p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">새 대화 요약 만들기</h2>
          <p className="text-medium-contrast">대화 내용을 붙여넣어 빠르게 요약해 보세요.</p>
        </div>
        <button
          onClick={createNewSummary}
          className="apple-button-primary flex items-center gap-2 whitespace-nowrap"
        >
          <PlusCircle className="w-5 h-5" />
          새 요약 생성
        </button>
      </div>
      
      {/* 최근 요약 목록 */}
      <UniversalList
        items={RECENT_SUMMARIES}
        title="최근 요약"
        viewAllUrl="/dashboard/summaries"
        mode="simple"
        enableFiltering={false}
        detailUrlPattern="/dashboard/summaries/{id}"
        onViewDetail={viewSummaryDetail}
        renderMeta={(item: SummaryItem) => (
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-medium-contrast">
            <span>{item.platform}</span>
            <span className="hidden sm:inline text-low-contrast" aria-hidden="true">•</span>
            <span>{item.messageCount}개의 메시지</span>
            <span className="hidden sm:inline text-low-contrast" aria-hidden="true">•</span>
            <span>{item.summaryLength} 분량</span>
          </div>
        )}
      />
    </div>
  )
} 