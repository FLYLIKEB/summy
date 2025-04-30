'use client'

import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

interface ToastProps {
  title?: string
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  onClose?: () => void
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  showProgress?: boolean
}

export const Toast = ({ title, message, type = 'success', duration = 3000, onClose, position = 'bottom-center', showProgress = true }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(100)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  const progressTimerRef = React.useRef<NodeJS.Timeout | null>(null)

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
  }

  const typeClasses = {
    success: "bg-success/10 border-success/30 text-success",
    error: "bg-error/10 border-error/30 text-error",
    info: "bg-info/10 border-info/30 text-info",
    warning: "bg-warning/10 border-warning/30 text-warning"
  }

  const iconMap = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />
  }

  const handleClose = React.useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onClose && onClose()
    }, 300) // 페이드 아웃 시간
  }, [onClose]);

  useEffect(() => {
    if (duration !== Infinity) {
      timerRef.current = setTimeout(() => {
        handleClose()
      }, duration)

      if (showProgress) {
        let elapsed = 0
        const interval = 10 // 10ms마다 업데이트
        const steps = duration / interval
        
        progressTimerRef.current = setInterval(() => {
          elapsed += interval
          setProgress(100 - (elapsed / duration) * 100)
        }, interval)
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current)
      }
    }
  }, [duration, showProgress, handleClose])

  if (!isVisible) {
    return null
  }

  return (
    <div 
      className={cn(
        "fixed z-50 animate-slide-in-up min-w-[320px] max-w-md rounded-lg shadow-lg",
        positionClasses[position],
        isVisible ? "opacity-100" : "opacity-0 transition-opacity duration-300"
      )}
      role="alert"
    >
      <div className={cn(
        "flex items-start p-4 rounded-lg border",
        typeClasses[type]
      )}>
        <div className="mr-3 flex-shrink-0 pt-0.5">
          {iconMap[type]}
        </div>
        <div className="flex-1">
          {title && <h3 className="font-semibold mb-1">{title}</h3>}
          <p className="text-sm opacity-90">{message}</p>
        </div>
        <button 
          onClick={handleClose}
          className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {showProgress && (
        <div className="h-1 bg-white/20 rounded-b-lg overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-100 ease-linear",
              {
                "bg-success": type === 'success',
                "bg-error": type === 'error',
                "bg-info": type === 'info',
                "bg-warning": type === 'warning'
              }
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}

// Toast 컨텍스트 및 공급자 (글로벌 토스트 관리용)
interface ToastContextValue {
  showToast: (props: ToastProps) => void
  hideToast: () => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = React.useState<ToastProps | null>(null)
  const [id, setId] = React.useState(0)

  const showToast = (props: ToastProps) => {
    setToast({ ...props, onClose: () => hideToast() })
    setId(prev => prev + 1)
  }

  const hideToast = () => {
    setToast(null)
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && <Toast key={id} {...toast} />}
    </ToastContext.Provider>
  )
}

// 커스텀 훅
export const useToast = () => {
  const context = React.useContext(ToastContext)
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  
  return context
} 