import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-white/10">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="text-center md:text-left">
            <Link href="/" className="block">
              <h3 className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-3">
                ✨ Summy
              </h3>
            </Link>
            <p className="text-sm text-white/60">
              🤖 AI로 더 스마트하게 대화를 요약하세요
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">빠른 링크</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-sm text-white/60 hover:text-white transition-colors">상세 기능 소개</Link></li>
              <li><Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">요금제</Link></li>
              <li><Link href="/blog" className="text-sm text-white/60 hover:text-white transition-colors">블로그</Link></li>
              <li><Link href="/faq" className="text-sm text-white/60 hover:text-white transition-colors">자주 묻는 질문</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">연락처</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@summy.ai" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
                  <span>📧</span> support@summy.ai
                </a>
              </li>
              <li>
                <a href="https://pf.kakao.com/_xxxxx" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
                  <span>💬</span> 카카오톡 채널
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=서울특별시" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
                  <span>📍</span> 서울특별시
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">뉴스레터 구독</h4>
            <p className="text-sm text-white/60 mb-4">새로운 기능과 업데이트를 받아보세요</p>
            <form action="/api/newsletter" method="POST" className="flex gap-2">
              <input 
                type="email" 
                name="email"
                placeholder="이메일 주소" 
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                required
              />
              <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                구독
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-white/5 pt-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/terms" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
              <span>📋</span> 이용약관
            </Link>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
            <Link href="/privacy" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
              <span>🔐</span> 개인정보처리방침
            </Link>
          </div>
          <div className="flex gap-4">
            <a 
              href="https://twitter.com/summy_ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-white transition-colors"
              aria-label="트위터"
            >
              <span className="text-xl">🐦</span>
            </a>
            <a 
              href="https://instagram.com/summy.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-white transition-colors"
              aria-label="인스타그램"
            >
              <span className="text-xl">📱</span>
            </a>
            <a 
              href="https://pf.kakao.com/_xxxxx" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-white transition-colors"
              aria-label="카카오톡"
            >
              <span className="text-xl">💬</span>
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