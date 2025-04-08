'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Logo from '../common/Logo'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // 다크모드 토글
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  // 초기 다크모드 설정
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)
  }, [])

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/8 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Logo variant="text" size="md" />

          {/* 네비게이션 메뉴 */}
          <div className="flex items-center gap-4">
            {/* 다크모드 토글 버튼 */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/8 transition-all"
              whileTap={{ scale: 0.95 }}
              title={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              {isDarkMode ? '🌞' : '🌙'}
            </motion.button>

            {/* 로그인/회원가입 버튼 */}
            <Link
              href="/login"
              className="apple-button apple-button-secondary"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="apple-button apple-button-primary"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
} 