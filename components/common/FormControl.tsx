import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  fullWidth?: boolean
  direction?: "row" | "column"
  spacing?: "none" | "sm" | "md" | "lg"
  align?: "start" | "center" | "end" | "stretch"
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ 
    className, 
    children, 
    fullWidth = false, 
    direction = "column", 
    spacing = "md", 
    align = "stretch",
    ...props 
  }, ref) => {
    // 방향에 따른 스타일
    const directionStyles = {
      row: "flex-row",
      column: "flex-col"
    }

    // 간격에 따른 스타일
    const spacingStyles = {
      none: "gap-0",
      sm: direction === "row" ? "gap-2" : "space-y-2",
      md: direction === "row" ? "gap-4" : "space-y-4",
      lg: direction === "row" ? "gap-6" : "space-y-6"
    }

    // 정렬에 따른 스타일
    const alignStyles = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch"
    }

    // 너비 스타일
    const widthStyles = fullWidth ? "w-full" : ""

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          directionStyles[direction],
          spacingStyles[spacing],
          alignStyles[align],
          widthStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

FormControl.displayName = "FormControl"

export { FormControl }

// FormGroup 컴포넌트 - 관련 폼 요소를 그룹화하는 데 사용
export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title?: string
  description?: string
  fullWidth?: boolean
}

export const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, children, title, description, fullWidth = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-4 p-6 border border-white/10 rounded-lg bg-white/5",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {(title || description) && (
          <div className="space-y-1 mb-2">
            {title && <h3 className="text-lg font-medium text-white">{title}</h3>}
            {description && <p className="text-sm text-white/60">{description}</p>}
          </div>
        )}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    )
  }
)

FormGroup.displayName = "FormGroup"

// FormActions 컴포넌트 - 폼 버튼을 배치하는 데 사용
export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  position?: "left" | "center" | "right" | "between"
}

export const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ className, children, position = "right", ...props }, ref) => {
    // 위치에 따른 스타일
    const positionStyles = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-3 mt-6",
          positionStyles[position],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

FormActions.displayName = "FormActions" 