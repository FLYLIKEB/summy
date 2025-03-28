import React from 'react'

export default function FinalCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="interview-card max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            지금 바로 시작해보세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            매일 쌓이는 메시지와 씨름하지 마세요.<br />
            summy와 함께라면 단 몇 초만에 핵심을 파악할 수 있습니다.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-purple-700 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all">
              무료로 시작하기
            </button>
            <button className="px-8 py-4 bg-white bg-opacity-10 text-white rounded-full font-bold text-lg hover:bg-opacity-20 transition-all border border-white border-opacity-20">
              요약 체험하기
            </button>
          </div>
          <p className="mt-6 text-sm opacity-70">
            ✨ 첫 달 무료 · 언제든 해지 가능 · 설치 필요 없음
          </p>
        </div>
      </div>
    </section>
  )
} 