'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import StatCard from './StatCard';
import UniversalList from './UniversalList';
import { ListItem } from './types';

/**
 * 통계 항목 타입
 */
interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
  color?: string;
}

/**
 * 요약 항목 타입
 */
interface SummaryItem extends ListItem {
  platform: string;
  messageCount: number;
  summaryLength: string;
}

/**
 * 대시보드 컴포넌트 Props
 */
interface DashboardProps {
  /** 사용자 이름 */
  userName: string;
  /** 통계 항목 목록 */
  stats: StatItem[];
  /** 요약 항목 목록 */
  summaries: SummaryItem[];
  /** 요약 상세 페이지 기본 경로 */
  summaryDetailPath?: string;
  /** 전체 요약 목록 페이지 경로 */
  allSummariesPath?: string;
  /** 신규 요약 작성 페이지 경로 */
  newSummaryPath?: string;
  /** 설정 페이지 경로 */
  settingsPath?: string;
}

/**
 * 대시보드 컴포넌트
 * 상단 greeting, 통계 카드, 최근 요약 목록을 표시
 */
const Dashboard = ({
  userName,
  stats,
  summaries,
  summaryDetailPath = '/dashboard/summaries',
  allSummariesPath = '/dashboard/summaries',
  newSummaryPath = '/dashboard/new',
  settingsPath = '/dashboard/settings'
}: DashboardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // 데이터 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
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
                안녕하세요, {userName}님 👋
              </h1>
              <p className="text-sm text-medium-contrast mt-1">
                오늘도 Summy와 함께 효율적인 하루 보내세요
              </p>
            </div>
            <Link 
              href={settingsPath} 
              className="apple-button apple-button-secondary rounded-lg focus-visible-ring"
              aria-label="설정 페이지로 이동"
            >
              <Settings className="w-4 h-4" />
              <span>설정</span>
            </Link>
          </div>

          {/* 통계 카드 */}
          <section aria-labelledby="stats-heading" className="mb-6 sm:mb-8">
            <h2 id="stats-heading" className="sr-only">통계 정보</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  isLoading={isLoading}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* 요약 내역 */}
          <section aria-labelledby="summaries-heading" className="mb-6 sm:mb-8">
            <h2 id="summaries-heading" className="sr-only">최근 요약 내역</h2>
            <UniversalList
              items={summaries}
              title="최근 요약 내역"
              viewAllUrl={allSummariesPath}
              isLoading={isLoading}
              detailUrlPattern={`${summaryDetailPath}/{id}`}
              mode="simple"
              enableFiltering={false}
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
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 