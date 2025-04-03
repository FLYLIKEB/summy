'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ContentCardProps, ListItem, ANIMATION } from './types';

/**
 * 콘텐츠 카드 컴포넌트
 * 요약, 게시글 등 다양한 콘텐츠를 표시하는 확장 가능한 카드
 */
const ContentCard = <T extends ListItem>({
  item,
  index,
  renderHeader,
  renderMeta,
  renderContent,
  renderFooter,
  onViewDetail
}: ContentCardProps<T>) => {
  // 카드 확장 상태 관리
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 카드 클릭 핸들러
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 상세 보기 클릭 핸들러
  const handleViewDetail = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 확장/축소 방지
    if (onViewDetail) {
      onViewDetail(item);
    }
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
      {/* 카드 헤더 */}
      <div className="flex justify-between items-start">
        {renderHeader ? (
          renderHeader(item)
        ) : (
          <div>
            <h3 className="font-medium text-lg mb-1 line-clamp-1">{item.title}</h3>
            <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
              {item.category}
            </span>
          </div>
        )}
      </div>

      {/* 카드 메타 정보 */}
      <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
        {renderMeta ? (
          renderMeta(item)
        ) : (
          <div className="flex items-center gap-1">
            <span>{item.date}</span>
          </div>
        )}
      </div>

      {/* 확장된 콘텐츠 (확장 시에만 표시) */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t dark:border-gray-700"
        >
          {renderContent ? (
            renderContent(item)
          ) : (
            <>
              <h4 className="font-medium mb-2 text-sm text-gray-600 dark:text-gray-300">내용</h4>
              <p className="text-sm whitespace-pre-line">{item.content}</p>
            </>
          )}
          
          {renderFooter ? (
            renderFooter(item)
          ) : (
            onViewDetail && (
              <div className="flex justify-end mt-4">
                <button 
                  className="apple-button text-sm"
                  onClick={handleViewDetail}
                >
                  전체 보기
                </button>
              </div>
            )
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContentCard; 