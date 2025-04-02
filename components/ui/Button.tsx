// components/ui/button.tsx

'use client'

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
  /** 
   * 호버 효과 애니메이션 스타일
   * - 'subtle': 미묘한 배경색 변화 (애플 스타일)
   * - 'scale': 크기 변화 효과
   * - 'none': 효과 없음
   */
  hoverEffect?: 'subtle' | 'scale' | 'none'
  /** 둥근 모서리 사용 여부 (true: 완전히 둥근 버튼) */
  rounded?: boolean
  /** 테두리만 있는 아웃라인 스타일 */
  outline?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    children, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    startIcon, 
    endIcon, 
    isLoading, 
    disabled,
    hoverEffect = 'subtle',
    rounded = false,
    outline = false,
    onClick,
    ...props 
  }, ref) => {
    // 버튼 변형에 따른 스타일
    const getVariantStyles = () => {
      // 아웃라인 스타일 처리
      if (outline) {
        return {
          primary: "border border-primary-500 text-primary-500 hover:bg-primary-500/[0.06]",
          secondary: "border border-secondary-500 text-secondary-500 hover:bg-secondary-500/[0.06]",
          ghost: "border border-white/[0.15] text-white hover:bg-white/[0.08]",
          link: "text-primary-400 hover:text-primary-500 underline-offset-4 hover:underline",
          destructive: "border border-error text-error hover:bg-error/[0.06]",
        }[variant];
      }
      
      // 기본 스타일
      return {
        primary: "bg-primary-500 hover:bg-primary-600 text-white",
        secondary: "bg-secondary-500 hover:bg-secondary-600 text-white",
        ghost: "bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/[0.12]",
        link: "text-primary-400 hover:text-primary-500 underline-offset-4 hover:underline",
        destructive: "bg-error hover:bg-error/90 text-white",
      }[variant];
    };

    // 크기에 따른 스타일
    const sizeStyles = {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-2.5 text-sm",
      xl: "px-7 py-3 text-base",
    }

    // 너비 스타일
    const widthStyles = fullWidth ? "w-full" : "w-auto"

    // 로딩 및 비활성화 상태 스타일
    const stateStyles = isLoading || disabled
      ? "opacity-50 cursor-not-allowed"
      : ""
    
    // 모서리 스타일
    const radiusStyles = rounded ? "rounded-full" : "rounded-button"
      
    // 호버 효과 스타일
    const getHoverEffectStyles = () => {
      switch (hoverEffect) {
        case 'scale':
          return 'hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200';
        case 'subtle':
        default:
          return 'transition-all duration-200';
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium focus-ring",
          getVariantStyles(),
          sizeStyles[size],
          widthStyles,
          radiusStyles,
          stateStyles,
          getHoverEffectStyles(),
          className
        )}
        disabled={isLoading || disabled}
        onClick={onClick}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!isLoading && startIcon && (
          <span className="mr-2">{startIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && endIcon && (
          <span className="ml-2">{endIcon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
