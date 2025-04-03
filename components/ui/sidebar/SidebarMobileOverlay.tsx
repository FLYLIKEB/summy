'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SidebarMobileOverlayProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export default function SidebarMobileOverlay({ isOpen, isMobile, onClose }: SidebarMobileOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && isMobile && (
        <motion.div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        />
      )}
    </AnimatePresence>
  )
} 