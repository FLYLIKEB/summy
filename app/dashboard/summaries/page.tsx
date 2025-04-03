'use client'

import React, { useState } from 'react'
import { Search, Slack, MessageCircle } from 'lucide-react'

// 임시 데이터
const summaries = [
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

const platforms = [
  { name: 'Slack', icon: Slack },
  { name: 'KakaoTalk', icon: MessageCircle },
]

export default function SummariesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  // 검색 및 필터링된 요약 목록
  const filteredSummaries = summaries.filter((summary) => {
    const matchesSearch = summary.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesPlatform = !selectedPlatform || summary.platform === selectedPlatform
    return matchesSearch && matchesPlatform
  })

  return (
    <div className="min-h-screen bg-apple-bg-color text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-medium mb-2">요약 내역</h1>
          <p className="text-sm text-white/60">
            지금까지 요약한 대화 내역을 확인하세요
          </p>
        </div>

        {/* 검색 및 필터 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="제목으로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.04] text-white placeholder-white/60 focus:outline-none focus:border-white/[0.08]"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {platforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() =>
                  setSelectedPlatform(
                    selectedPlatform === platform.name ? null : platform.name
                  )
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                  selectedPlatform === platform.name
                    ? 'bg-white/[0.1] text-white'
                    : 'bg-white/[0.05] text-white/60 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <platform.icon className="w-4 h-4" />
                {platform.name}
              </button>
            ))}
          </div>
        </div>

        {/* 요약 목록 */}
        <div className="space-y-4">
          {filteredSummaries.map((summary) => (
            <div
              key={summary.id}
              className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.05] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">{summary.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60">
                    <span>{summary.platform}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{summary.messageCount}개의 메시지</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{summary.summaryLength} 분량</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{summary.date}</span>
                  </div>
                </div>
              </div>
              <div className="text-white/80 whitespace-pre-line">
                {summary.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 