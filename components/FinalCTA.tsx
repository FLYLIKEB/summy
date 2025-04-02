import React from 'react'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section>
      <div className="section-container">
        <div className="card text-center relative overflow-hidden">
          {/* 배경 효과 */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-mint-500/5 animate-gradient"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-mint-500/10 rounded-full blur-3xl"></div>

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-mint-400 text-transparent bg-clip-text animate-gradient">
              메시지 홍수에서 벗어나세요!
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-white/90">
              무수한 메시지 속에서 <span className="font-semibold text-mint-400">핵심 정보만</span> 빠르게 파악하고<br />
              <span className="font-semibold text-purple-400">똑똑한 답변</span>으로 소통 효율을 높여보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-2 sm:mb-4">
              <Link href="/signup" className="btn-primary group relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  🎁 14일 완전 무료 체험하기
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-mint-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              <Link href="/demo" className="btn-secondary group relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  ✨ 지금 바로 요약 테스트
                </span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/80 bg-white/5 inline-block px-6 py-2 rounded-full">
              ✨ 신용카드 정보 불필요 · 언제든 해지 가능 · 설치 필요 없음
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 