'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default function ThemeProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  // 테마 토글 함수
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // 컴포넌트 마운트 감지
  useEffect(() => {
    setMounted(true)
  }, [])

  // 초기 테마 설정 (마운트 후에만 실행)
  useEffect(() => {
    if (!mounted) return

    try {
      // 저장된 테마 불러오기
      const savedTheme = localStorage.getItem('theme') as Theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      if (savedTheme) {
        setTheme(savedTheme)
      } else if (prefersDark) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    } catch (e) {
      console.error('테마 설정 중 오류 발생:', e)
    }
  }, [mounted])

  // 테마 변경 시 HTML 클래스와 localStorage 업데이트
  useEffect(() => {
    if (!mounted) return

    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('theme', theme)
    } catch (e) {
      console.error('테마 적용 중 오류 발생:', e)
    }
  }, [theme, mounted])

  // 마운트 전에는 Context 값을 제공하지만 아무 작업도 수행하지 않음
  const value = {
    theme,
    setTheme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
} 