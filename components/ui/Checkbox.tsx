import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string
  helperText?: string
  error?: string
  success?: boolean
  variant?: "default" | "filled" | "outlined"
  containerClassName?: string
  labelClassName?: string
  checkboxClassName?: string
  helperTextClassName?: string
  errorClassName?: string
  onChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    className,
    label,
    helperText,
    error,
    success,
    variant = "default",
    containerClassName,
    labelClassName,
    checkboxClassName,
    helperTextClassName,
    errorClassName,
    onChange,
    ...props
  }, ref) => {
    // 스타일 변형 정의
    const variantStyles = {
      default: "border-white/10 focus:border-purple-500 focus:ring-purple-500",
      filled: "bg-white/10 border-transparent focus:bg-white/15 focus:ring-purple-500",
      outlined: "bg-transparent border-white/20 focus:border-purple-500 focus:ring-purple-500",
    }

    // 상태에 따른 스타일 계산
    const stateStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : success
        ? "border-green-500 focus:border-green-500 focus:ring-green-500"
        : ""

    // 체크박스 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.checked)
      }
    }

    return (
      <div className={cn("flex flex-col space-y-1.5", containerClassName)}>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              className={cn(
                "w-4 h-4 text-purple-600 bg-white/5 border rounded focus:ring-offset-gray-900 focus:ring-1 focus:ring-offset-2 transition-colors duration-200",
                variantStyles[variant],
                stateStyles,
                checkboxClassName,
                className
              )}
              ref={ref}
              onChange={handleChange}
              aria-invalid={error ? "true" : undefined}
              aria-describedby={props.id ? `${props.id}-description` : undefined}
              {...props}
            />
          </div>
          {label && (
            <div className="ml-3 text-sm">
              <label
                htmlFor={props.id}
                className={cn(
                  "font-medium text-white/80",
                  error && "text-red-500",
                  labelClassName
                )}
              >
                {label}
              </label>
            </div>
          )}
        </div>
        {(helperText || error) && (
          <div className="mt-1 ml-7">
            {error ? (
              <p
                id={props.id ? `${props.id}-description` : undefined}
                className={cn("text-sm text-red-500", errorClassName)}
              >
                {error}
              </p>
            ) : helperText ? (
              <p
                id={props.id ? `${props.id}-description` : undefined}
                className={cn("text-sm text-white/60", helperTextClassName)}
              >
                {helperText}
              </p>
            ) : null}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox } 