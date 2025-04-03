'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'

interface SidebarNewSummaryButtonProps {
  isOpen: boolean;
}

export default function SidebarNewSummaryButton({ isOpen }: SidebarNewSummaryButtonProps) {
  return (
    <div className="px-4 mt-2 mb-4">
      <Link 
        href="/dashboard/new" 
        className={`apple-button apple-button-primary w-full px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 md:gap-3 text-white text-sm md:text-base text-opacity-90`}
      >
        <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
        {isOpen && (
          <motion.span 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="whitespace-nowrap overflow-hidden"
          >
            새 요약 만들기
          </motion.span>
        )}
      </Link>
    </div>
  )
} 