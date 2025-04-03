'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ANIMATION } from './types';

/**
 * 통계 카드 Props 타입
 */
interface StatCardProps {
  /** 통계 라벨 */
  label: string;
  /** 통계 값 */
  value: string;
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
  if (isLoading) {
    return (
      <div className="skeleton rounded-xl h-24" aria-hidden="true" />
    );
  }

  return (
    <motion.div
      initial={ANIMATION.initial}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION.duration,
        delay: index * ANIMATION.stagger,
        ease: ANIMATION.easing,
      }}
      whileHover={ANIMATION.hover}
      className="apple-card interactive-card focus-visible-card"
      tabIndex={0}
      role="button"
      aria-label={`${label}: ${value}`}
    >
      {/* 데스크톱 레이아웃 */}
      <div className="hidden sm:flex items-center gap-4 p-4 sm:p-5">
        <div className="apple-icon-container">
          <Icon className="w-5 h-5 text-high-contrast" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-medium text-high-contrast">{value}</h3>
          <p className="text-xs sm:text-sm text-medium-contrast">{label}</p>
        </div>
      </div>
      
      {/* 모바일 레이아웃 */}
      <div className="flex sm:hidden compact-card">
        <div className="compact-card-icon">
          <Icon className="w-4 h-4 text-medium-contrast" aria-hidden="true" />
        </div>
        <div className="compact-card-content">
          <p className="compact-card-title">{label}</p>
          <p className="compact-card-value">{value}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard; 