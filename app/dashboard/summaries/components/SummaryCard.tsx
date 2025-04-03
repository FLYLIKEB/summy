'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MessageSquare, ChevronRight } from 'lucide-react';
import { SummaryCardProps } from './types';
import { ANIMATION } from './constants';
import { ContentCard } from '@/components/common';

/**
 * 개별 요약을 카드 형태로 표시하는 컴포넌트
 * 클릭 시 확장되어 상세 내용을 보여줌
 */
const SummaryCard = ({ summary, index, onViewDetail }: SummaryCardProps) => {
  return (
    <ContentCard
      item={summary}
      index={index}
      renderHeader={(item) => (
        <div>
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{item.title}</h3>
          <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
            {item.platform}
          </span>
        </div>
      )}
      renderMeta={(item) => (
        <>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{item.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{item.messageCount}개 메시지</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{item.summaryLength}자 요약</span>
          </div>
        </>
      )}
      renderContent={(item) => (
        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {item.content}
        </p>
      )}
      renderFooter={(item) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetail?.(item);
          }}
          className="apple-button mt-2 text-sm flex items-center gap-1"
        >
          자세히 보기
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
      onViewDetail={onViewDetail}
    />
  );
};

export default SummaryCard; 