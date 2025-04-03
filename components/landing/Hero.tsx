'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../common/Logo'
import ScrollDownButton from '../common/ScrollDownButton'

/**
 * 히어로 섹션 컴포넌트
 * 
 * 웹사이트의 메인 랜딩 영역으로 서비스의 핵심 가치를 보여주고
 * 사용자가 서비스에 빠르게 접근할 수 있는 경로를 제공합니다.
 */
export default function Hero() {
  // 스크롤 관련 상태 관리
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 컴포넌트 마운트 상태 설정
    setMounted(true)
    
    // 스크롤 이벤트 핸들러: 300px 이상 스크롤 시 상단 이동 버튼 표시
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300)
    }

    // 이벤트 리스너 등록 및 클린업
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 페이지 상단으로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤 애니메이션 적용
    })
  }

  // 서버사이드 렌더링 대응: 마운트 전에는 아무것도 렌더링하지 않음
  if (!mounted) {
    return null
  }

  return (
    <section className="relative h-screen flex flex-col justify-start pt-[12vh] sm:pt-[15vh] overflow-hidden bg-apple-dark">
      {/* 주요 콘텐츠 영역 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="space-y-5 md:space-y-6 mb-5 md:mb-6">
            {/* 로고 영역: 애니메이션 효과와 그라데이션 적용 */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight cursor-pointer"
              onClick={() => {
                const heroSection = document.getElementById('hero')
                if (heroSection) {
                  heroSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              title="맨 위로 이동"
            >
              <Logo variant="text" size="xl" />
            </motion.h1>

            {/* 주요 특징 설명: 순차적 페이드인 애니메이션 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <div className="flex flex-col gap-1 sm:gap-2">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90">메시지 부담은 줄이고</span>
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90">소통 효율은 높이고</span>
                </div>
              </div>
            </motion.div>

            {/* 서비스 상세 설명: 이모티콘과 함께 핵심 기능 표시 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-xl">💬</span>
                <span className="text-sm sm:text-base text-white/70">수백 개의 메시지를 단 몇 줄로 압축</span>
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-xl">✨</span>
                <span className="text-sm sm:text-base text-white/70">상황에 최적화된 답장까지 AI가 제안</span>
              </div>
            </motion.div>
          </div>

          {/* CTA 버튼 그룹: 회원가입 및 데모 링크 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <Link 
              href="/signup" 
              className="apple-button apple-button-primary w-full sm:w-auto min-w-[180px]"
            >
              14일 무료로 시작하기
            </Link>
            <Link 
              href="/demo" 
              className="apple-button apple-button-secondary w-full sm:w-auto min-w-[180px]"
            >
              실제 대화 요약해보기
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 스크롤 다운 버튼 컴포넌트 */}
      <ScrollDownButton delay={0.8} />

      {/* 배경 효과: 미묘한 그라데이션으로 깊이감 추가 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]"></div>
      </div>

      {/* 스크롤 업 버튼: 페이지를 충분히 내렸을 때만 표시됨 */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-2.5 bg-white-opacity-06 backdrop-blur-md rounded-full text-white hover:bg-white-opacity-10 transition-all border border-white-opacity-04"
            aria-label="맨 위로 스크롤"
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
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  )
} 