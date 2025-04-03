'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ANIMATION } from './types';

/**
 * 요약 항목 타입
 */
interface SummaryItem {
  id: number;
  title: string;
  platform: string;
  date: string;
  messageCount: number;
  summaryLength: string;
}

/**
 * 요약 목록 컴포넌트 Props
 */
interface SummaryListProps {
  /** 요약 항목 목록 */
  summaries: SummaryItem[];
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 모두 보기 링크 URL */
  viewAllUrl?: string;
  /** 빈 상태 시 새 요약 링크 URL */
  newSummaryUrl?: string;
  /** 섹션 제목 */
  title?: string;
}

/**
 * 요약 목록 컴포넌트
 * 대시보드 등에서 최근 요약 목록을 표시
 */
const SummaryList = ({
  summaries,
  isLoading = false,
  viewAllUrl = '/dashboard/summaries',
  newSummaryUrl = '/dashboard/new',
  title = '최근 요약 내역'
}: SummaryListProps) => {
  return (
    <motion.div
      initial={ANIMATION.initial}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION.duration, ease: ANIMATION.easing }}
      className="apple-card overflow-hidden"
    >
      {/* 헤더 섹션 */}
      <div className="p-4 sm:p-5 border-b border-white-opacity-04 flex justify-between items-center">
        <h2 className="text-lg sm:text-xl font-medium text-high-contrast">{title}</h2>
        {viewAllUrl && (
          <Link 
            href={viewAllUrl} 
            className="text-medium-contrast hover:text-high-contrast transition-all text-sm flex items-center gap-1 group focus-visible-ring"
            aria-label="모든 요약 보기"
          >
            <span>모두 보기</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        )}
      </div>
      
      {/* 로딩 상태 */}
      {isLoading ? (
        <div className="divide-y divide-white-opacity-03">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 sm:p-5" aria-hidden="true">
              <div className="skeleton h-6 w-3/4 mb-4" />
              <div className="skeleton h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : summaries && summaries.length > 0 ? (
        // 요약 목록
        <ul className="divide-y divide-white-opacity-03">
          {summaries.map((summary) => (
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
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-white-opacity-04 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-medium-contrast" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-6l-2 3h-4l-2-3H2" />
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-high-contrast mb-2">요약 내역이 없습니다</h3>
          <p className="text-medium-contrast mb-6">첫 대화 요약을 시작해보세요. 지금 바로 대화를 요약해보고 시간을 절약하세요.</p>
          <Link 
            href={newSummaryUrl}
            className="apple-button apple-button-primary focus-visible-ring"
            aria-label="신규 대화 요약 시작하기"
          >
            신규 요약 시작하기
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default SummaryList; 