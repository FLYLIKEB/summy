import React from 'react'
import Link from 'next/link'

interface LegalLayoutProps {
  children: React.ReactNode
  title: string
  lastUpdated: string
}

export default function LegalLayout({ children, title, lastUpdated }: LegalLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-sm opacity-70 mb-8">마지막 수정일: {lastUpdated}</p>
          
          <div className="prose prose-invert max-w-none">
            {children}
          </div>

          <div className="mt-8 text-center">
            <Link 
              href="/signup" 
              className="apple-button apple-button-primary rounded-lg"
              prefetch={true}
            >
              회원가입으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 