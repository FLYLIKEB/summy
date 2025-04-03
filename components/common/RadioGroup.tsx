import * as React from "react"
import { cn } from "@/lib/utils"

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: RadioOption[]
  name: string
  value?: string
  defaultValue?: string
  label?: string
  helperText?: string
  error?: string
  success?: boolean
  variant?: "default" | "filled" | "outlined"
  layout?: "horizontal" | "vertical"
  containerClassName?: string
  groupLabelClassName?: string
  radioItemClassName?: string
  radioLabelClassName?: string
  helperTextClassName?: string
  errorClassName?: string
  onChange?: (value: string) => void
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({
    className,
    options,
    name,
    value,
    defaultValue,
    label,
    helperText,
    error,
    success,
    variant = "default",
    layout = "vertical",
    containerClassName,
    groupLabelClassName,
    radioItemClassName,
    radioLabelClassName,
    helperTextClassName,
    errorClassName,
    onChange,
    ...props
  }, ref) => {
    // 내부 상태 관리
    const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
      value || defaultValue
    )

    // props.value 변경 감지
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value)
      }
    }, [value])

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
    
    // 라디오 버튼 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setSelectedValue(newValue)
      
      if (onChange) {
        onChange(newValue)
      }
    }

    return (
      <div className={cn("flex flex-col space-y-1.5", containerClassName)}>
        {label && (
          <div className="mb-1">
            <label
              className={cn(
                "text-sm font-medium text-white/80",
                error && "text-red-500",
                groupLabelClassName
              )}
            >
              {label}
            </label>
          </div>
        )}
        <div 
          className={cn(
            "flex", 
            layout === "vertical" ? "flex-col space-y-2" : "flex-row flex-wrap gap-4",
            className
          )}
          ref={ref}
          role="radiogroup"
          aria-labelledby={label ? `${name}-label` : undefined}
          {...props}
        >
          {options.map((option) => {
            const optionId = `${name}-${option.value}`
            const isChecked = selectedValue === option.value
            
            return (
              <div 
                key={option.value}
                className={cn(
                  "flex items-start",
                  radioItemClassName
                )}
              >
                <div className="flex items-center h-5">
                  <input
                    type="radio"
                    id={optionId}
                    name={name}
                    value={option.value}
                    checked={isChecked}
                    disabled={option.disabled}
                    onChange={handleChange}
                    className={cn(
                      "w-4 h-4 text-purple-600 bg-white/5 border rounded-full focus:ring-offset-gray-900 focus:ring-1 focus:ring-offset-2 transition-colors duration-200",
                      variantStyles[variant],
                      stateStyles
                    )}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor={optionId}
                    className={cn(
                      "font-medium text-white/80",
                      option.disabled && "opacity-50",
                      radioLabelClassName
                    )}
                  >
                    {option.label}
                  </label>
                </div>
              </div>
            )
          })}
        </div>
        {(helperText || error) && (
          <div className="mt-1">
            {error ? (
              <p className={cn("text-sm text-red-500", errorClassName)}>
                {error}
              </p>
            ) : helperText ? (
              <p className={cn("text-sm text-white/60", helperTextClassName)}>
                {helperText}
              </p>
            ) : null}
          </div>
        )}
      </div>
    )
  }
)

RadioGroup.displayName = "RadioGroup"

export { RadioGroup } 