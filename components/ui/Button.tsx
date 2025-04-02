// components/ui/button.tsx

import * as React from "react"
import { cn } from "@/lib/utils"
import { THEME_VARIANTS, ButtonVariant, SizeVariant } from "@/components/ui/theme"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: SizeVariant
  fullWidth?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', fullWidth = false, startIcon, endIcon, isLoading, disabled, ...props }, ref) => {
    // 버튼 변형에 따른 스타일
    const variantStyles = {
      primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-sm",
      secondary: "bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm",
      ghost: "bg-white/10 hover:bg-white/20 text-white",
      link: "text-primary-400 hover:text-primary-500 underline-offset-4 hover:underline",
      destructive: "bg-error hover:bg-red-600 text-white shadow-sm",
    }

    // 크기에 따른 스타일
    const sizeStyles = {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
      xl: "px-6 py-3 text-lg",
    }

    // 너비 스타일
    const widthStyles = fullWidth ? "w-full" : "w-auto"

    // 로딩 및 비활성화 상태 스타일
    const stateStyles = isLoading || disabled
      ? "opacity-70 cursor-not-allowed"
      : ""

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-normal focus-ring",
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          stateStyles,
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!isLoading && startIcon && (
          <span className="mr-2">{startIcon}</span>
        )}
        {children}
        {!isLoading && endIcon && (
          <span className="ml-2">{endIcon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
