import * as React from "react"

import { cn } from "@/lib/utils"

export interface CardProps extends React.ComponentProps<"div"> {
  gradient?: boolean
  hover?: boolean
  animate?: boolean
  blur?: boolean
  variant?: "default" | "elevated" | "outline" | "glass" | "dark"
  padding?: "none" | "sm" | "md" | "lg"
}

function Card({ 
  className, 
  gradient = false, 
  hover = false, 
  animate = false,
  blur = true,
  variant = "default",
  padding = "md",
  children,
  ...props 
}: CardProps) {
  // 기본 스타일
  const baseStyles = "relative overflow-hidden rounded-xl"
  
  // 변형 스타일
  const variantStyles = {
    default: "bg-white/5 border border-white/10",
    elevated: "bg-white/10 border border-white/20 shadow-lg shadow-black/5",
    outline: "bg-transparent border border-white/20",
    glass: "backdrop-blur-sm bg-white/5 border border-white/10",
    dark: "bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10"
  }
  
  // 패딩 스타일
  const paddingStyles = {
    none: "p-0",
    sm: "p-3",
    md: "p-6",
    lg: "p-8"
  }
  
  // 그라데이션 배경 스타일
  const gradientStyles = gradient 
    ? "bg-gradient-to-br from-gray-900/50 to-black/50" 
    : ""
  
  // 호버 효과
  const hoverStyles = hover 
    ? "transition-all duration-300 hover:border-purple-500/20 hover:bg-white/10" 
    : ""

  // 블러 효과
  const blurStyles = blur && variant !== 'glass'
    ? "backdrop-blur-sm"
    : ""

  return (
    <div
      data-slot="card"
      className={cn(
        baseStyles,
        variantStyles[variant],
        paddingStyles[padding],
        gradientStyles,
        hoverStyles,
        blurStyles,
        className
      )}
      {...props}
    >
      {/* 배경 효과 */}
      {gradient && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-mint-500/5 animate-gradient"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-mint-500/10 rounded-full blur-3xl"></div>
        </>
      )}
      
      {/* 애니메이션 효과 */}
      {animate && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-mint-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      )}
      
      <div className={cn("relative flex flex-col", padding === "none" ? "" : "gap-6")}>
        {children}
      </div>
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-xl font-bold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-white/60 text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center mt-auto pt-4 border-t border-white/10", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
