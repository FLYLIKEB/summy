'use client'

import Navbar from '@/components/layout/Navbar'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const NavbarWrapper = () => {
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  
  // 대시보드 페이지에서만 스크롤 시 숨김 기능 활성화
  const enableHideOnScroll = pathname.startsWith('/dashboard')

  useEffect(() => {
    // 스크롤 숨김 기능이 비활성화되어 있으면 이벤트 리스너를 추가하지 않음
    if (!enableHideOnScroll) {
      setShowNavbar(true)
      return
    }
    
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false) // 아래로 스크롤 시 숨기기
      } else {
        setShowNavbar(true) // 위로 스크롤 시 보이기
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlNavbar)

    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY, enableHideOnScroll])

  return (
    <div 
      className={`transition-transform duration-300 ease-in-out ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Navbar />
    </div>
  )
}

export default NavbarWrapper 