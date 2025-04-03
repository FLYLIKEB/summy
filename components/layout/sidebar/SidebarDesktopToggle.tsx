'use client'

import { ChevronRight, ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface SidebarDesktopToggleProps {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

export default function SidebarDesktopToggle({ isOpen, isMobile, toggleSidebar }: SidebarDesktopToggleProps) {
  if (isMobile) return null
  
  const Icon = isOpen ? ChevronLeft : ChevronRight
  
  return (
    <div className="fixed top-4 left-[18px] z-40 ml-0 hidden md:block group">
      <button 
        className={`p-2 rounded-full apple-button apple-button-secondary transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
        onClick={toggleSidebar} 
        aria-label={isOpen ? '사이드바 접기' : '사이드바 펼치기'}
        disabled={isOpen}
      >
        <Icon className="w-4 h-4" />
      </button>
    </div>
  )
} 