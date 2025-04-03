'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardTitle, CardContent } from './card'

export interface Feature {
  title: string
  description: string
  icon?: React.ReactNode | string
  tags?: string[]
}

interface FeatureGridProps {
  features: Feature[]
  columns?: 1 | 2 | 3 | 4
  className?: string
  cardClassName?: string
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
  className,
  cardClassName,
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn(
      'grid gap-6 md:gap-8',
      columnClasses[columns],
      className
    )}>
      {features.map((feature, index) => (
        <Card 
          key={index} 
          variant="feature"
          hover
          animation="fade-in"
          delay={index * 0.1}
          className={cn('h-full', cardClassName)}
        >
          <div className="flex flex-col h-full">
            {typeof feature.icon === 'string' ? (
              <div className="text-3xl mb-4">{feature.icon}</div>
            ) : feature.icon ? (
              <div className="mb-4">{feature.icon}</div>
            ) : null}
            
            <CardTitle>{feature.title}</CardTitle>
            <CardContent className="flex-grow">{feature.description}</CardContent>
            
            {feature.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {feature.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-secondary-500/10 text-secondary-300 border border-secondary-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
} 