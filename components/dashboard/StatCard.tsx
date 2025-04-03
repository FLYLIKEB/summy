'use client';

import { LucideIcon } from 'lucide-react';
import React from 'react';

/**
 * 통계 카드 Props 타입
 */
interface StatCardProps {
  /** 통계 라벨 */
  label: string;
  /** 통계 값 */
  value: string | number;
  /** 아이콘 컴포넌트 */
  icon: LucideIcon;
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 카드 인덱스 (애니메이션 지연용) */
  index?: number;
}

/**
 * 통계 정보를 표시하는 카드 컴포넌트
 * 대시보드 등에서 주요 지표를 시각적으로 표시
 */
const StatCard = ({ label, value, icon: Icon, isLoading = false, index = 0 }: StatCardProps) => {
  return (
    <div className="apple-card p-5 bg-card-bg-light dark:bg-card-bg-dark border border-white/5">
      {isLoading ? (
        <div className="animate-pulse">
          <div className="w-10 h-10 rounded-full bg-white/10 mb-4"></div>
          <div className="h-6 bg-white/10 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-white/10 rounded w-1/3"></div>
        </div>
      ) : (
        <>
          <div className="apple-icon-container mb-4">
            <Icon className="w-5 h-5 text-high-contrast" />
          </div>
          <h3 className="text-3xl font-bold text-high-contrast">{value}</h3>
          <p className="text-sm text-medium-contrast mt-1">{label}</p>
        </>
      )}
    </div>
  );
};

export default StatCard; 