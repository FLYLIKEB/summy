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
    <section className="section-padding relative overflow-hidden">
      <div className="container-padding content-extra-wide">
        <div className="flex flex-col gap-8 md:gap-12 items-center text-center">
          <div className="component-spacing">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-mint-400 bg-clip-text text-transparent animate-fade-in">
              복잡한 대화도<br className="hidden sm:block" /> AI로 한눈에 요약
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              회의, 채팅, 메일 등 모든 형태의 대화를<br className="hidden sm:block" /> 
              빠르고 정확하게 요약해 드립니다
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a href="/signup" className="btn-primary">
              무료로 시작하기
            </a>
            <a href="/demo" className="btn-secondary">
              데모 둘러보기
            </a>
          </div>

          <div className="w-full max-w-4xl mx-auto mt-4 md:mt-8 relative animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src="/images/hero-preview.jpg" 
                  alt="Summy 앱 미리보기" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="p-4 md:p-6 text-left">
                <h3 className="text-lg md:text-xl font-semibold">30분 회의를 30초로 요약</h3>
                <p className="text-white/70 text-sm md:text-base">핵심 주제와 결정 사항만 확인하세요</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_70%)]"></div>

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
    </section>
  )
} 