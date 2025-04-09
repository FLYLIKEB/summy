'use client'

/**
 * PageNavigation 컴포넌트
 * 
 * 애플 스타일의 페이지 내 네비게이션 컴포넌트입니다.
 * 사용자가 페이지의 특정 섹션으로 빠르게 이동할 수 있도록 도와주며,
 * 현재 보고 있는 섹션을 인디케이터로 표시합니다.
 * 
 * 주요 특징:
 * - 모바일/데스크톱 반응형 디자인
 * - 현재 활성화된 섹션 자동 감지
 * - 부드러운 스크롤 애니메이션
 * - 애플 스타일의 블러 이펙트 및 UI 
 */
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 네비게이션 아이템 타입 정의
interface NavItem {
  id: string        // 섹션의 HTML ID (스크롤 타겟)
  label: string     // 표시될 텍스트
  emoji: string     // 각 항목을 대표하는 이모지
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
  className?: string  // 외부에서 추가할 수 있는 클래스명
}

export default function PageNavigation({ className = '' }: PageNavigationProps) {
  // 상태 관리
  const [activeSection, setActiveSection] = useState(navItems[0].id)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  // 모바일 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 활성 섹션 감지
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
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolling])

  /**
   * 섹션으로 스크롤 처리 함수
   * 선택한 섹션으로 부드럽게 스크롤하고,
   * 모바일에서는 네비게이션을 축소합니다.
   */
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
  
  /**
   * 현재 활성 섹션의 이모지 가져오기
   * 모바일 축소 버전에서 표시될 이모지를 결정합니다.
   */
  const getActiveEmoji = () => {
    const activeItem = navItems.find(item => item.id === activeSection)
    return activeItem ? activeItem.emoji : navItems[0].emoji
  }

  /**
   * 애니메이션 변형 정의
   * Framer Motion을 활용한 부드러운 애니메이션을 위한 설정입니다.
   */
  // 활성화 인디케이터 애니메이션 변형
  const indicatorVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
    tap: { scale: 0.9, transition: { duration: 0.1 } }
  }

  // 메뉴 컨테이너 애니메이션 변형
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05  // 각 항목이 순차적으로 나타나도록 함
      } 
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      transition: { 
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1]
      } 
    }
  }

  // 메뉴 아이템 애니메이션 변형
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  }

  return (
    <>
      {/* 축소된 네비게이션 버튼 (모바일 & 데스크탑 공통) */}
      <AnimatePresence>
        {!isNavExpanded && (
          <motion.button
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
            whileTap="tap"
            variants={indicatorVariants}
            onClick={() => setIsNavExpanded(true)}
            className={`fixed ${isMobile ? 'bottom-6 left-6' : 'top-20 left-4'} z-50 w-12 h-12 flex items-center justify-center rounded-full dark:bg-white/8 bg-black/8 backdrop-blur-2xl dark:border-white/10 border-black/10 dark:shadow-lg shadow-md`}
            style={{
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.18), 0 0 4px rgba(255, 255, 255, 0.04)',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <span className="text-xl">{getActiveEmoji()}</span>
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* 확장된 네비게이션 메뉴 */}
      <motion.nav
        className={`fixed top-20 left-4 z-40 ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate={isNavExpanded ? "visible" : "hidden"}
        exit="exit"
        onMouseEnter={() => !isMobile && setIsNavExpanded(true)}
        onMouseLeave={() => !isMobile && setIsNavExpanded(false)}
      >
        {/* 애플 스타일의 블러 배경을 가진 메뉴 컨테이너 */}
        <motion.div
          className="backdrop-blur-2xl dark:bg-white/8 bg-black/8 rounded-2xl dark:border-white/10 border-black/10 shadow-lg"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(255, 255, 255, 0.05)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
          layout
        >
          {/* 모바일 모드에서 닫기 버튼 */}
          {isMobile && (
            <motion.button 
              onClick={() => setIsNavExpanded(false)}
              className="fixed top-20 left-4 z-40 w-10 h-10 flex items-center justify-center rounded-full dark:bg-white/8 bg-black/8 backdrop-blur-2xl dark:border-white/10 border-black/10 dark:text-white/80 text-black/80"
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>
          )}
          
          {/* 네비게이션 항목 목록 */}
          <div className="relative px-2 py-2">
            <ul className="flex items-center gap-1.5 sm:gap-2">
              {navItems.map((item) => (
                <motion.li key={item.id} layout variants={itemVariants}>
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      px-3 sm:px-3.5 py-2.5 rounded-xl text-sm transition-all
                      ${activeSection === item.id
                        ? 'dark:bg-white/12 bg-black/12 dark:text-white text-black dark:shadow-inner shadow-inner'  // 활성화된 항목 스타일
                        : 'dark:text-white/70 text-black/70 dark:hover:text-white hover:text-black dark:hover:bg-white/8 hover:bg-black/8'  // 비활성화된 항목 스타일
                      }
                      focus:outline-none focus-visible:ring-2 dark:focus-visible:ring-white/30 focus-visible:ring-black/30 dark:focus-visible:ring-offset-1 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-black/20 focus-visible:ring-offset-white/20
                    `}
                    title={item.label}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.1 }}
                  >
                    <span className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="text-lg sm:text-base">{item.emoji}</span>
                      {/* 모바일에서는 이모지만 표시, 데스크톱에서는 텍스트도 표시 */}
                      <span className={`${isMobile ? 'hidden' : 'hidden sm:inline-block'} text-sm font-medium whitespace-nowrap`}>
                        {item.label}
                      </span>
                    </span>
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.nav>
    </>
  )
} 