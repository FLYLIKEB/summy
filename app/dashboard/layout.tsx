'use client'

import React from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <div className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-24 pb-12">
        {children}
      </div>
    </div>
  )
} 