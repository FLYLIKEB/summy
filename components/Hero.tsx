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
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* 배경 요소 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        />
      </div>

      <div className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* 로고 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 sm:mb-12 px-2 sm:px-4"
            >
              <Logo variant="text" size="xl" />
            </motion.div>

            {/* 메인 텍스트 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl leading-tight">
                <span className="inline-block mb-2">✨ 대화를 더 쉽게</span>
                <br />
                <span className="inline-block">🚀 요약은 더 빠르게</span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                <span className="inline-block mb-2">💬 긴 대화를 AI가 빠르게 요약해드립니다</span>
                <br />
                <span className="inline-block">🎯 핵심만 쏙 뽑아서, 답변까지 제안해드려요</span>
              </p>
            </motion.div>

            {/* CTA 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-y-4 sm:gap-y-0 sm:gap-x-6"
            >
              <Link
                href="/signup"
                className="btn-primary w-full sm:w-auto group relative overflow-hidden"
              >
                <span className="relative z-10">🎮 첫 달 무료로 시작하기</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-mint-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <Link
                href="/demo"
                className="btn-secondary w-full sm:w-auto group relative overflow-hidden"
              >
                <span className="relative z-10">🎯 실제 대화 요약해보기</span>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

            {/* 스크롤 인디케이터 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-16 flex justify-center"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-400">스크롤하여 더 알아보기</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
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
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 스크롤 버튼 */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all border border-white/20"
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
    </div>
  )
} 