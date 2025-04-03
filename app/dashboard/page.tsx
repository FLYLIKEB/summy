'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BarChart3, MessageSquare, Clock, Settings, Inbox, ChevronRight } from 'lucide-react'

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
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<{
    summaries: typeof summaries,
    stats: typeof stats
  } | null>(null);

  // 데이터 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setDashboardData({
        summaries,
        stats
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-apple-dark text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-medium text-high-contrast">
              안녕하세요, 홍길동님 👋
            </h1>
            <p className="text-sm text-medium-contrast mt-1">
              오늘도 Summy와 함께 효율적인 하루 보내세요
            </p>
          </div>
          <Link 
            href="/dashboard/settings" 
            className="apple-button apple-button-secondary rounded-lg"
          >
            <Settings className="w-4 h-4" />
            <span>설정</span>
          </Link>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {isLoading ? (
            // 로딩 스켈레톤
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton rounded-xl h-24" />
              ))}
            </>
          ) : (
            // 모바일에서는 콤팩트 카드로 표시
            dashboardData?.stats.map((stat, index) => (
              <div
                key={stat.label}
                className="apple-card interactive-card"
              >
                <div className="hidden sm:flex items-center gap-4 p-4 sm:p-5">
                  <div className="apple-icon-container">
                    <stat.icon className="w-5 h-5 text-high-contrast" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-high-contrast">{stat.value}</h3>
                    <p className="text-xs sm:text-sm text-medium-contrast">{stat.label}</p>
                  </div>
                </div>
                <div className="flex sm:hidden compact-card">
                  <div className="compact-card-icon">
                    <stat.icon className="w-4 h-4 text-medium-contrast" />
                  </div>
                  <div className="compact-card-content">
                    <p className="compact-card-title">{stat.label}</p>
                    <p className="compact-card-value">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 요약 내역 */}
        <div className="apple-card overflow-hidden mb-6 sm:mb-8">
          <div className="p-4 sm:p-5 border-b border-white-opacity-04 flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-medium text-high-contrast">최근 요약 내역</h2>
            <Link 
              href="/dashboard/summaries" 
              className="text-medium-contrast hover:text-high-contrast transition-all text-sm flex items-center gap-1 group"
            >
              <span>모두 보기</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {isLoading ? (
            // 로딩 스켈레톤
            <div className="divide-y divide-white-opacity-03">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 sm:p-5">
                  <div className="skeleton h-6 w-3/4 mb-4" />
                  <div className="skeleton h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : dashboardData?.summaries && dashboardData.summaries.length > 0 ? (
            // 요약 목록
            <div className="divide-y divide-white-opacity-03">
              {dashboardData.summaries.map((summary) => (
                <Link 
                  href={`/dashboard/summaries/${summary.id}`} 
                  key={summary.id} 
                  className="block clickable interactive-card border-none rounded-none"
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                      <h3 className="font-medium mb-1 sm:mb-0 text-high-contrast">{summary.title}</h3>
                      <span className="text-xs sm:text-sm text-medium-contrast">{summary.date}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-medium-contrast">
                      <span>{summary.platform}</span>
                      <span className="hidden sm:inline text-low-contrast">•</span>
                      <span>{summary.messageCount}개의 메시지</span>
                      <span className="hidden sm:inline text-low-contrast">•</span>
                      <span>{summary.summaryLength} 분량</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // 빈 상태
            <div className="empty-state p-12">
              <div className="empty-state-icon">
                <Inbox className="w-full h-full" />
              </div>
              <h3 className="empty-state-title">요약 내역이 없습니다</h3>
              <p className="empty-state-description">
                첫 대화 요약을 시작해보세요. 지금 바로 대화를 요약해보고 시간을 절약하세요.
              </p>
              <Link 
                href="/new" 
                className="apple-button apple-button-primary mt-6"
              >
                <MessageSquare className="w-4 h-4" />
                <span>신규대화 요약</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* 모바일 - 하단 고정 신규대화 요약 버튼 */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center sm:hidden z-20">
        <Link 
          href="/new" 
          className="apple-button apple-button-primary px-6 py-3.5 rounded-full text-base active:scale-[0.98] gap-2.5 shadow-lg"
        >
          <MessageSquare className="w-5 h-5" />
          <span>신규대화 요약</span>
        </Link>
      </div>
      
      {/* 데스크탑 - 오른쪽 하단 고정 신규대화 요약 버튼 */}
      <div className="hidden sm:block fixed bottom-8 right-8 z-20">
        <Link 
          href="/new" 
          className="apple-button apple-button-primary px-5 py-3 rounded-full active:scale-[0.98] gap-2 shadow-lg"
        >
          <MessageSquare className="w-4 h-4" />
          <span>신규대화 요약</span>
        </Link>
      </div>
    </div>
  )
} 