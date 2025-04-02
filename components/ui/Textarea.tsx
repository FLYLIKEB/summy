import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label?: string
  helperText?: string
  error?: string
  success?: boolean
  fullWidth?: boolean
  variant?: "default" | "filled" | "outlined"
  containerClassName?: string
  labelClassName?: string
  textareaClassName?: string
  helperTextClassName?: string
  errorClassName?: string
  onChange?: (value: string) => void
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    label,
    helperText,
    error,
    success,
    fullWidth = false,
    variant = "default",
    containerClassName,
    labelClassName,
    textareaClassName,
    helperTextClassName,
    errorClassName,
    onChange,
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
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : success
        ? "border-green-500 focus:border-green-500 focus:ring-green-500"
        : ""

    // 너비 스타일 계산
    const widthStyles = fullWidth ? "w-full" : "w-auto"

    // 텍스트 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e.target.value)
      }
    }

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
        <textarea
          className={cn(
            "min-h-[100px] px-4 py-3 rounded-lg text-white resize-vertical focus:outline-none transition-colors duration-200",
            variantStyles[variant],
            stateStyles,
            widthStyles,
            textareaClassName,
            className
          )}
          ref={ref}
          onChange={handleChange}
          aria-invalid={error ? "true" : undefined}
          {...props}
        />
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

Textarea.displayName = "Textarea"

export { Textarea } 