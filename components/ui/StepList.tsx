'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface Step {
  title: string
  description: string
  icon?: React.ReactNode | string
}

interface StepListProps {
  steps: Step[]
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export const StepList: React.FC<StepListProps> = ({
  steps,
  orientation = 'vertical',
  className,
}) => {
  return (
    <div className={cn(
      'space-y-8',
      orientation === 'horizontal' && 'sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-8',
      className
    )}>
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
            {typeof step.icon === 'string' ? step.icon : (index + 1) + '️⃣'}
          </div>
          <div>
            <h3 className="font-bold text-lg sm:text-xl mb-2">{step.title}</h3>
            <p className="text-sm sm:text-base opacity-90">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
} 