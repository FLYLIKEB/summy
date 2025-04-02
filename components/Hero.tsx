'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './ui/Logo'

export default function Hero() {
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="space-y-12 md:space-y-16 mb-12">
            {/* 로고 */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 to-mint-400 bg-clip-text text-transparent"
            >
              summy
            </motion.h1>

            {/* 주요 특징 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10 w-14 h-14 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <span className="text-2xl md:text-3xl lg:text-4xl font-medium">대화를 더 쉽게</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10 w-14 h-14 flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <span className="text-2xl md:text-3xl lg:text-4xl font-medium">요약은 더 빠르게</span>
                </div>
              </div>
            </motion.div>

            {/* 설명 텍스트 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="bg-white/10 p-2.5 rounded-lg backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center">
                  <span className="text-xl">💬</span>
                </div>
                <span className="text-lg md:text-xl text-white/80">긴 대화를 AI가 빠르게 요약</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="bg-white/10 p-2.5 rounded-lg backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <span className="text-lg md:text-xl text-white/80">핵심만 쏙 뽑아서, 답변까지 제안</span>
              </div>
            </motion.div>
          </div>

          {/* 버튼 그룹 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <a href="/signup" className="btn-primary w-full sm:w-auto min-w-[220px]">
              <span className="inline-flex items-center justify-center">
                <div className="bg-white/20 p-1.5 rounded-full mr-3 w-8 h-8 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-base">🎮</span>
                </div>
                <span>첫 달 무료로 시작하기</span>
              </span>
            </a>
            <a href="/demo" className="btn-secondary w-full sm:w-auto min-w-[220px]">
              <span className="inline-flex items-center justify-center">
                <div className="bg-white/20 p-1.5 rounded-full mr-3 w-8 h-8 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-base">🎯</span>
                </div>
                <span>실제 대화 요약해보기</span>
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* 스크롤 다운 버튼 */}
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors group"
      >
        <span className="text-sm font-medium tracking-wide">더 알아보기</span>
        <motion.div
          animate={{
            y: [0, 5, 0]
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

      {/* 배경 효과 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent_70%)] rotate-180"></div>
      </div>

      {/* 스크롤 업 버튼 */}
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