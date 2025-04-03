'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { useEffect } from 'react'

export default function NavbarWrapper() {
  const pathname = usePathname()
  // dashboard 경로가 포함된 경우를 제외한 모든 페이지에서 네비게이션 바 표시
  const isDashboardPage = pathname.includes('/dashboard')
  const isNavPage = !isDashboardPage
  
  // 홈페이지일 때만 main에 패딩 추가
  useEffect(() => {
    const mainElement = document.querySelector('main')
    if (mainElement) {
      if (isNavPage) {
        mainElement.classList.add('pt-16')
      } else {
        mainElement.classList.remove('pt-16')
      }
    }
  }, [isNavPage])
  
  // 첫 페이지(루트 경로)에서만 Navbar 표시
  return isNavPage ? <Navbar /> : null
} 