'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
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

  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          summy
        </h2>
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-full text-white hover:bg-opacity-20 transition-all border border-white border-opacity-20"
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
        </button>
      )}
      <section className="min-h-[80vh] container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            메신저 대화,<br />
            요약의 기술
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90">
            대화 읽기 귀찮을 땐, summy가 대신 요약해줄게요
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            AI가 대화 내용을 분석하여 핵심 내용을 요약하고, 
            상황에 맞는 답변을 추천해드려요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-secondary">
              첫 달 무료로 시작하기
            </Link>
            <Link href="/demo" className="btn-primary">
              실제 대화 요약해보기
            </Link>
          </div>
          <p className="text-sm sm:text-base mt-6 opacity-70">
            첫 달은 무료! 설치 없이 바로 시작하세요
          </p>
        </div>
      </section>
    </>
  )
} 