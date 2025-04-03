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

import React, { useState, useCallback } from 'react'
import { Search, Slack, MessageCircle, Filter, ChevronRight, Calendar, Clock, MessageSquare, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'

// 타입 정의
interface Summary {
  id: number
  title: string
  platform: 'Slack' | 'KakaoTalk'
  date: string
  messageCount: number
  summaryLength: string
  content: string
}

interface Platform {
  name: 'Slack' | 'KakaoTalk'
  icon: React.ComponentType
}

// 상수
const ANIMATION_DURATION = 0.3
const STAGGER_DELAY = 0.1

// 지원되는 플랫폼 목록 - 아이콘과 함께 정의
const PLATFORMS: Platform[] = [
  { name: 'Slack', icon: Slack },
  { name: 'KakaoTalk', icon: MessageCircle },
]

// 임시 데이터 - 실제 구현 시 API 호출로 대체될 예정
const DUMMY_SUMMARIES: Summary[] = [
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

/**
 * 헤더 섹션 컴포넌트
 */
const HeaderSection = () => (
  <div className="mb-8">
    <motion.h1 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DURATION }}
      className="text-xl sm:text-2xl font-medium mb-2 text-high-contrast"
    >
      요약 내역
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: ANIMATION_DURATION, delay: STAGGER_DELAY }}
      className="text-sm text-medium-contrast"
    >
      지금까지 요약한 대화 내역을 확인하세요
    </motion.p>
  </div>
)

/**
 * 메타데이터 아이템 컴포넌트
 */
const MetadataItem = ({ icon: Icon, text }: { icon: React.ComponentType, text: string }) => (
  <div className="flex items-center gap-1.5">
    <Icon className="w-3.5 h-3.5" />
    <span>{text}</span>
  </div>
)

/**
 * 요약 카드 컴포넌트
 * 
 * 개별 요약 정보를 표시하는 확장 가능한 카드 컴포넌트입니다.
 */
const SummaryCard = ({ summary, index }: { summary: Summary, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // 플랫폼에 따라 적절한 아이콘 선택
  const PlatformIcon = summary.platform === 'Slack' ? Slack : MessageCircle
  
  const handleExpandToggle = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])
  
  const handleDetailView = useCallback((e: React.MouseEvent) => {
    e.stopPropagation() // 이벤트 버블링 방지
    window.location.href = `/dashboard/summaries/${summary.id}`
  }, [summary.id])

  return (
    <motion.div
      custom={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          delay: index * STAGGER_DELAY,
          duration: ANIMATION_DURATION,
          ease: [0.25, 1, 0.5, 1] // 부드러운 이징 효과
        }
      }}
      whileHover={{ scale: 1.01, y: -2 }} // 호버 시 약간 위로 떠오르는 효과
    >
      <div className="interactive-card">
        <Card hover>
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
                  <MetadataItem icon={Calendar} text={summary.date} />
                  <MetadataItem icon={MessageSquare} text={`${summary.messageCount}개 메시지`} />
                  <MetadataItem icon={Clock} text={`${summary.summaryLength} 분량`} />
                </div>
              </div>
              
              {/* 확장/축소 토글 버튼 */}
              <button
                onClick={handleExpandToggle}
                className="focus-visible-ring rounded-full p-1"
                aria-expanded={isExpanded}
              >
                <motion.div 
                  animate={{ rotate: isExpanded ? 90 : 0 }} // 확장 시 90도 회전
                  transition={{ duration: ANIMATION_DURATION }}
                >
                  <ChevronRight className="w-5 h-5 text-medium-contrast" />
                </motion.div>
              </button>
            </div>
            
            {/* 확장 시 표시되는 콘텐츠 영역 */}
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{ duration: ANIMATION_DURATION }}
              className="overflow-hidden"
            >
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
            </motion.div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

/**
 * 검색 및 필터 패널 컴포넌트
 */
const SearchFilterPanel = ({ 
  searchQuery, 
  onSearchChange, 
  selectedPlatform, 
  onPlatformChange,
  isFilterOpen,
  onFilterToggle
}: {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedPlatform: string | null
  onPlatformChange: (platform: string | null) => void
  isFilterOpen: boolean
  onFilterToggle: () => void
}) => {
  
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value)
  }, [onSearchChange])
  
  const handlePlatformSelect = useCallback((platform: string) => {
    onPlatformChange(selectedPlatform === platform ? null : platform)
  }, [selectedPlatform, onPlatformChange])
  
  const handleClearFilters = useCallback(() => {
    onPlatformChange(null)
  }, [onPlatformChange])
  
  const handleNewSummary = useCallback(() => {
    window.location.href = '/dashboard/new'
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DURATION, delay: STAGGER_DELAY * 2 }}
    >
      <div className="mb-6">
        <Card>
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
                  onChange={handleSearchChange}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white-opacity-04 border border-white-opacity-06 text-white placeholder-medium-contrast focus:outline-none focus:border-white-opacity-10 focus-visible-ring transition-all"
                  aria-label="요약 제목 검색"
                />
              </div>
              
              {/* 필터 및 신규 요약 버튼 */}
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={onFilterToggle}
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
            <motion.div 
              id="filter-options"
              initial={false}
              animate={{ 
                height: isFilterOpen ? 'auto' : 0, 
                opacity: isFilterOpen ? 1 : 0 
              }}
              transition={{ duration: ANIMATION_DURATION }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white-opacity-06">
                <div className="text-sm text-medium-contrast mr-2 flex items-center">
                  플랫폼:
                </div>
                
                {/* 플랫폼 필터 버튼 */}
                {PLATFORMS.map((platform) => (
                  <Button
                    key={platform.name}
                    variant={selectedPlatform === platform.name ? "primary" : "secondary"}
                    size="sm"
                    startIcon={<platform.icon className="w-4 h-4" />}
                    onClick={() => handlePlatformSelect(platform.name)}
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
                    onClick={handleClearFilters}
                  >
                    필터 초기화
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

/**
 * 빈 상태 컴포넌트 - 요약이 없거나 검색 결과가 없는 경우 표시
 */
const EmptyState = ({ 
  hasFilters, 
  onClearFilters, 
  onNewSummary 
}: {
  hasFilters: boolean
  onClearFilters: () => void
  onNewSummary: () => void
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: ANIMATION_DURATION }}
  >
    <div className="p-8 text-center">
      <Card>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white-opacity-04 flex items-center justify-center">
          <Search className="w-6 h-6 text-medium-contrast" />
        </div>
        <CardTitle className="text-lg font-medium text-high-contrast mb-2">요약 내역이 없습니다</CardTitle>
        <CardContent className="text-medium-contrast mb-6">
          {hasFilters ? '검색어와 일치하는 요약을 찾을 수 없습니다.' : '아직 요약된 대화가 없습니다.'}
        </CardContent>
        
        {hasFilters ? (
          <Button
            variant="secondary"
            onClick={onClearFilters}
          >
            필터 초기화
          </Button>
        ) : (
          <Button
            variant="primary"
            startIcon={<MessageSquare className="w-4 h-4" />}
            onClick={onNewSummary}
          >
            신규 요약 시작하기
          </Button>
        )}
      </Card>
    </div>
  </motion.div>
)

/**
 * 요약 내역 페이지 메인 컴포넌트
 * 
 * 요약 목록 표시, 검색 및 필터링 기능을 제공하는 메인 페이지 컴포넌트입니다.
 */
export default function SummariesPage() {
  // 상태 관리
  const [searchQuery, setSearchQuery] = useState('') // 검색어
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null) // 선택된 플랫폼
  const [isFilterOpen, setIsFilterOpen] = useState(false) // 필터 패널 표시 여부

  // 이벤트 핸들러
  const toggleFilter = useCallback(() => {
    setIsFilterOpen(prev => !prev)
  }, [])
  
  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedPlatform(null)
  }, [])
  
  const handleNewSummary = useCallback(() => {
    window.location.href = '/dashboard/new'
  }, [])

  // 검색 및 필터링 로직: 제목 기반 검색 + 플랫폼 필터링
  const filteredSummaries = DUMMY_SUMMARIES.filter((summary) => {
    const matchesSearch = searchQuery === '' || 
      summary.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlatform = !selectedPlatform || summary.platform === selectedPlatform
    return matchesSearch && matchesPlatform
  })
  
  // 필터가 적용되었는지 여부
  const hasFilters = searchQuery !== '' || selectedPlatform !== null

  return (
    <div className="min-h-screen bg-apple-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl">
        {/* 접근성: 키보드 사용자를 위한 스킵 내비게이션 */}
        <a href="#summaries-list" className="skip-nav">
          요약 목록으로 건너뛰기
        </a>
        
        {/* 헤더 섹션 */}
        <HeaderSection />

        {/* 검색 및 필터 패널 */}
        <SearchFilterPanel 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
          isFilterOpen={isFilterOpen}
          onFilterToggle={toggleFilter}
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
              onClearFilters={clearFilters}
              onNewSummary={handleNewSummary}
            />
          )}
        </div>
      </div>
    </div>
  )
} 