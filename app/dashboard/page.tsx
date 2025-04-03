'use client'

import React from 'react'
import Link from 'next/link'
import { BarChart3, MessageSquare, Clock, Settings } from 'lucide-react'

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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1f]/90 text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-medium">
              안녕하세요, 홍길동님 👋
            </h1>
            <p className="text-sm text-white/60 mt-1">
              오늘도 Summy와 함께 효율적인 하루 보내세요
            </p>
          </div>
          <Link 
            href="/dashboard/settings" 
            className="px-4 py-2 bg-white/[0.06] text-white/90 rounded-lg text-sm font-medium transition-all hover:bg-white/[0.1] inline-flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            <span>설정</span>
          </Link>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/[0.04] backdrop-blur-md transition-all hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.06]">
                  <stat.icon className="w-5 h-5 text-white/80" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium">{stat.value}</h3>
                  <p className="text-xs sm:text-sm text-white/60">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 요약 내역 */}
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] backdrop-blur-md overflow-hidden mb-6 sm:mb-8">
          <div className="p-4 sm:p-5 border-b border-white/[0.04]">
            <h2 className="text-lg sm:text-xl font-medium">최근 요약 내역</h2>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {summaries.map((summary) => (
              <div key={summary.id} className="p-4 sm:p-5 hover:bg-white/[0.02] transition-all">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                  <h3 className="font-medium mb-1 sm:mb-0">{summary.title}</h3>
                  <span className="text-xs sm:text-sm text-white/50">{summary.date}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/50">
                  <span>{summary.platform}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{summary.messageCount}개의 메시지</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{summary.summaryLength} 분량</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 sm:p-5 border-t border-white/[0.04] text-center">
            <Link href="/dashboard/summaries" className="text-white/70 hover:text-white/90 transition-all text-sm">
              모든 요약 보기
            </Link>
          </div>
        </div>
      </div>
      
      {/* 모바일 - 하단 고정 신규대화 요약 버튼 */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center sm:hidden z-20">
        <Link 
          href="/new" 
          className="apple-button apple-button-primary px-6 py-3.5 rounded-full text-base active:scale-[0.98] gap-2.5"
        >
          <MessageSquare className="w-5 h-5" />
          <span>신규대화 요약</span>
        </Link>
      </div>
      
      {/* 데스크탑 - 오른쪽 하단 고정 신규대화 요약 버튼 */}
      <div className="hidden sm:block fixed bottom-8 right-8 z-20">
        <Link 
          href="/new" 
          className="apple-button apple-button-primary px-5 py-3 rounded-full active:scale-[0.98] gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>신규대화 요약</span>
        </Link>
      </div>
    </div>
  )
} 