import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Navbar } from '../components/Navbar'
import Footer from '@/components/Footer'
import { Inter } from 'next/font/google'

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: '--font-noto-sans-kr',
  display: 'swap',
});

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Summy - 스마트 요약 서비스",
  description: "복잡하고 방대한 정보를 빠르고 쉽게 이해할 수 있도록 요약해주는 AI 기반 스마트 요약 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${inter.className}`}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Navbar />
            <div className="pt-16">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 