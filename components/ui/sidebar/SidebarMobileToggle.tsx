'use client'

import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface SidebarMobileToggleProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function SidebarMobileToggle({ isOpen, toggleSidebar }: SidebarMobileToggleProps) {
  return (
    <button 
      className="fixed top-4 left-4 z-50 p-2 rounded-full backdrop-blur-md bg-white-opacity-08 text-white hover:bg-white-opacity-12 active:bg-white-opacity-06 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.12)] active:shadow-[0_1px_3px_rgba(0,0,0,0.1)] md:hidden"
      onClick={toggleSidebar}
      aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
    >
      <motion.div
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.div>
    </button>
  )
} 