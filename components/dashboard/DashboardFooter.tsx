'use client'

import Link from 'next/link'

export default function DashboardFooter() {
  return (
    <div className="border-t border-white-opacity-03 bg-transparent px-4 sm:px-6 md:px-8 py-2 pb-20 sm:pb-2">
      <div className="flex items-center justify-center text-[10px] text-white/30">
        <span>© 2025 Summy</span>
        <span className="mx-2">•</span>
        <Link href="/terms" className="hover:text-white/50 transition-colors">이용약관</Link>
        <span className="mx-2">•</span>
        <Link href="/privacy" className="hover:text-white/50 transition-colors">개인정보</Link>
      </div>
    </div>
  )
} 