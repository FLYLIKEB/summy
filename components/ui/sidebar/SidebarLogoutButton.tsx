'use client'

import { LogOut } from 'lucide-react'
import { motion } from 'framer-motion'

interface SidebarLogoutButtonProps {
  isOpen: boolean;
}

export default function SidebarLogoutButton({ isOpen }: SidebarLogoutButtonProps) {
  return (
    <div className="p-3 border-t border-white-opacity-04">
      <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white-opacity-03 w-full transition-all">
        <LogOut className="w-5 h-5 flex-shrink-0" />
        <motion.span
          initial={{ opacity: 1, width: "auto" }}
          animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.2 }}
          className="whitespace-nowrap overflow-hidden"
        >
          로그아웃
        </motion.span>
      </button>
    </div>
  )
} 