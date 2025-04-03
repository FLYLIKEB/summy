'use client'

/**
 * 요약 내역 페이지 (Summaries Page)
 * 
 * 사용자가 생성한 모든 대화 요약 내역을 보여주는 페이지입니다.
 * Apple 디자인 시스템을 기반으로 구현되었으며, 다음 기능을 제공합니다:
 * - 요약 목록 표시 및 확장/축소 기능
 * - 제목 기반 검색 필터링
 * - 플랫폼(Slack, KakaoTalk 등) 기반 필터링
 * - 애니메이션 효과로 개선된 사용자 경험
 * 
 * 기존 Card, Button 등의 UI 컴포넌트를 활용하여 일관된 디자인을 유지합니다.
 */

import React, { useState, useCallback, useMemo } from 'react'
import { Search, Slack, MessageCircle, Filter, ChevronRight, Calendar, Clock, MessageSquare, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'

// 타입 정의
interface SummaryItem {
  id: number
  title: string
  platform: 'Slack' | 'KakaoTalk'
  date: string
  messageCount: number
  summaryLength: string
  content: string
}

interface PlatformOption {
  name: 'Slack' | 'KakaoTalk'
  icon: React.ElementType
}

// 애니메이션 상수
const ANIMATION = {
  initial: { opacity: 0, y: 20 },
  stagger: 0.1,
  duration: 0.5,
  easing: [0.25, 1, 0.5, 1],
  hover: { scale: 1.01, y: -2 }
}

// 임시 데이터 - 실제 구현 시 API 호출로 대체될 예정
const summaries: SummaryItem[] = [
  {
    id: 1,
    title: '마케팅팀 주간 회의',
    platform: 'Slack',
    date: '2024-03-20',
    messageCount: 125,
    summaryLength: '3분',
    content: '1. 신규 캠페인 진행 상황 점검\n2. SNS 광고 성과 분석\n3. 다음 분기 마케팅 전략 논의',
  },
  {
    id: 2,
    title: '제품 기획 논의',
    platform: 'KakaoTalk',
    date: '2024-03-19',
    messageCount: 89,
    summaryLength: '2분',
    content: '1. 신규 기능 우선순위 설정\n2. UI/UX 개선 사항\n3. 출시 일정 조정',
  },
  {
    id: 3,
    title: '디자인 피드백',
    platform: 'KakaoTalk',
    date: '2024-03-18',
    messageCount: 67,
    summaryLength: '1분',
    content: '1. 메인 페이지 디자인 리뷰\n2. 색상 체계 조정\n3. 모바일 대응 논의',
  },
  {
    id: 4,
    title: '개발팀 스프린트 회의',
    platform: 'Slack',
    date: '2024-03-17',
    messageCount: 156,
    summaryLength: '4분',
    content: '1. 이번 스프린트 목표 설정\n2. 기술 부채 해결 방안\n3. 코드 리뷰 프로세스 개선',
  },
  {
    id: 5,
    title: '고객 피드백 논의',
    platform: 'KakaoTalk',
    date: '2024-03-16',
    messageCount: 92,
    summaryLength: '2분',
    content: '1. 사용자 피드백 분석\n2. 개선 우선순위 설정\n3. 대응 방안 수립',
  },
]

// 지원되는 플랫폼 목록 - 아이콘과 함께 정의
const platforms: PlatformOption[] = [
  { name: 'Slack', icon: Slack },
  { name: 'KakaoTalk', icon: MessageCircle },
]

/**
 * 요약 카드 컴포넌트
 * 
 * 개별 요약 정보를 표시하는 확장 가능한 카드 컴포넌트입니다.
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {SummaryItem} props.summary - 요약 데이터 객체
 * @param {number} props.index - 애니메이션 지연을 위한 카드 인덱스
 */
const SummaryCard = ({ summary, index }: { summary: SummaryItem, index: number }) => {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  
  // 플랫폼에 따라 적절한 아이콘 선택
  const PlatformIcon = summary.platform === 'Slack' ? Slack : MessageCircle
  
  // 상세 페이지로 이동하는 핸들러
  const handleDetailView = useCallback((e: React.MouseEvent) => {
    e.stopPropagation() // 이벤트 버블링 방지
    router.push(`/dashboard/summaries/${summary.id}`)
  }, [router, summary.id])
  
  // 카드 확장/축소 토글 핸들러
  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])
  
  return (
    <motion.div
      custom={index}
      initial={ANIMATION.initial}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          delay: index * ANIMATION.stagger,
          duration: ANIMATION.duration,
          ease: ANIMATION.easing
        }
      }}
      whileHover={ANIMATION.hover}
    >
      <Card 
        className="interactive-card" 
        hover
      >
        <div className="p-5">
          {/* 카드 헤더: 제목, 메타데이터, 확장/축소 버튼 */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="apple-icon-container">
                  <PlatformIcon className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-lg font-medium text-high-contrast mb-0">{summary.title}</CardTitle>
              </div>
              
              {/* 메타데이터: 날짜, 메시지 수, 요약 길이 */}
              <div className="flex flex-wrap gap-3 text-sm text-medium-contrast">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{summary.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{summary.messageCount}개 메시지</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{summary.summaryLength} 분량</span>
                </div>
              </div>
            </div>
            
            {/* 확장/축소 토글 버튼 */}
            <button
              onClick={toggleExpand}
              className="focus-visible-ring rounded-full p-1"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "요약 내용 접기" : "요약 내용 펼치기"}
            >
              <motion.div 
                animate={{ rotate: isExpanded ? 90 : 0 }} // 확장 시 90도 회전
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-5 h-5 text-medium-contrast" />
              </motion.div>
            </button>
          </div>
          
          {/* 확장 시 표시되는 콘텐츠 영역 */}
          <AnimatePresence>
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {isExpanded && (
                <>
                  {/* 요약 내용 */}
                  <CardContent className="px-3 py-2 mt-2 rounded-lg bg-white-opacity-04 mb-3">
                    <p className="text-white/80 whitespace-pre-line">
                      {summary.content}
                    </p>
                  </CardContent>
                  
                  {/* 상세 보기 버튼 */}
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="secondary"
                      endIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      onClick={handleDetailView}
                    >
                      상세 보기
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}

interface FilterPanelProps { 
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedPlatform: string | null
  setSelectedPlatform: (platform: string | null) => void
  isFilterOpen: boolean
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * 검색 및 필터 패널 컴포넌트
 */
const SearchFilterPanel = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedPlatform, 
  setSelectedPlatform, 
  isFilterOpen, 
  setIsFilterOpen 
}: FilterPanelProps) => {
  const router = useRouter()
  
  const toggleFilter = useCallback(() => {
    setIsFilterOpen((prev: boolean) => !prev)
  }, [setIsFilterOpen])
  
  const handleNewSummary = useCallback(() => {
    router.push('/dashboard/new')
  }, [router])
  
  const clearFilter = useCallback(() => {
    setSelectedPlatform(null)
  }, [setSelectedPlatform])
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="mb-6">
        <div className="p-4 sm:p-5">
          {/* 상단 레이아웃: 검색창과 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 검색 입력 필드 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-medium-contrast" />
              <input
                type="text"
                placeholder="제목으로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white-opacity-04 border border-white-opacity-06 text-white placeholder-medium-contrast focus:outline-none focus:border-white-opacity-10 focus-visible-ring transition-all"
                aria-label="요약 제목 검색"
              />
            </div>
            
            {/* 필터 및 신규 요약 버튼 */}
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={toggleFilter}
                startIcon={<Filter className="w-4 h-4" />}
                aria-expanded={isFilterOpen}
                aria-controls="filter-options"
              >
                <span className="hidden sm:inline">필터</span>
              </Button>
              
              <Button
                variant="primary"
                startIcon={<MessageSquare className="w-4 h-4" />}
                onClick={handleNewSummary}
              >
                신규 요약
              </Button>
            </div>
          </div>
          
          {/* 확장 가능한 필터 옵션 패널 */}
          <AnimatePresence>
            <motion.div 
              id="filter-options"
              initial={false}
              animate={{ 
                height: isFilterOpen ? 'auto' : 0, 
                opacity: isFilterOpen ? 1 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {isFilterOpen && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white-opacity-06">
                  <div className="text-sm text-medium-contrast mr-2 flex items-center">
                    플랫폼:
                  </div>
                  
                  {/* 플랫폼 필터 버튼 */}
                  {platforms.map((platform) => (
                    <Button
                      key={platform.name}
                      variant={selectedPlatform === platform.name ? "primary" : "secondary"}
                      size="sm"
                      startIcon={<platform.icon className="w-4 h-4" />}
                      onClick={() => setSelectedPlatform(
                        selectedPlatform === platform.name ? null : platform.name
                      )}
                      aria-pressed={selectedPlatform === platform.name}
                    >
                      {platform.name}
                    </Button>
                  ))}
                  
                  {/* 필터 초기화 버튼 (플랫폼이 선택된 경우에만 표시) */}
                  {selectedPlatform && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={clearFilter}
                    >
                      필터 초기화
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}

/**
 * 빈 상태 표시 컴포넌트
 */
const EmptyState = ({ 
  hasFilters, 
  resetFilters, 
  startNewSummary 
}: { 
  hasFilters: boolean
  resetFilters: () => void
  startNewSummary: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white-opacity-04 flex items-center justify-center">
          <Search className="w-6 h-6 text-medium-contrast" />
        </div>
        <CardTitle className="text-lg font-medium text-high-contrast mb-2">요약 내역이 없습니다</CardTitle>
        <CardContent className="text-medium-contrast mb-6">
          {hasFilters ? '검색어와 일치하는 요약을 찾을 수 없습니다.' : '아직 생성된 요약이 없습니다.'}
        </CardContent>
        
        {hasFilters ? (
          <Button
            variant="secondary"
            onClick={resetFilters}
          >
            필터 초기화
          </Button>
        ) : (
          <Button
            variant="primary"
            startIcon={<MessageSquare className="w-4 h-4" />}
            onClick={startNewSummary}
          >
            신규 요약 시작하기
          </Button>
        )}
      </Card>
    </motion.div>
  )
}

/**
 * 요약 내역 페이지 메인 컴포넌트
 * 
 * 요약 목록 표시, 검색 및 필터링 기능을 제공하는 메인 페이지 컴포넌트입니다.
 */
export default function SummariesPage() {
  const router = useRouter()
  
  // 상태 관리
  const [searchQuery, setSearchQuery] = useState('') // 검색어
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null) // 선택된 플랫폼
  const [isFilterOpen, setIsFilterOpen] = useState(false) // 필터 패널 표시 여부

  // 필터링된 요약 목록 계산 (메모이제이션)
  const filteredSummaries = useMemo(() => {
    return summaries.filter((summary) => {
      const matchesSearch = summary.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesPlatform = !selectedPlatform || summary.platform === selectedPlatform
      return matchesSearch && matchesPlatform
    })
  }, [searchQuery, selectedPlatform])
  
  // 필터링 상태 존재 여부
  const hasFilters = searchQuery !== '' || selectedPlatform !== null
  
  // 필터 초기화 핸들러
  const resetFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedPlatform(null)
  }, [])
  
  // 신규 요약 시작 핸들러
  const startNewSummary = useCallback(() => {
    router.push('/dashboard/new')
  }, [router])

  return (
    <div className="min-h-screen bg-apple-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl">
        {/* 접근성: 키보드 사용자를 위한 스킵 내비게이션 */}
        <a href="#summaries-list" className="skip-nav">
          요약 목록으로 건너뛰기
        </a>
        
        {/* 헤더 섹션: 타이틀과 설명 */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl font-medium mb-2 text-high-contrast"
          >
            요약 내역
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm text-medium-contrast"
          >
            지금까지 요약한 대화 내역을 확인하세요
          </motion.p>
        </div>

        {/* 검색 및 필터 패널 */}
        <SearchFilterPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />

        {/* 요약 개수 표시 */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-medium-contrast">
            <span className="font-medium text-high-contrast">{filteredSummaries.length}</span>개의 요약
          </p>
        </div>

        {/* 요약 카드 목록 */}
        <div id="summaries-list" className="space-y-4">
          {filteredSummaries.length > 0 ? (
            // 요약이 있는 경우 카드 목록 표시
            filteredSummaries.map((summary, index) => (
              <SummaryCard key={summary.id} summary={summary} index={index} />
            ))
          ) : (
            // 요약이 없거나 검색 결과가 없는 경우 빈 상태 표시
            <EmptyState 
              hasFilters={hasFilters}
              resetFilters={resetFilters}
              startNewSummary={startNewSummary}
            />
          )}
        </div>
      </div>
    </div>
  )
} 