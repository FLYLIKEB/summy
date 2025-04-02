'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MessageSquare, Settings, LogOut } from 'lucide-react'
import Logo from '@/components/ui/Logo'

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-[#1a1a1f]">
      {/* 사이드바 */}
      <div className="hidden sm:block w-64 bg-[#1a1a1f] border-r border-white/[0.04]">
        <div className="flex flex-col h-full">
          {/* 로고 */}
          <div className="p-5">
            <Logo variant="text" size="md" />
          </div>

          {/* 네비게이션 */}
          <nav className="flex-1 px-3 pb-4">
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
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1">{children}</div>
    </div>
  )
} 