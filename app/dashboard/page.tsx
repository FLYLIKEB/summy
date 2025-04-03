'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);

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

  // 키보드 모드 감지
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardMode(true);
        if (indicatorRef.current) {
          indicatorRef.current.classList.add('active');
        }
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardMode(false);
      if (indicatorRef.current) {
        indicatorRef.current.classList.remove('active');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-apple-dark text-white relative">
      {/* 스킵 내비게이션 */}
      <a href="#main-content" className="skip-nav">
        메인 콘텐츠로 건너뛰기
      </a>

      {/* 키보드 탐색 인디케이터 */}
      <div ref={indicatorRef} className="keyboard-mode-indicator">
        키보드 모드
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
        <main id="main-content">
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
              className="apple-button apple-button-secondary rounded-lg focus-visible-ring"
              aria-label="설정 페이지로 이동"
            >
              <Settings className="w-4 h-4" />
              <span>설정</span>
            </Link>
          </div>

          {/* 통계 카드 */}
          <section aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="sr-only">통계 정보</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {isLoading ? (
                // 로딩 스켈레톤
                <>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="skeleton rounded-xl h-24" aria-hidden="true" />
                  ))}
                </>
              ) : (
                // 모바일에서는 콤팩트 카드로 표시
                dashboardData?.stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="apple-card interactive-card focus-visible-card"
                    tabIndex={0}
                    role="button"
                    aria-label={`${stat.label}: ${stat.value}`}
                  >
                    <div className="hidden sm:flex items-center gap-4 p-4 sm:p-5">
                      <div className="apple-icon-container">
                        <stat.icon className="w-5 h-5 text-high-contrast" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-medium text-high-contrast">{stat.value}</h3>
                        <p className="text-xs sm:text-sm text-medium-contrast">{stat.label}</p>
                      </div>
                    </div>
                    <div className="flex sm:hidden compact-card">
                      <div className="compact-card-icon">
                        <stat.icon className="w-4 h-4 text-medium-contrast" aria-hidden="true" />
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
          </section>

          {/* 요약 내역 */}
          <section aria-labelledby="summaries-heading">
            <div className="apple-card overflow-hidden mb-6 sm:mb-8">
              <div className="p-4 sm:p-5 border-b border-white-opacity-04 flex justify-between items-center">
                <h2 id="summaries-heading" className="text-lg sm:text-xl font-medium text-high-contrast">최근 요약 내역</h2>
                <Link 
                  href="/dashboard/summaries" 
                  className="text-medium-contrast hover:text-high-contrast transition-all text-sm flex items-center gap-1 group focus-visible-ring"
                  aria-label="모든 요약 보기"
                >
                  <span>모두 보기</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
              
              {isLoading ? (
                // 로딩 스켈레톤
                <div className="divide-y divide-white-opacity-03">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 sm:p-5" aria-hidden="true">
                      <div className="skeleton h-6 w-3/4 mb-4" />
                      <div className="skeleton h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : dashboardData?.summaries && dashboardData.summaries.length > 0 ? (
                // 요약 목록
                <ul className="divide-y divide-white-opacity-03">
                  {dashboardData.summaries.map((summary, index) => (
                    <li key={summary.id}>
                      <Link 
                        href={`/dashboard/summaries/${summary.id}`} 
                        className="block clickable interactive-card border-none rounded-none focus-visible-ring"
                        tabIndex={0}
                        aria-label={`${summary.title} 요약, ${summary.date}, ${summary.platform}, ${summary.messageCount}개의 메시지, ${summary.summaryLength} 분량`}
                      >
                        <div className="p-4 sm:p-5">
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                            <h3 className="font-medium mb-1 sm:mb-0 text-high-contrast">{summary.title}</h3>
                            <span className="text-xs sm:text-sm text-medium-contrast">{summary.date}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-medium-contrast">
                            <span>{summary.platform}</span>
                            <span className="hidden sm:inline text-low-contrast" aria-hidden="true">•</span>
                            <span>{summary.messageCount}개의 메시지</span>
                            <span className="hidden sm:inline text-low-contrast" aria-hidden="true">•</span>
                            <span>{summary.summaryLength} 분량</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                // 빈 상태
                <div className="empty-state p-12">
                  <div className="empty-state-icon" aria-hidden="true">
                    <Inbox className="w-full h-full" />
                  </div>
                  <h3 className="empty-state-title">요약 내역이 없습니다</h3>
                  <p className="empty-state-description">
                    첫 대화 요약을 시작해보세요. 지금 바로 대화를 요약해보고 시간을 절약하세요.
                  </p>
                  <Link 
                    href="/dashboard/new" 
                    className="apple-button apple-button-primary mt-6 focus-visible-ring"
                    aria-label="신규대화 요약 시작하기"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    <span>신규대화 요약</span>
                  </Link>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
      
      {/* 모바일 - 하단 고정 신규대화 요약 버튼 */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center sm:hidden z-20">
        <Link 
          href="/dashboard/new" 
          className="apple-button apple-button-primary px-6 py-3.5 rounded-full text-base active:scale-[0.98] gap-2.5 shadow-lg focus-visible-ring"
          aria-label="신규대화 요약 시작하기"
        >
          <MessageSquare className="w-5 h-5" aria-hidden="true" />
          <span>신규대화 요약</span>
        </Link>
      </div>
      
      {/* 데스크탑 - 오른쪽 하단 고정 신규대화 요약 버튼 */}
      <div className="hidden sm:block fixed bottom-8 right-8 z-20">
        <Link 
          href="/dashboard/new" 
          className="apple-button apple-button-primary px-5 py-3 rounded-full active:scale-[0.98] gap-2 shadow-lg focus-visible-ring"
          aria-label="신규대화 요약 시작하기"
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span>신규대화 요약</span>
        </Link>
      </div>
    </div>
  )
} 