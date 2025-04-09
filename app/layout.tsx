'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { NavbarWrapper } from '@/components/layout/NavbarWrapper'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import Footer from '@/components/landing/Footer'
import { ToastProvider } from '@/components/common/Toast'
import { usePathname } from 'next/navigation'

// 폰트 설정
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <head>
        <title>Summy - 요약만 모아보자</title>
        <meta name="description" content="읽고 싶은 글들의 요약만 모아보자" />
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
          <ToastProvider>
            <NavbarWrapper />
            {isDashboard && <Sidebar />}
            <main className={`min-h-screen ${isDashboard ? 'pl-0 md:pl-64' : ''}`}>
              {children}
            </main>
            {!isDashboard && <Footer />}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 