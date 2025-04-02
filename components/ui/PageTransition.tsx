'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

interface PageTransitionProps {
  children: React.ReactNode
  /**
   * 페이지 전환 효과 유형:
   * - fade: 페이드 인/아웃 효과
   * - slide: 슬라이드 효과
   * - scale: 스케일 업/다운 효과
   */
  type?: 'fade' | 'slide' | 'scale'
  /**
   * 애니메이션 기간 (밀리초)
   */
  duration?: number
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = 'fade',
  duration = 300
}) => {
  const pathname = usePathname()
  const [isFirstRender, setIsFirstRender] = useState(true)
  
  useEffect(() => {
    // 첫 렌더링에서는 애니메이션을 건너뜁니다
    setIsFirstRender(false)
  }, [])

  const getVariants = () => {
    switch (type) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        }
      case 'slide':
        return {
          initial: { x: 20, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -20, opacity: 0 }
        }
      case 'scale':
        return {
          initial: { scale: 0.98, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.98, opacity: 0 }
        }
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        }
    }
  }

  const variants = getVariants()

  // 첫 렌더링에서는 애니메이션을 건너뜁니다
  if (isFirstRender) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{ 
          duration: duration / 1000, // framer-motion은 초 단위
          ease: [0.25, 0.1, 0.25, 1] // 더 부드러운 커브
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export { PageTransition } 