import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  success?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  fullWidth?: boolean
  variant?: "default" | "filled" | "outlined"
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  helperTextClassName?: string
  errorClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    label,
    helperText,
    error,
    success,
    icon,
    iconPosition = "left",
    fullWidth = false,
    variant = "default",
    type,
    containerClassName,
    labelClassName,
    inputClassName,
    helperTextClassName,
    errorClassName,
    ...props
  }, ref) => {
    // 스타일 변형 정의
    const variantStyles = {
      default: "bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500",
      filled: "bg-white/10 border-transparent focus:bg-white/15 focus:ring-1 focus:ring-purple-500",
      outlined: "bg-transparent border border-white/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500",
    }

    // 상태에 따른 스타일 계산
    const stateStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500 text-red-500"
      : success
        ? "border-green-500 focus:border-green-500 focus:ring-green-500"
        : ""

    // 아이콘 위치에 따른 패딩 계산
    const iconPaddingStyles = icon
      ? iconPosition === "left"
        ? "pl-10"
        : "pr-10"
      : ""

    // 너비 스타일 계산
    const widthStyles = fullWidth ? "w-full" : "w-auto"

    return (
      <div className={cn("flex flex-col space-y-1.5", containerClassName)}>
        {label && (
          <label 
            htmlFor={props.id} 
            className={cn(
              "text-sm font-medium text-white/80",
              error && "text-red-500",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              "px-4 py-3 rounded-lg text-white placeholder-white/40 focus:outline-none transition-colors duration-200",
              variantStyles[variant],
              stateStyles,
              iconPaddingStyles,
              widthStyles,
              inputClassName,
              className
            )}
            ref={ref}
            aria-invalid={error ? "true" : undefined}
            {...props}
          />
          {icon && (
            <div 
              className={cn(
                "absolute top-1/2 transform -translate-y-1/2 text-white/50",
                iconPosition === "left" ? "left-3" : "right-3"
              )}
            >
              {icon}
            </div>
          )}
        </div>
        {(helperText || error) && (
          <div className="mt-1">
            {error ? (
              <p className={cn("text-sm text-red-500", errorClassName)}>{error}</p>
            ) : helperText ? (
              <p className={cn("text-sm text-white/60", helperTextClassName)}>{helperText}</p>
            ) : null}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input } 