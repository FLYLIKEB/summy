'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'

interface SidebarNewSummaryButtonProps {
  isOpen: boolean;
}

export default function SidebarNewSummaryButton({ isOpen }: SidebarNewSummaryButtonProps) {
  return (
    <div className="px-3 pb-4">
      <Link 
        href="/dashboard/new"
        className="apple-button apple-button-primary w-full py-3.5 rounded-xl active:scale-[0.98] gap-3 flex items-center justify-center"
      >
        <Plus className="w-4 h-4 flex-shrink-0" />
        <motion.span
          initial={{ opacity: 1, width: "auto" }}
          animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.2 }}
          className="whitespace-nowrap overflow-hidden"
        >
          신규대화 요약
        </motion.span>
      </Link>
    </div>
  )
} 