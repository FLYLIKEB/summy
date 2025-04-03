'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Clock } from 'lucide-react';
import { ANIMATION } from './constants';
import { SummaryCardProps } from './types';

/**
 * 개별 요약 카드 컴포넌트
 * 요약 정보를 표시하고 클릭 시 확장되어 내용을 보여줌
 */
const SummaryCard = ({ summary, index }: SummaryCardProps) => {
  // 카드 확장 상태 관리
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 카드 클릭 핸들러
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
      layout
      onClick={toggleExpand}
      className={`apple-card p-5 cursor-pointer ${isExpanded ? 'space-y-4' : ''}`}
    >
      {/* 요약 카드 헤더 */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{summary.title}</h3>
          <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
            {summary.platform}
          </span>
        </div>
      </div>

      {/* 요약 카드 메타 정보 */}
      <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{summary.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{summary.messageCount}개 메시지</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{summary.summaryLength} 소요</span>
        </div>
      </div>

      {/* 요약 컨텐츠 (확장 시에만 표시) */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t dark:border-gray-700"
        >
          <h4 className="font-medium mb-2 text-sm text-gray-600 dark:text-gray-300">요약 내용</h4>
          <p className="text-sm whitespace-pre-line">{summary.content}</p>
          
          <div className="flex justify-end mt-4">
            <button className="apple-button text-sm">전체 보기</button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SummaryCard; 