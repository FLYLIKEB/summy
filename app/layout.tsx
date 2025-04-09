import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { NavbarWrapper } from '@/components/layout/NavbarWrapper'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'

// 폰트 설정
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Summy - 요약만 모아보자',
  description: '읽고 싶은 글들의 요약만 모아보자',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className={`${inter.className} ${inter.variable}`}>
        <ThemeProvider>
          <NavbarWrapper />
          <Sidebar />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
} 