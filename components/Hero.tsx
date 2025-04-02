'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './ui/Logo'

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
    <section className="relative h-screen flex flex-col justify-center overflow-hidden">
      {/* 주요 콘텐츠 영역 */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="space-y-6 md:space-y-8 mb-6">
            {/* 로고 영역: 애니메이션 효과와 그라데이션 적용 */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-400 to-mint-400 bg-clip-text text-transparent tracking-tight"
            >
              summy
            </motion.h1>

            {/* 주요 특징 설명: 순차적 페이드인 애니메이션 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-medium">대화를 더 쉽게</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-medium">요약은 더 빠르게</span>
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
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">💬</span>
                <span className="text-base md:text-lg text-white/80">긴 대화를 AI가 빠르게 요약</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">✨</span>
                <span className="text-base md:text-lg text-white/80">핵심만 쏙 뽑아서, 답변까지 제안</span>
              </div>
            </motion.div>
          </div>

          {/* CTA 버튼 그룹: 회원가입 및 데모 링크 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link 
              href="/signup" 
              className="btn-primary w-full sm:w-auto min-w-[200px] inline-flex items-center justify-center"
            >
              첫 달 무료로 시작하기
            </Link>
            <Link 
              href="/demo" 
              className="btn-secondary w-full sm:w-auto min-w-[200px] inline-flex items-center justify-center"
            >
              실제 대화 요약해보기
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 스크롤 다운 버튼: 사용자가 더 아래 콘텐츠로 이동할 수 있도록 안내 */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors group"
          aria-label="페이지 아래로 스크롤"
        >
          <span className="text-sm font-medium tracking-wide">더 알아보기</span>
          {/* 무한 반복 애니메이션 적용된 화살표 아이콘 */}
          <motion.div
            animate={{
              y: [0, 5, 0] // 위아래로 움직이는 애니메이션
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/10 group-hover:bg-white/20 group-hover:border-white/20 transition-all"
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

      {/* 배경 효과: 그라데이션 및 블러 효과로 깊이감 추가 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent_70%)] rotate-180"></div>
      </div>

      {/* 스크롤 업 버튼: 페이지를 충분히 내렸을 때만 표시됨 */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all border border-white/20 group"
            aria-label="맨 위로 스크롤"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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