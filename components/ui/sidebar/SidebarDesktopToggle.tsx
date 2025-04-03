'use client'

import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'

interface SidebarDesktopToggleProps {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

export default function SidebarDesktopToggle({ isOpen, isMobile, toggleSidebar }: SidebarDesktopToggleProps) {
  if (isOpen || isMobile) return null;
  
  return (
    <motion.button
      className="fixed left-[40px] top-5 z-20 p-2 rounded-full backdrop-blur-md bg-white-opacity-08 text-white hover:bg-white-opacity-12 active:bg-white-opacity-06 transition-all transform ml-2"
      onClick={toggleSidebar}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Menu className="w-4 h-4" />
    </motion.button>
  )
} 