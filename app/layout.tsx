import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Navbar } from './components/Navbar'

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: '--font-noto-sans-kr',
  display: 'swap',
});

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
    <html lang="ko" className={notoSansKr.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
} 