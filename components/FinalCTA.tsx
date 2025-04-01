import React from 'react'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section>
      <div className="section-container">
        <div className="card text-center">
          <h2 className="text-4xl font-bold mb-6">
            지금 바로 시작해보세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            매일 쌓이는 메시지와 씨름하지 마세요.<br />
            summy와 함께라면 단 몇 초만에 핵심을 파악할 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-secondary">
              첫 달 무료로 시작하기
            </Link>
            <Link href="/demo" className="btn-primary">
              실제 대화 요약해보기
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-70">
            ✨ 첫 달 무료 · 언제든 해지 가능 · 설치 필요 없음
          </p>
        </div>
      </div>
    </section>
  )
} 