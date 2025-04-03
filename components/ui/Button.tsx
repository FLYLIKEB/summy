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
      // 애플 스타일 버튼 클래스
      const appleStyle = {
        primary: "apple-button apple-button-primary",
        secondary: "apple-button apple-button-secondary",
        ghost: "apple-button",
        link: "text-primary-400 hover:text-primary-500 underline-offset-4 hover:underline",
        destructive: "bg-error hover:bg-error/90 text-white",
      }[variant];
      
      // 아웃라인 클래스 적용 (ghost와 동일하게 처리)
      if (outline && variant !== 'link' && variant !== 'ghost') {
        return "apple-button apple-button-secondary";
      }
      
      return appleStyle;
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
    const radiusStyles = rounded ? "rounded-full" : ""
      
    // 호버 효과 스타일
    const getHoverEffectStyles = () => {
      switch (hoverEffect) {
        case 'scale':
          return '';  // 애플 버튼에 이미 스케일 효과가 있음
        case 'subtle':
        default:
          return '';  // 애플 버튼에 이미 transition 효과가 있음
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium focus-visible-ring",
          getVariantStyles(),
          size !== 'md' ? sizeStyles[size] : "",  // 기본 크기는 애플 버튼 클래스에 있음
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
