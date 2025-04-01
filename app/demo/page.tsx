'use client'

import React from 'react'
import Link from 'next/link'

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            summy
          </Link>
          <Link 
            href="/" 
            className="px-4 py-2 rounded-full border border-white border-opacity-20 hover:bg-white hover:bg-opacity-10 transition-all"
          >
            돌아가기
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            요약 체험하기
          </h1>
          <p className="text-center mb-8 opacity-80">
            실제 대화를 입력해보세요. AI가 요약해드립니다.
          </p>

          <div className="card mb-6">
            <textarea
              className="w-full h-48 bg-white bg-opacity-5 rounded-xl p-4 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="여기에 대화 내용을 붙여넣으세요..."
            />
          </div>

          <div className="flex justify-center">
            <button className="btn-primary">
              요약하기
            </button>
          </div>

          <div className="card mt-8">
            <h2 className="text-xl font-bold mb-4">요약 결과</h2>
            <div className="text-white opacity-80">
              대화 내용을 입력하면 여기에 요약 결과가 표시됩니다.
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 