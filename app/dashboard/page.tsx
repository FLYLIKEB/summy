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
      {/* 인사말 섹션 */}
      <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 w-full">
            <div className="w-20 h-20 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              P
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-2">안녕하세요, 박지우님!</h1>
              <p className="text-medium-contrast text-sm sm:text-base">오늘의 대화 요약과 최근 활동을 확인해보세요.</p>
            </div>
          </div>
          <div className="mt-3 sm:mt-0">
            <div className="px-4 py-2 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 text-sm whitespace-nowrap shadow-md">
              <span className="text-high-contrast font-medium">{new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 통계 카드 섹션 */}
      <div className="grid grid-cols-2 gap-4">
        {DASHBOARD_STATS.map((stat, index) => (
          <div key={index} className="backdrop-blur-sm bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all shadow-lg overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 blur-xl -translate-y-1/2 translate-x-1/2 ${index === 0 ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-3">
                <stat.icon className="w-5 h-5 text-high-contrast" />
              </div>
              <h3 className="text-2xl font-bold text-high-contrast mb-1">{stat.value}</h3>
              <p className="text-sm text-medium-contrast">{stat.label}</p>
              {stat.change && (
                <span className="mt-3 inline-block px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-300">
                  {stat.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* 새 요약 만들기 카드 */}
      <div className="backdrop-blur-sm bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center sm:flex-row sm:text-left sm:justify-between sm:items-center gap-5 shadow-xl">
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">새 대화 요약 만들기</h2>
          <p className="text-sm sm:text-base text-medium-contrast">대화 내용을 붙여넣어 빠르게 요약해 보세요.</p>
        </div>
        <button
          onClick={createNewSummary}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl flex items-center justify-center sm:justify-start gap-2 whitespace-nowrap mt-2 sm:mt-0 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg"
        >
          <PlusCircle className="w-5 h-5" />
          새 요약 생성
        </button>
      </div>
      
      {/* 최근 요약 목록 */}
      <div className="space-y-5">
        <h2 className="text-lg sm:text-xl font-bold px-1 flex items-center">
          <span className="mr-2">최근 요약</span>
          <span className="px-2 py-0.5 bg-white/5 text-xs rounded-full">{RECENT_SUMMARIES.length}</span>
        </h2>
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 shadow-lg overflow-hidden">
          <UniversalList
            items={RECENT_SUMMARIES}
            title="최근 요약"
            viewAllUrl="/dashboard/summaries"
            mode="simple"
            enableFiltering={false}
            detailUrlPattern="/dashboard/summaries/{id}"
            onViewDetail={viewSummaryDetail}
            renderMeta={(item: SummaryItem) => (
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-medium-contrast">
                <span className="bg-white/10 px-2.5 py-1 rounded-full font-medium">{item.platform}</span>
                <div className="flex items-center gap-2">
                  <span>{item.messageCount}개의 메시지</span>
                  <span className="inline text-low-contrast" aria-hidden="true">•</span>
                  <span>{item.summaryLength} 분량</span>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  )
} 