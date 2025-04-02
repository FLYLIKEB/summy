'use client'

import React from 'react'
import Link from 'next/link'

type LogoSize = 'sm' | 'md' | 'lg' | 'xl'
type LogoVariant = 'text' | 'icon' | 'full'

interface LogoProps {
  size?: LogoSize
  variant?: LogoVariant
  withIcon?: boolean
  href?: string
  className?: string
}

const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'text',
  withIcon = true,
  href = '/',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl sm:text-[12rem]'
  }

  const iconSize = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16 sm:w-24 sm:h-24'
  }

  const renderLogoContent = () => {
    switch (variant) {
      case 'icon':
        return (
          <div className={`rounded-lg bg-gradient-to-br from-purple-500 to-mint-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 ${iconSize[size]}`}>
            <span className="text-white font-black text-center">S</span>
          </div>
        )
      case 'text':
        return (
          <span className={`font-black tracking-tight bg-gradient-to-r from-purple-400 to-mint-500 text-transparent bg-clip-text ${sizeClasses[size]} group-hover:from-purple-500 group-hover:to-mint-600 transition-all duration-300 drop-shadow-sm`}>
            {size === 'xl' ? 'summy' : '✨ Summy'}
          </span>
        )
      case 'full':
        return (
          <div className="flex items-center gap-2">
            <div className={`rounded-lg bg-gradient-to-br from-purple-500 to-mint-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 ${iconSize[size]}`}>
              <span className="text-white font-black text-center">S</span>
            </div>
            <span className={`font-black tracking-tight bg-gradient-to-r from-purple-400 to-mint-500 text-transparent bg-clip-text ${sizeClasses[size]} group-hover:from-purple-500 group-hover:to-mint-600 transition-all duration-300 drop-shadow-sm`}>
              {size === 'xl' ? 'summy' : '✨ Summy'}
            </span>
          </div>
        )
      default:
        return null
    }
  }

  const logoContent = renderLogoContent()

  if (!href) {
    return <div className={`inline-block ${className}`}>{logoContent}</div>
  }

  return (
    <Link href={href} className={`inline-block group ${className}`}>
      {logoContent}
    </Link>
  )
}

export default Logo 