'use client'

import React from 'react'
import { motion } from 'framer-motion'

/**
 * 스크롤 다운 버튼 컴포넌트
 * 
 * 사용자에게 페이지를 아래로 스크롤하도록 안내하는 버튼입니다.
 * 화면 하단 중앙에 위치하며, 애니메이션 효과가 적용된 화살표 아이콘을 포함합니다.
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {string} [props.text="더 알아보기"] - 버튼에 표시될 텍스트
 * @param {number} [props.delay=0.8] - 애니메이션 시작 지연 시간 (초)
 * @param {number} [props.scrollToHeight] - 스크롤할 높이 (기본값: 화면 높이)
 */
interface ScrollDownButtonProps {
  text?: string;
  delay?: number;
  scrollToHeight?: number;
}

export default function ScrollDownButton({
  text = "더 알아보기",
  delay = 0.8,
  scrollToHeight
}: ScrollDownButtonProps) {
  
  const handleScroll = () => {
    const targetHeight = scrollToHeight ?? window.innerHeight;
    window.scrollTo({
      top: targetHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="scroll-down-container">
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        onClick={handleScroll}
        className="scroll-down-button"
        aria-label="페이지 아래로 스크롤"
      >
        <span className="scroll-down-text">{text}</span>
        <motion.div
          animate={{
            y: [0, 5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="scroll-down-icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  )
} 