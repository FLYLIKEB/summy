import React from 'react'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="py-16">
      <div className="section-container">
        <div className="card text-center border border-white/10 bg-white/5 backdrop-blur-sm p-8 sm:p-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              <span className="text-purple-400">메시지 홍수</span>에서 벗어나세요
            </h2>
            
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              무수한 메시지 속에서 <span className="font-bold text-mint-400">핵심 정보</span>만 빠르게 파악하고<br className="hidden sm:block" />
              <span className="font-bold text-purple-400">똑똑한 답변</span>으로 소통 효율을 높여보세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-6">
              <Link href="/signup" className="btn-primary">
                <span className="font-bold">14일 무료 체험</span>하기
              </Link>
              <Link href="/demo" className="btn-secondary">
                <span className="font-bold">요약 테스트</span>하기
              </Link>
            </div>
            
            <p className="text-sm text-white/60 mt-6">
              <span className="text-mint-300">신용카드 정보 불필요</span> · 언제든 해지 가능 · 설치 필요 없음
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 