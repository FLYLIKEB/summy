'use client'

import React from 'react'
import Sidebar from '@/components/ui/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full pt-0 mt-0" id="dashboard-layout">
      <style jsx global>{`
        body {
          padding-bottom: 0;
        }
        body > div > main {
          padding-top: 0;
        }
        footer {
          display: none;
        }
      `}</style>
      <Sidebar>
        {children}
      </Sidebar>
    </div>
  )
} 