import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'summy - AI 회의 요약',
  description: 'AI가 회의 내용을 자동으로 요약하고 답변을 제안합니다.',
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} font-sans antialiased`}>
      {children}
    </div>
  );
} 