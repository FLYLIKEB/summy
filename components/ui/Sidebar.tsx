'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MessageSquare, Settings, LogOut, Menu, X, Plus, ChevronLeft } from 'lucide-react'
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
  className?: string;
  children?: React.ReactNode;
}

export default function Sidebar({ className = '', children }: SidebarProps) {
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
    <div className="flex h-screen w-full">
      {/* 토글 버튼 */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 rounded-full backdrop-blur-md bg-white-opacity-08 text-white hover:bg-white-opacity-12 active:bg-white-opacity-06 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.12)] active:shadow-[0_1px_3px_rgba(0,0,0,0.1)] md:hidden"
        onClick={toggleSidebar}
        aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.div>
      </button>
      
      {/* 모바일 오버레이 */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* 사이드바 */}
      <motion.div 
        className={`fixed md:relative h-screen z-40 bg-apple-dark border-r border-white-opacity-04 ${className}`}
        initial={{ width: isMobile ? 0 : 256 }}
        animate={{ width: isOpen ? 256 : (isMobile ? 0 : 80) }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 1, 0.5, 1],
          staggerChildren: 0.05
        }}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* 헤더 영역 */}
          <div className="flex items-center justify-between p-5 h-16 border-b border-white-opacity-04">
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <Logo variant="text" size="md" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: !isOpen && !isMobile ? 1 : 0, scale: !isOpen && !isMobile ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute left-6 hidden md:block"
            >
              <Logo variant="icon" size="sm" />
            </motion.div>
            
            <button 
              className="p-2 rounded-full bg-white-opacity-05 hover:bg-white-opacity-10 text-white/70 hover:text-white transition-all md:hidden"
              onClick={() => setIsOpen(false)}
              aria-label="사이드바 닫기"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* 데스크톱 토글 버튼 */}
            <motion.button 
              initial={{ opacity: 1 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="p-2 rounded-full bg-white-opacity-05 hover:bg-white-opacity-10 text-white/70 hover:text-white transition-all hidden md:block"
              onClick={toggleSidebar}
              aria-label="사이드바 접기"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
          </div>
          
          {/* 네비게이션 */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin">
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
                          ? 'bg-white-opacity-06 text-white'
                          : 'text-white/60 hover:text-white hover:bg-white-opacity-03'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/60'}`} />
                      <motion.span
                        initial={{ opacity: 1, width: "auto" }}
                        animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        {item.name}
                      </motion.span>
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
              className="apple-button apple-button-primary w-full py-3.5 rounded-xl active:scale-[0.98] gap-3 flex items-center justify-center"
            >
              <Plus className="w-4 h-4 flex-shrink-0" />
              <motion.span
                initial={{ opacity: 1, width: "auto" }}
                animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap overflow-hidden"
              >
                신규대화 요약
              </motion.span>
            </Link>
          </div>
          
          {/* 로그아웃 */}
          <div className="p-3 border-t border-white-opacity-04">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white-opacity-03 w-full transition-all">
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <motion.span
                initial={{ opacity: 1, width: "auto" }}
                animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap overflow-hidden"
              >
                로그아웃
              </motion.span>
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* 메인 콘텐츠 영역 */}
      <motion.div 
        className="flex-1 min-h-screen bg-apple-dark"
        initial={{ marginLeft: isMobile ? 0 : 256 }}
        animate={{ marginLeft: isOpen ? 256 : (isMobile ? 0 : 80) }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 1, 0.5, 1]
        }}
      >
        {/* 데스크톱 접힌 상태 토글 버튼 */}
        {!isOpen && !isMobile && (
          <motion.button
            className="fixed left-[40px] top-5 z-20 p-2 rounded-full backdrop-blur-md bg-white-opacity-08 text-white hover:bg-white-opacity-12 active:bg-white-opacity-06 transition-all transform ml-2"
            onClick={toggleSidebar}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Menu className="w-4 h-4" />
          </motion.button>
        )}
        
        {/* 자식 컴포넌트 (메인 콘텐츠) */}
        <div className="p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </motion.div>
    </div>
  )
} 