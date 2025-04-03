import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectGroup {
  label: string
  options: SelectOption[]
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options?: SelectOption[]
  groups?: SelectGroup[]
  label?: string
  helperText?: string
  error?: string
  success?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
  variant?: "default" | "filled" | "outlined"
  containerClassName?: string
  labelClassName?: string
  selectClassName?: string
  helperTextClassName?: string
  errorClassName?: string
  onChange?: (value: string) => void
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({
    className,
    options,
    groups,
    label,
    helperText,
    error,
    success,
    icon,
    fullWidth = false,
    variant = "default",
    containerClassName,
    labelClassName,
    selectClassName,
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

    // 선택 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
        <div className="relative">
          <select
            className={cn(
              "appearance-none px-4 py-3 rounded-lg text-white focus:outline-none transition-colors duration-200 pr-10", // 화살표를 위한 공간
              variantStyles[variant],
              stateStyles,
              widthStyles,
              selectClassName,
              className
            )}
            ref={ref}
            onChange={handleChange}
            aria-invalid={error ? "true" : undefined}
            {...props}
          >
            {options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-gray-800 text-white"
              >
                {option.label}
              </option>
            ))}
            {groups?.map((group) => (
              <optgroup key={group.label} label={group.label} className="bg-gray-800 text-white">
                {group.options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className="bg-gray-800 text-white"
                  >
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {/* 화살표 아이콘 */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-white/50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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

Select.displayName = "Select"

export { Select } 