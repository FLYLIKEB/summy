'use client'

import React from 'react'
import Sidebar from '@/components/ui/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-apple-bg-color">
      {/* 사이드바 컴포넌트 */}
      <Sidebar />
      
      {/* 메인 콘텐츠 */}
      <div className="flex-1">{children}</div>
    </div>
  )
} 