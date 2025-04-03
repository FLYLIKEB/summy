'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 네비게이션 아이템 타입 정의
interface NavItem {
  id: string
  label: string
  emoji: string
}

// 네비게이션 구성 항목
const navItems: NavItem[] = [
  { id: 'hero', label: '소개', emoji: '👋' },
  { id: 'reviews', label: '사용자 후기', emoji: '💬' },
  { id: 'demo', label: '서비스 미리보기', emoji: '🎬' },
  { id: 'problems', label: '왜 필요한가요?', emoji: '🤔' },
  { id: 'features', label: '주요 기능', emoji: '✨' },
  { id: 'special-features', label: '특별한 점', emoji: '🚀' },
  { id: 'cta', label: '시작하기', emoji: '🎯' }
]

interface PageNavigationProps {
  className?: string
}

export default function PageNavigation({ className = '' }: PageNavigationProps) {
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolling, setIsScrolling] = useState(false)
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 현재 활성화된 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return

      const sections = navItems.map(item => {
        const element = document.getElementById(item.id)
        if (!element) return { id: item.id, position: 0 }
        
        const rect = element.getBoundingClientRect()
        return {
          id: item.id,
          position: rect.top + window.scrollY - 100
        }
      })

      const scrollPosition = window.scrollY
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].position) {
          setActiveSection(sections[i].id)
          break
        }
      }
      
      // 스크롤 중에는 네비게이션 축소
      if (isMobile && isNavExpanded) {
        setIsNavExpanded(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolling, isMobile, isNavExpanded])

  // 섹션으로 스크롤 처리
  const scrollToSection = (id: string) => {
    setIsScrolling(true)
    setIsNavExpanded(false)
    
    const element = document.getElementById(id)
    
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      })
      
      // 스크롤 완료 후 상태 업데이트
      setTimeout(() => {
        setActiveSection(id)
        setIsScrolling(false)
      }, 500)
    }
  }
  
  // 현재 활성 섹션의 이모지 찾기
  const getActiveEmoji = () => {
    const activeItem = navItems.find(item => item.id === activeSection)
    return activeItem ? activeItem.emoji : navItems[0].emoji
  }

  return (
    <>
      {/* 모바일용 간소화된 네비게이션 */}
      <AnimatePresence>
        {isMobile && !isNavExpanded && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsNavExpanded(true)}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg"
            style={{
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), 0 0 4px rgba(255, 255, 255, 0.05)'
            }}
          >
            <span className="text-xl">{getActiveEmoji()}</span>
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* 확장된 네비게이션 메뉴 */}
      <AnimatePresence>
        {(isNavExpanded || !isMobile) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className={`fixed ${isMobile ? 'left-0 bottom-20' : 'left-1/2 transform -translate-x-1/2 bottom-6'} z-40 ${className} ${isMobile ? 'mx-4' : ''}`}
          >
            <motion.div
              className="backdrop-blur-xl bg-white/10 rounded-full border border-white/20 shadow-lg"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(255, 255, 255, 0.1)'
              }}
              layout
            >
              {isMobile && (
                <div className="absolute -top-10 right-0">
                  <button 
                    onClick={() => setIsNavExpanded(false)}
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70"
                  >
                    <span className="text-xs">✕</span>
                  </button>
                </div>
              )}
              
              <div className="relative px-2 py-1.5">
                <ul className="flex items-center gap-1 sm:gap-2">
                  {navItems.map((item) => (
                    <motion.li key={item.id} layout>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`
                          px-2.5 sm:px-3 py-2 rounded-full text-sm transition-all
                          ${activeSection === item.id
                            ? 'bg-white/20 text-white shadow-inner'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                          }
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20
                        `}
                        title={item.label}
                      >
                        <span className="flex items-center justify-center sm:justify-start gap-1.5">
                          <span className="text-lg sm:text-base">{item.emoji}</span>
                          <span className={`${isMobile ? 'hidden' : 'hidden sm:inline-block'} text-sm whitespace-nowrap`}>
                            {item.label}
                          </span>
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 