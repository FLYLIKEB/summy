import React from 'react'
import Link from 'next/link'
export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
    <Link href="/" className="inline-block">
        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            ✨ Summy
        </h1>
    </Link>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </main>
  )
} 