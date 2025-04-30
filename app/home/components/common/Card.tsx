import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  gradient?: boolean
}

export const Card: React.FC<CardProps> = ({ children, className = '', gradient = false }) => {
  const baseStyles = 'relative overflow-hidden rounded-xl backdrop-blur-sm border border-white/10'

  const gradientStyles = gradient
    ? 'bg-gradient-to-br from-gray-900/50 to-black/50'
    : 'bg-white/5'

  return (
    <div className={`${baseStyles} ${gradientStyles} ${className}`}>
      {/* 배경 효과 */}
      {gradient && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 animate-gradient"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
        </>
      )}
      <div className="relative">
        {children}
      </div>
    </div>
  )
} 