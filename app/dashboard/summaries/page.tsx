'use client'

import { useRouter } from 'next/navigation'
import { Slack, MessageSquare } from 'lucide-react'
import { ContentList } from '@/components/common'
import { ListItem, CategoryOption } from '@/components/common/types'

// 요약 데이터 타입 확장
interface SummaryItem extends ListItem {
  messageCount: number
  summaryLength: string
}

// 지원되는 플랫폼 목록
const PLATFORMS: CategoryOption[] = [
  { name: 'Slack', icon: Slack },
  { name: 'KakaoTalk', icon: MessageSquare },
]

// 임시 요약 데이터
const MOCK_SUMMARIES: SummaryItem[] = [
  {
    id: 1,
    title: '마케팅팀 주간 회의',
    category: 'Slack',
    date: '2024-03-20',
    messageCount: 125,
    summaryLength: '3분',
    content: '1. 신규 캠페인 진행 상황 점검\n2. SNS 광고 성과 분석\n3. 다음 분기 마케팅 전략 논의',
  },
  {
    id: 2,
    title: '제품 기획 논의',
    category: 'KakaoTalk',
    date: '2024-03-19',
    messageCount: 89,
    summaryLength: '2분',
    content: '1. 신규 기능 우선순위 설정\n2. UI/UX 개선 사항\n3. 출시 일정 조정',
  },
  {
    id: 3,
    title: '디자인 피드백',
    category: 'KakaoTalk',
    date: '2024-03-18',
    messageCount: 67,
    summaryLength: '1분',
    content: '1. 메인 페이지 디자인 리뷰\n2. 색상 체계 조정\n3. 모바일 대응 논의',
  },
  {
    id: 4,
    title: '개발팀 스프린트 회의',
    category: 'Slack',
    date: '2024-03-17',
    messageCount: 156,
    summaryLength: '4분',
    content: '1. 이번 스프린트 목표 설정\n2. 기술 부채 해결 방안\n3. 코드 리뷰 프로세스 개선',
  },
  {
    id: 5,
    title: '고객 피드백 논의',
    category: 'KakaoTalk',
    date: '2024-03-16',
    messageCount: 92,
    summaryLength: '2분',
    content: '1. 사용자 피드백 분석\n2. 개선 우선순위 설정\n3. 대응 방안 수립',
  },
]

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
        <span>{summary.date}</span>
      </div>
      <div className="flex items-center gap-1">
        <MessageSquare className="w-3.5 h-3.5" />
        <span>{summary.messageCount}개 메시지</span>
      </div>
      <div className="flex items-center gap-1">
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