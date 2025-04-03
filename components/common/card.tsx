'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'outline' | 'feature'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  animation?: 'fade-in' | 'slide-up' | 'none'
  delay?: number
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  animation = 'none',
  delay = 0,
}) => {
  const variantClasses = {
    'default': 'bg-white/5 border border-white/10',
    'glass': 'bg-white/5 backdrop-blur-sm border border-white/10',
    'outline': 'bg-transparent border border-white/20',
    'feature': 'bg-white/5 backdrop-blur-sm border border-white/10',
  }

  const paddingClasses = {
    'none': '',
    'sm': 'p-4',
    'md': 'card-padding',
    'lg': 'p-6 md:p-8',
  }

  const hoverClasses = hover ? 
    'hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10' : 
    ''

  const animationClasses = {
    'fade-in': 'animate-fade-in',
    'slide-up': 'animate-slide-in-up',
    'none': '',
  }

  const animationStyle = delay > 0 ? { animationDelay: `${delay}s` } : {}

  return (
    <div 
      className={cn(
        'shadow-lg overflow-hidden rounded-card',
        variantClasses[variant],
        paddingClasses[padding],
        hoverClasses,
        animationClasses[animation],
        className
      )}
      style={animationStyle}
    >
      {children}
    </div>
  )
}

// 카드 헤더 컴포넌트
export const CardHeader: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
)

// 카드 타이틀 컴포넌트
export const CardTitle: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <h3 className={cn('text-xl font-bold mb-2', className)}>
    {children}
  </h3>
)

// 카드 콘텐츠 컴포넌트
export const CardContent: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn('text-white/70', className)}>
    {children}
  </div>
)

// 카드 푸터 컴포넌트
export const CardFooter: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn('mt-4 pt-4 border-t border-white/10', className)}>
    {children}
  </div>
)
