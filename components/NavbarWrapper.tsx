'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()
  // 첫 페이지(루트 경로)에서만 Navbar 표시
  return pathname === '/' ? <Navbar /> : null
} 