// components/ui/button.tsx

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "primary" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  size?: "sm" | "md" | "lg" | "xl" | "icon"
  gradient?: boolean
  isLoading?: boolean
}

const buttonVariants = {
  primary: "bg-gradient-to-r from-purple-500 to-mint-500 text-white hover:from-purple-600 hover:to-mint-600 shadow-md shadow-purple-500/20",
  secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/20",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-white/20 text-white hover:bg-white/10",
  ghost: "text-white/60 hover:text-white hover:bg-white/5",
  link: "text-purple-400 hover:text-purple-500 underline-offset-4 hover:underline",
}

const sizeVariants = {
  sm: "h-8 px-3 py-1.5 text-sm rounded-lg",
  md: "h-10 px-4 py-2 text-base rounded-lg",
  lg: "h-12 px-6 py-3 text-lg rounded-xl",
  xl: "h-14 px-8 py-4 text-xl font-bold rounded-full",
  icon: "h-10 w-10 rounded-full",
}

const gradientVariants = {
  primary: "bg-gradient-to-r from-purple-500 to-mint-500 hover:from-purple-600 hover:to-mint-600 text-white animate-gradient bg-size-200",
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    asChild = false, 
    gradient = false,
    isLoading = false,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // 그라데이션 효과 적용 여부
    const variantStyle = gradient && variant === 'primary' 
      ? gradientVariants.primary 
      : buttonVariants[variant as keyof typeof buttonVariants]
    
    // hover 및 focus 효과
    const hoverEffect = variant === 'primary' 
      ? 'hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1' 
      : 'hover:scale-102'
    
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none disabled:transform-none",
          "relative overflow-hidden",
          variantStyle,
          sizeVariants[size as keyof typeof sizeVariants],
          hoverEffect,
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            처리 중...
          </>
        ) : (
          <span className="relative z-10">
            {children}
          </span>
        )}
        
        {/* 그라데이션 호버 효과 */}
        {variant === 'primary' && (
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-mint-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        )}
        {variant === 'secondary' && (
          <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button }
