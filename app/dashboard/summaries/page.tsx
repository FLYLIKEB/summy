'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { PlusCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// 분리된 컴포넌트 및 유틸리티 임포트
import SummaryCard from './components/SummaryCard'
import FilterPanel from './components/FilterPanel'
import EmptyState from './components/EmptyState'
import { MOCK_SUMMARIES, ANIMATION } from './components/constants'
import { SummaryItem } from './components/types'

/**
 * 요약 내역 페이지 컴포넌트
 * 사용자의 모든 요약을 목록으로 표시하고 검색 및 필터링 기능 제공
 */
export default function SummariesPage() {
  const router = useRouter()
  
  // 상태 관리
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  // 필터 초기화 핸들러
  const resetFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedPlatform(null)
  }, [])
  
  // 새 요약 시작 핸들러
  const startNewSummary = useCallback(() => {
    router.push('/dashboard/new')
  }, [router])
  
  // 필터링된 요약 목록 계산
  const filteredSummaries = MOCK_SUMMARIES.filter((summary) => {
    // 플랫폼 필터 확인
    if (selectedPlatform && summary.platform !== selectedPlatform) {
      return false
    }
    
    // 검색어 필터 확인 (제목과 내용에서 검색)
    if (
      searchQuery &&
      !summary.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !summary.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }
    
    return true
  })
  
  // 필터 적용 여부 확인
  const hasFilters = Boolean(searchQuery || selectedPlatform)

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* 접근성 스킵 네비게이션 링크 */}
      <div className="sr-only focus:not-sr-only focus:mb-4">
        <a href="#summaries" className="apple-button">요약 목록으로 건너뛰기</a>
      </div>
      
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">요약 내역</h1>
          <button
            onClick={startNewSummary}
            className="apple-button flex items-center gap-1"
          >
            <PlusCircle className="w-4 h-4" />
            새 요약
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          이전에 생성한 대화 요약을 확인하세요.
        </p>
      </div>
      
      {/* 검색 및 필터 패널 */}
      <FilterPanel
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
      
      {/* 요약 목록 */}
      <div id="summaries" className="space-y-4">
        <AnimatePresence>
          {filteredSummaries.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-4">
                {filteredSummaries.map((summary, index) => (
                  <SummaryCard
                    key={summary.id}
                    summary={summary}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <EmptyState
              hasFilters={hasFilters}
              resetFilters={resetFilters}
              startNewSummary={startNewSummary}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}