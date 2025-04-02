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
          <div className={`rounded-lg flex items-center justify-center shadow-sm ${iconSize[size]} bg-[#7c3aed] bg-opacity-90`}>
            <span className="text-white font-medium text-center">S</span>
          </div>
        )
      case 'text':
        return (
          <span className={`font-medium tracking-tight text-white ${sizeClasses[size]} transition-all duration-200`}>
            {size === 'xl' ? 'summy' : 'Summy'}
          </span>
        )
      case 'full':
        return (
          <div className="flex items-center gap-2">
            <div className={`rounded-lg flex items-center justify-center shadow-sm ${iconSize[size]} bg-[#7c3aed] bg-opacity-90`}>
              <span className="text-white font-medium text-center">S</span>
            </div>
            <span className={`font-medium tracking-tight text-white ${sizeClasses[size]} transition-all duration-200`}>
              {size === 'xl' ? 'summy' : 'Summy'}
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