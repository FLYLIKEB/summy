'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Logo from '../common/Logo'
import { useTheme } from '../providers/ThemeProvider'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const isDarkMode = theme === 'dark'

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
              onClick={() => {
                toggleTheme();
                // 더 명확한 시각적 피드백을 위해 버튼에 짧은 효과 적용
                const btn = document.activeElement as HTMLElement;
                if (btn) btn.blur();
              }}
              className={`p-2 rounded-lg transition-all flex items-center justify-center ${
                isDarkMode 
                  ? 'text-white/70 hover:text-white hover:bg-white/8 active:bg-white/15' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200/50 active:bg-gray-200/80'
              }`}
              whileTap={{ scale: 0.9 }}
              title={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
              aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              <span className="text-lg">
                {isDarkMode ? '🌞' : '🌙'}
              </span>
            </motion.button>

            {/* 로그인/회원가입 버튼 */}
            <Link
              href="/login"
              className={`px-4 py-2 rounded-lg transition-all ${
                isDarkMode
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-black/10 text-black hover:bg-black/20'
              }`}
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
} 