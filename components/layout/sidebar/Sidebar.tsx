'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [isManuallyClosed, setIsManuallyClosed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // 화면 크기에 따라 모바일 여부 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // 초기 로드 및 리사이즈 시 실행
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 사이드바 열기/닫기 토글
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
    // 닫을 때만 수동 닫기 상태로 설정
    if (isOpen) {
      setIsManuallyClosed(true)
    }
  }

  // 사이드바 너비 계산
  const sidebarWidth = useMemo(() => {
    if (isMobile) return isOpen ? 256 : 0
    return isOpen ? 256 : 80
  }, [isOpen, isMobile])
  
  return (
    <>
      {/* 사이드바 배경 오버레이 (모바일에서만 표시) */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* 사이드바 */}
      <aside 
        className={`fixed top-0 left-0 h-full z-30 transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64' : 'w-0'}
          ${isMobile ? 'top-0' : 'top-16'} // 모바일이 아닐 때는 네비게이션 바 아래에 배치
        `}
        onMouseEnter={() => {
          // 모바일이 아니고 수동으로 닫힌 상태일 때만 호버 시 열기
          if (!isMobile && isManuallyClosed) {
            setIsOpen(true)
          }
        }}
        onMouseLeave={() => {
          // 모바일이 아니고 수동으로 닫힌 상태일 때만 호버 해제 시 닫기
          if (!isMobile && isManuallyClosed) {
            setIsOpen(false)
          }
        }}
      >
        <div 
          className={`h-full overflow-y-auto bg-white dark:bg-gray-900 shadow-lg transition-all duration-300
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            ${isMobile ? 'pt-4' : 'pt-2'} // 모바일이 아닐 때는 패딩 조정
          `}
        >
          {/* 모바일에서 닫기 버튼 */}
          {isMobile && (
            <div className="flex justify-end px-4 mb-2">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          
          {/* 사이드바 내용 */}
          <nav className="px-4 pb-4">
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                대시보드
              </h2>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link
                    href="/dashboard"
                    className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === '/dashboard'
                        ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="mr-3">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </span>
                    홈
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                관리
              </h2>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link
                    href="/summaries"
                    className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === '/summaries'
                        ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="mr-3">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </span>
                    요약 목록
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                설정
              </h2>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link
                    href="/settings"
                    className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === '/settings'
                        ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="mr-3">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    설정
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
      
      {/* 토글 버튼 (모바일이 아닐 때만 표시) */}
      {!isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 dark:text-white"
        >
          {isOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          )}
        </button>
      )}
    </>
  )
} 