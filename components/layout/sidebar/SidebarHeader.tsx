'use client'

import { ChevronLeft, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Logo from '@/components/common/Logo'

interface SidebarHeaderProps {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

export default function SidebarHeader({ isOpen, isMobile, toggleSidebar }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-5 h-16 border-b border-white-opacity-04">
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <Logo variant="text" size="md" />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: !isOpen && !isMobile ? 1 : 0, scale: !isOpen && !isMobile ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        className="absolute left-6 hidden md:block"
      >
        <Logo variant="icon" size="sm" />
      </motion.div>
      
      <button 
        className="p-2 rounded-full bg-white-opacity-05 hover:bg-white-opacity-10 text-white/70 hover:text-white transition-all md:hidden"
        onClick={() => toggleSidebar()}
        aria-label="사이드바 닫기"
      >
        <X className="w-4 h-4" />
      </button>
      
      {/* 데스크톱 토글 버튼 */}
      <motion.button 
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="p-2 rounded-full bg-white-opacity-05 hover:bg-white-opacity-10 text-white/70 hover:text-white transition-all hidden md:block"
        onClick={toggleSidebar}
        aria-label="사이드바 접기"
      >
        <ChevronLeft className="w-4 h-4" />
      </motion.button>
    </div>
  )
} 