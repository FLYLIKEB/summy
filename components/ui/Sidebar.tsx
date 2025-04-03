'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MessageSquare, Settings, LogOut, Menu, X, Plus } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { AnimatePresence, motion } from 'framer-motion'

const navigation = [
  {
    name: '대시보드',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: '요약 내역',
    href: '/dashboard/summaries',
    icon: MessageSquare,
  },
  {
    name: '설정',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className = '' }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  
  // 모바일 화면에서는 기본적으로 사이드바 닫기
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
  
  return (
    <>
      {/* 모바일 토글 버튼 */}
      <div className="md:hidden fixed top-4 left-4 z-50 relative group">
        <button 
          className="p-2 rounded-full backdrop-blur-md bg-white/[0.08] text-white hover:bg-white/[0.12] active:bg-white/[0.06] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.12)] active:shadow-[0_1px_3px_rgba(0,0,0,0.1)] transform active:scale-95"
          onClick={toggleSidebar}
          aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.15, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.div>
        </button>
        <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
          <div className="bg-[#1a1a1a]/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
            {isOpen ? '사이드바 닫기' : '사이드바 열기'}
          </div>
        </div>
      </div>
      
      {/* 모바일 오버레이 */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* 사이드바 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={`sidebar fixed md:sticky top-0 left-0 h-screen z-40 md:z-10 bg-apple-bg-color border-r border-white/[0.04] ${className}`}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ 
              type: 'tween', 
              duration: 0.25, 
              ease: [0.4, 0.0, 0.2, 1] 
            }}
          >
            <div className="flex flex-col h-full w-full max-w-[256px]">
              {/* 헤더 영역 */}
              <div className="flex items-center justify-between p-5">
                <Logo variant="text" size="md" />
                <div className="relative group">
                  <button 
                    className="p-2 rounded-full backdrop-blur-md bg-white/[0.08] text-white hover:bg-white/[0.12] active:bg-white/[0.06] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.12)] active:shadow-[0_1px_3px_rgba(0,0,0,0.1)] transform active:scale-95"
                    onClick={() => setIsOpen(false)}
                    aria-label="사이드바 닫기"
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 90 }}
                      exit={{ rotate: 0 }}
                      transition={{ duration: 0.15, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  </button>
                  <div className="absolute right-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <div className="bg-[#1a1a1a]/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                      사이드바 닫기
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 네비게이션 */}
              <nav className="flex-1 px-3 pb-4 overflow-y-auto scrollbar-thin">
                <ul className="space-y-1">
                  {navigation.map((item) => {
                    // 대시보드는 정확히 일치할 때만 활성화, 다른 항목은 해당 경로로 시작할 때 활성화
                    const isActive = 
                      item.href === '/dashboard' 
                        ? pathname === '/dashboard' 
                        : pathname.startsWith(item.href);
                    
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            isActive
                              ? 'bg-white/[0.06] text-white'
                              : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                          }`}
                        >
                          <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/60'}`} />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
              
              {/* 새 요약 버튼 */}
              <div className="px-3 pb-4">
                <Link 
                  href="/new"
                  className="apple-button apple-button-primary w-full py-3.5 rounded-xl active:scale-[0.98] gap-3"
                >
                  <Plus className="w-4 h-4" />
                  <span>신규대화 요약</span>
                </Link>
              </div>
              
              {/* 로그아웃 */}
              <div className="p-3 border-t border-white/[0.04]">
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.03] w-full transition-all">
                  <LogOut className="w-5 h-5" />
                  로그아웃
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 데스크탑 토글 버튼 (접혀있을 때만 표시) */}
      {!isOpen && !isMobile && (
        <div className="hidden md:block fixed left-4 top-4 z-20 relative group">
          <motion.button
            className="flex p-2 rounded-full backdrop-blur-md bg-white/[0.08] text-white hover:bg-white/[0.12] active:bg-white/[0.06] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.12)] active:shadow-[0_1px_3px_rgba(0,0,0,0.1)] transform active:scale-95"
            onClick={toggleSidebar}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.4, 0.0, 0.2, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5" />
          </motion.button>
          <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            <div className="bg-[#1a1a1a]/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
              사이드바 열기
            </div>
          </div>
        </div>
      )}
    </>
  )
} 