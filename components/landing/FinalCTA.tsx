import React from 'react'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="apple-section">
      <div className="apple-section-container">
        <div className="apple-card apple-card-content text-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium mb-4 sm:mb-6 text-white">
              <span className="text-white/90">커뮤니케이션의 혁신</span>을 경험하세요
            </h2>
            
            <p className="text-sm sm:text-base mb-6 sm:mb-8 text-white/70 max-w-2xl mx-auto">
              메시지 요약으로 <span className="font-medium text-white/90">시간을 절약</span>하고<br className="hidden sm:block" />
              <span className="font-medium text-white/90">AI 답장 제안</span>으로 소통 효율을 높여보세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/signup" className="apple-button apple-button-primary">
                <span className="font-medium">14일 무료 체험</span>하기
              </Link>
              <Link href="/home" className="apple-button apple-button-secondary">
                <span className="font-medium">로그인 없이 체험</span>하기
              </Link>
            </div>
            
            <p className="text-xs sm:text-sm text-white/50 mt-6">
              <span className="text-white/70">신용카드 정보 불필요</span> · 언제든 해지 가능 · 설치 필요 없음
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}