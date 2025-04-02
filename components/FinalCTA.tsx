import React from 'react'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="py-16">
      <div className="section-container">
        <div className="card text-center border border-white/10 bg-white/5 backdrop-blur-sm p-8 sm:p-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              메시지 홍수에서 벗어나세요
            </h2>
            
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              무수한 메시지 속에서 핵심 정보만 빠르게 파악하고
              똑똑한 답변으로 소통 효율을 높여보세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-6">
              <Link href="/signup" className="btn-primary">
                14일 무료 체험하기
              </Link>
              <Link href="/demo" className="btn-secondary">
                요약 테스트하기
              </Link>
            </div>
            
            <p className="text-sm text-white/60 mt-6">
              신용카드 정보 불필요 · 언제든 해지 가능 · 설치 필요 없음
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 