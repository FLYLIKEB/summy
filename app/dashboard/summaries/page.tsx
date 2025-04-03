'use client'

import { useRouter } from 'next/navigation'
import { ContentList } from '@/components/common'
import { PLATFORMS, MOCK_SUMMARIES } from './components/constants'
import { SummaryItem } from './components/types'
import { Calendar, MessageSquare, Clock } from 'lucide-react'

/**
 * 요약 내역 페이지 컴포넌트
 * 사용자의 모든 요약을 목록으로 표시하고 검색 및 필터링 기능 제공
 */
export default function SummariesPage() {
  const router = useRouter()
  
  // 메타데이터 렌더링 함수
  const renderSummaryMeta = (summary: SummaryItem) => (
    <>
      <div className="flex items-center gap-1">
        <Calendar className="w-3.5 h-3.5" />
        <span>{summary.date}</span>
      </div>
      <div className="flex items-center gap-1">
        <MessageSquare className="w-3.5 h-3.5" />
        <span>{summary.messageCount}개 메시지</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="w-3.5 h-3.5" />
        <span>{summary.summaryLength} 소요</span>
      </div>
    </>
  )
  
  // 상세 페이지 이동 핸들러
  const handleViewDetail = (summary: SummaryItem) => {
    router.push(`/dashboard/summaries/${summary.id}`)
  }
  
  // 새 요약 생성 핸들러
  const handleCreateSummary = () => {
    router.push('/dashboard/new')
  }

  return (
    <ContentList
      items={MOCK_SUMMARIES}
      categories={PLATFORMS}
      title="요약 내역"
      description="이전에 생성한 대화 요약을 확인하세요."
      createButtonText="새 요약"
      onCreateItem={handleCreateSummary}
      onViewDetail={handleViewDetail}
      renderMeta={renderSummaryMeta}
      categoryLabel="플랫폼"
      emptyMessage="아직 요약이 없습니다"
      noResultsMessage="검색 결과가 없습니다"
    />
  )
}