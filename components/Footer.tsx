import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-white/10">
      <div className="section-container py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-3">
              ✨ Summy
            </h3>
            <p className="text-sm text-white/60">
              🤖 AI로 더 스마트하게 대화를 요약하세요
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
              <span>📋</span> 이용약관
            </a>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
              <span>🔐</span> 개인정보처리방침
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-white/40">
            💜 © 2025 Summy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 