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
    // localStorage에 다크모드 설정 저장
    if (document.documentElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark')
    } else {
      localStorage.setItem('theme', 'light')
    }
  }

  // 초기 다크모드 설정
  useEffect(() => {
    // localStorage에서 테마 설정 불러오기
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // 저장된 테마가 있으면 그 설정을 사용, 없으면 시스템 설정 사용
    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setIsDarkMode(false)
    }
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
          ? isDarkMode
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-white/80 backdrop-blur-xl border-b border-black/10'
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
              className={`p-2 rounded-lg transition-all ${
                isDarkMode 
                  ? 'text-white/70 hover:text-white hover:bg-white/8' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200/50'
              }`}
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