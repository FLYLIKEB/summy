'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Slack, MessageSquare } from 'lucide-react'
import { UniversalList } from '@/components/dashboard'
import { CategoryOption } from '@/components/dashboard/types'
import { SummaryItem } from './components/types'

// 지원되는 플랫폼 목록
const PLATFORMS: CategoryOption[] = [
  {
    name: 'Slack',
    icon: Slack
  },
  {
    name: 'KakaoTalk',
    icon: MessageSquare
  }
]

// 더미 요약 데이터
const DUMMY_SUMMARIES: SummaryItem[] = [
  {
    id: 1,
    title: '프로젝트 킥오프 미팅',
    category: 'Slack',
    platform: 'Slack',
    date: '2023년 6월 10일',
    content: '이번 프로젝트의 킥오프 미팅에서는 주요 일정과 담당자를 선정했습니다. 개발 기간은 3개월로 예정되었으며, UI/UX 디자인은 다음 주까지 완료될 예정입니다.',
    messageCount: 45,
    summaryLength: '짧은'
  },
  {
    id: 2,
    title: '팀 주간 회의',
    category: 'KakaoTalk',
    platform: 'KakaoTalk',
    date: '2023년 6월 15일',
    content: '이번 주간 회의에서는 개발 진행 상황을 검토했습니다. 백엔드 API 개발이 지연되고 있어 일정 조정이 필요합니다. 프론트엔드 팀은 목업을 사용해 개발을 계속 진행하기로 했습니다.',
    messageCount: 32,
    summaryLength: '중간'
  },
  {
    id: 3,
    title: '긴급 이슈 대응',
    category: 'Slack',
    platform: 'Slack',
    date: '2023년 6월 18일',
    content: '프로덕션 환경에서 발생한 로그인 이슈에 대한 긴급 대응을 진행했습니다. 세션 관리 로직의 버그를 수정하고 패치 배포를 완료했습니다. 추가 모니터링이 필요합니다.',
    messageCount: 78,
    summaryLength: '긴'
  }
]

/**
 * 요약 목록 페이지
 * 사용자의 모든 대화 요약 목록을 표시
 */
export default function SummariesPage() {
  const router = useRouter()
  const [summaries] = useState<SummaryItem[]>(DUMMY_SUMMARIES)
  
  // 새 요약 생성 페이지로 이동
  const handleCreateSummary = () => {
    router.push('/dashboard/new')
  }
  
  // 요약 상세 페이지로 이동
  const handleViewDetail = (summary: SummaryItem) => {
    router.push(`/dashboard/summaries/${summary.id}`)
  }
  
  return (
    <UniversalList
      items={summaries}
      categories={PLATFORMS}
      title="대화 요약 모음"
      description="지금까지 생성한 모든 대화 요약을 확인해보세요."
      categoryLabel="플랫폼"
      createButtonText="새 요약 만들기"
      onCreateItem={handleCreateSummary}
      onViewDetail={handleViewDetail}
      emptyMessage="아직 요약이 없습니다"
      noResultsMessage="검색 결과가 없습니다"
      mode="card"
      enableFiltering={true}
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
  )
}