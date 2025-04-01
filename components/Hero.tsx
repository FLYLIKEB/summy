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
    <div className="relative isolate overflow-hidden">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 sm:mb-12 px-2 sm:px-4">
              <h1 className="text-6xl sm:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 tracking-tight">
                SUMMY
              </h1>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              ✨ 대화를 더 쉽게,<br />
              🚀 요약은 더 빠르게
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              💬 긴 대화를 AI가 빠르게 요약해드립니다.<br />
              🎯 핵심만 쏙 뽑아서, 답변까지 제안해드려요.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-purple-500/20 hover:from-purple-600 hover:to-pink-600 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
              >
                🎮 첫 달 무료로 시작하기
              </Link>
              <Link
                href="/demo"
                className="rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-lg font-semibold text-white hover:bg-white/20 transition-all border border-white border-opacity-20"
              >
                🎯 실제 대화 요약해보기
              </Link>
            </div>
          </div>
        </div>
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
    </div>
  )
} 