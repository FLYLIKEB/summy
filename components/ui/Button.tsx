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
   * - pulse: 부드러운 숨쉬기 효과
   * - float: 위로 떠오르는 효과
   * - shine: 반짝이는 효과
   * - jelly: 젤리처럼 튕기는 효과
   * - glow: 빛나는 효과
   * - scale: 크기 변화 효과
   * - none: 효과 없음
   */
  hoverEffect?: 'pulse' | 'float' | 'shine' | 'jelly' | 'glow' | 'scale' | 'none'
  /** 그래디언트 효과 사용 여부 */
  gradient?: boolean
  /** 글래스모피즘 효과 사용 여부 */
  glass?: boolean
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
    hoverEffect = 'none',
    gradient = false,
    glass = false,
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
          primary: "border-2 border-primary-500 text-primary-500 hover:bg-primary-500/10",
          secondary: "border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-500/10",
          ghost: "border-2 border-white/30 text-white hover:bg-white/10",
          link: "text-primary-400 hover:text-primary-500 underline-offset-4 hover:underline",
          destructive: "border-2 border-error text-error hover:bg-error/10",
        }[variant];
      }
      
      // 글래스 효과 처리
      if (glass) {
        return {
          primary: "bg-primary-600/80 backdrop-blur-sm hover:bg-primary-600/90 text-white border border-primary-500/30",
          secondary: "bg-secondary-500/80 backdrop-blur-sm hover:bg-secondary-500/90 text-white border border-secondary-400/30",
          ghost: "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/10",
          link: "text-primary-400 hover:text-primary-500 underline-offset-4 hover:underline",
          destructive: "bg-error/80 backdrop-blur-sm hover:bg-error/90 text-white border border-red-500/30",
        }[variant];
      }
      
      // 그래디언트 효과 처리
      if (gradient) {
        return {
          primary: "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white shadow-md shadow-primary-500/20",
          secondary: "bg-gradient-to-r from-secondary-600 to-secondary-400 hover:from-secondary-700 hover:to-secondary-500 text-white shadow-md shadow-secondary-500/20",
          ghost: "bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 text-white",
          link: "text-primary-400 hover:text-primary-500 underline-offset-4 hover:underline",
          destructive: "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-md shadow-red-500/20",
        }[variant];
      }
      
      // 기본 스타일
      return {
        primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-sm shadow-primary-500/10",
        secondary: "bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm shadow-secondary-500/10",
        ghost: "bg-white/10 hover:bg-white/20 text-white",
        link: "text-primary-400 hover:text-primary-500 underline-offset-4 hover:underline",
        destructive: "bg-error hover:bg-red-600 text-white shadow-sm shadow-red-500/10",
      }[variant];
    };

    // 크기에 따른 스타일
    const sizeStyles = {
      xs: "px-2.5 py-1 text-xs",
      sm: "px-3.5 py-1.5 text-sm",
      md: "px-4.5 py-2 text-sm",
      lg: "px-6 py-2.5 text-base",
      xl: "px-7 py-3 text-lg",
    }

    // 너비 스타일
    const widthStyles = fullWidth ? "w-full" : "w-auto"

    // 로딩 및 비활성화 상태 스타일
    const stateStyles = isLoading || disabled
      ? "opacity-70 cursor-not-allowed"
      : ""
    
    // 모서리 스타일
    const radiusStyles = rounded ? "rounded-full" : "rounded-lg"
      
    // 호버 효과 스타일
    const getHoverEffectStyles = () => {
      switch (hoverEffect) {
        case 'pulse':
          return 'btn-hover-effect hover:animate-pulse';
        case 'float':
          return 'btn-hover-effect hover:translate-y-[-4px] transition-transform duration-300';
        case 'shine':
          return 'btn-hover-effect hover:animate-shine overflow-hidden relative before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:left-[100%] before:transition-all before:duration-700 before:ease-in-out';
        case 'jelly':
          return 'btn-hover-effect';
        case 'glow':
          return 'btn-hover-effect hover:shadow-[0_0_15px_rgba(var(--color-primary-500-rgb),0.5)] transition-shadow duration-300';
        case 'scale':
          return 'btn-hover-effect hover:scale-105 transition-transform duration-300';
        default:
          return 'btn-hover-effect transition-all duration-300';
      }
    };
    
    // 클릭 애니메이션 효과
    const [isAnimating, setIsAnimating] = React.useState(false);
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (hoverEffect === 'jelly' && !isLoading && !disabled) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 800);
      }
      
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2",
          getVariantStyles(),
          sizeStyles[size],
          widthStyles,
          radiusStyles,
          stateStyles,
          getHoverEffectStyles(),
          isAnimating && hoverEffect === 'jelly' ? 'animate-jelly' : '',
          className
        )}
        disabled={isLoading || disabled}
        onClick={handleClick}
        {...props}
      >
        {isLoading && (
          <div className="mr-2 flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
        {!isLoading && startIcon && (
          <span className="mr-2 transition-transform duration-300 group-hover:scale-110">{startIcon}</span>
        )}
        <span className="transition-transform duration-300">{children}</span>
        {!isLoading && endIcon && (
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5">{endIcon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
