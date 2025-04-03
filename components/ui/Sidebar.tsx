'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MessageSquare, Settings, LogOut, Menu, X } from 'lucide-react'
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
    href: '/summaries',
    icon: MessageSquare,
  },
  {
    name: '설정',
    href: '/settings',
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
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/[0.06] text-white hover:bg-white/[0.1] transition-all"
        onClick={toggleSidebar}
        aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      
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
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col h-full w-64">
              {/* 헤더 영역 */}
              <div className="flex items-center justify-between p-5">
                <Logo variant="text" size="md" />
                <button 
                  className="md:hidden p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* 네비게이션 */}
              <nav className="flex-1 px-3 pb-4 overflow-y-auto scrollbar-thin">
                <ul className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
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
        <motion.button
          className="hidden md:flex fixed left-4 top-4 z-20 p-2 rounded-lg bg-white/[0.06] text-white hover:bg-white/[0.1] transition-all"
          onClick={toggleSidebar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      )}
    </>
  )
} 