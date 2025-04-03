'use client'

import React from 'react'
import Sidebar from '@/components/ui/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Sidebar>
      {children}
    </Sidebar>
  )
} 