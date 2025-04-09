'use client'

import { Navbar } from '@/components/layout/Navbar'
import { useEffect, useState } from 'react'

export const NavbarWrapper = () => {
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
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
  }, [lastScrollY])

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