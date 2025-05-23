import './globals.css'
import type { Metadata } from 'next'
import { Inter, Lato } from 'next/font/google'
import { ToastProvider } from '@/components/common/Toast'
import Footer from '@/components/landing/Footer'
import NavbarWrapper from '@/components/layout/NavbarWrapper'

// 폰트 설정
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

// Lato 폰트 설정 (로고용)
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-lato',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Summy - AI-Powered Meeting Summaries',
  description: 'Transform your meetings into actionable insights with Summy. Our AI-powered platform automatically generates comprehensive summaries, action items, and key decisions from your meetings.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
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
      <body className={`${inter.className} ${inter.variable} ${lato.variable}`}>
        <ToastProvider>
          <div className="flex flex-col min-h-screen">
            <NavbarWrapper />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  )
} 