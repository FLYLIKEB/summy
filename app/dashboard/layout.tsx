'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MessageSquare, Settings, LogOut } from 'lucide-react'

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
    <div className="flex min-h-screen">
      {/* 사이드바 */}
      <div className="w-64 bg-black border-r border-white/10">
        <div className="flex flex-col h-full">
          {/* 로고 */}
          <div className="p-6">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                ✨ Summy
              </h1>
            </Link>
          </div>

          {/* 네비게이션 */}
          <nav className="flex-1 px-4 pb-4">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* 로그아웃 */}
          <div className="p-4 border-t border-white/10">
            <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 w-full">
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