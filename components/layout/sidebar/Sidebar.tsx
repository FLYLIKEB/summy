'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

// 추출된 컴포넌트들 임포트
import SidebarHeader from '@/components/layout/sidebar/SidebarHeader'
import SidebarNavigation from '@/components/layout/sidebar/SidebarNavigation'
import SidebarNewSummaryButton from '@/components/layout/sidebar/SidebarNewSummaryButton'
import SidebarLogoutButton from '@/components/layout/sidebar/SidebarLogoutButton'
import SidebarMobileToggle from '@/components/layout/sidebar/SidebarMobileToggle'
import SidebarDesktopToggle from '@/components/layout/sidebar/SidebarDesktopToggle'
import SidebarMobileOverlay from '@/components/layout/sidebar/SidebarMobileOverlay'
import DashboardFooter from '@/components/dashboard/DashboardFooter'
import MobileNewSummaryButton from '@/components/utils/MobileNewSummaryButton'

// 네비게이션 설정 임포트
import { navigation } from '@/components/layout/sidebar/navigation-config'

// 사이드바 컨텐츠 컴포넌트
const SidebarContent = ({
  isOpen,
  isMobile,
  toggleSidebar,
}: {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}) => (
  <div className="flex flex-col h-full overflow-hidden">
    {/* 헤더 컴포넌트 */}
    <SidebarHeader isOpen={isOpen} isMobile={isMobile} toggleSidebar={toggleSidebar} />
    
    {/* 네비게이션 컴포넌트 */}
    <SidebarNavigation isOpen={isOpen} navigation={navigation} />
    
    {/* 새 요약 버튼 컴포넌트 */}
    <SidebarNewSummaryButton isOpen={isOpen} />
    
    {/* 로그아웃 버튼 컴포넌트 */}
    <SidebarLogoutButton isOpen={isOpen} />
  </div>
);

// 신규 컴포넌트 - 메인 콘텐츠 영역
const MainContent = ({
  children,
  isOpen,
  isMobile,
  sidebarWidth,
  toggleSidebar
}: {
  children: React.ReactNode;
  isOpen: boolean;
  isMobile: boolean;
  sidebarWidth: number;
  toggleSidebar: () => void;
}) => (
  <motion.main 
    className="flex-1 min-h-screen bg-apple-dark overflow-y-auto flex flex-col"
    initial={{ marginLeft: isMobile ? 0 : 256 }}
    animate={{ marginLeft: sidebarWidth }}
    transition={{ 
      duration: 0.3, 
      ease: [0.25, 1, 0.5, 1]
    }}
  >
    {/* 데스크톱 접힌 상태 토글 버튼 */}
    <SidebarDesktopToggle isOpen={isOpen} isMobile={isMobile} toggleSidebar={toggleSidebar} />
    
    {/* 자식 컴포넌트 (메인 콘텐츠) */}
    <div className="p-4 sm:p-6 md:p-8 pb-16 flex-1">
      {children}
    </div>
    
    {/* 대시보드 미니 푸터 컴포넌트 */}
    <DashboardFooter />
  </motion.main>
);

interface SidebarProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Sidebar({ className = '', children }: SidebarProps) {
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
  
  // 사이드바 너비 계산
  const sidebarWidth = useMemo(() => {
    if (isMobile) return isOpen ? 256 : 0
    return isOpen ? 256 : 80
  }, [isOpen, isMobile])
  
  return (
    <div className="flex h-screen w-full bg-apple-dark overflow-hidden">
      {/* 모바일 토글 버튼 */}
      <SidebarMobileToggle isOpen={isOpen} toggleSidebar={toggleSidebar} />
      
      {/* 모바일 오버레이 */}
      <SidebarMobileOverlay isOpen={isOpen} isMobile={isMobile} onClose={() => setIsOpen(false)} />
      
      <div className="flex w-full h-full relative">
        {/* 사이드바 */}
        <motion.aside 
          className={`h-screen z-40 bg-apple-dark border-r border-white-opacity-04 ${className} fixed top-0 left-0 md:relative md:top-auto md:left-auto inset-0`}
          initial={{ width: isMobile ? 0 : 256 }}
          animate={{ width: sidebarWidth }}
          transition={{ 
            duration: 0.3, 
            ease: [0.25, 1, 0.5, 1],
            staggerChildren: 0.05
          }}
        >
          <SidebarContent 
            isOpen={isOpen} 
            isMobile={isMobile} 
            toggleSidebar={toggleSidebar} 
          />
        </motion.aside>
        
        {/* 메인 콘텐츠 영역 */}
        <MainContent
          isOpen={isOpen}
          isMobile={isMobile}
          sidebarWidth={sidebarWidth}
          toggleSidebar={toggleSidebar}
        >
          {children}
        </MainContent>
      </div>
      
      {/* 신규대화 요약 버튼 컴포넌트 */}
      <MobileNewSummaryButton />
    </div>
  )
} 