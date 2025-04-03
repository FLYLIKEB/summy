'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

interface SidebarLogoutButtonProps {
  isOpen: boolean;
}

export default function SidebarLogoutButton({ isOpen }: SidebarLogoutButtonProps) {
  return (
    <div className="mt-auto p-4 border-t border-white-opacity-04">
      <Link
        href="/login"
        className={`apple-button apple-button-secondary w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 md:gap-3`}
      >
        <LogOut className="w-4 h-4" />
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="whitespace-nowrap overflow-hidden"
          >
            로그아웃
          </motion.span>
        )}
      </Link>
    </div>
  )
} 