'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { useEffect } from 'react'

export default function NavbarWrapper() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  
  // 홈페이지일 때만 main에 패딩 추가
  useEffect(() => {
    const mainElement = document.querySelector('main')
    if (mainElement) {
      if (isHomePage) {
        mainElement.classList.add('pt-16')
      } else {
        mainElement.classList.remove('pt-16')
      }
    }
  }, [isHomePage])
  
  // 첫 페이지(루트 경로)에서만 Navbar 표시
  return isHomePage ? <Navbar /> : null
} 