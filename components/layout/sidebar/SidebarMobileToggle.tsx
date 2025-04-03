'use client'

import { Menu } from 'lucide-react'

interface SidebarMobileToggleProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function SidebarMobileToggle({ isOpen, toggleSidebar }: SidebarMobileToggleProps) {
  return (
    <button 
      className="fixed top-4 left-4 z-50 p-2 rounded-full apple-button apple-button-secondary md:hidden"
      onClick={toggleSidebar} 
      aria-label="메뉴 토글"
      aria-expanded={isOpen}
    >
      <Menu className="w-5 h-5" />
    </button>
  )
} 