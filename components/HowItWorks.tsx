import React from 'react'

export default function HowItWorks() {
  return (
    <section>
      <div className="section-container">
        <h2 className="section-title">
          🎯 이렇게 사용하세요
        </h2>
        <div className="card">
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                1️⃣
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">💬 대화 내역 업로드</h3>
                <p className="text-sm sm:text-base opacity-90">
                  카카오톡, 라인, 슬랙 등에서 내보낸 대화 내역을 업로드하세요.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                2️⃣
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">✨ AI 분석</h3>
                <p className="text-sm sm:text-base opacity-90">
                  AI가 대화 내용을 분석하고 중요한 내용을 추출합니다.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                3️⃣
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">📝 요약 결과 확인</h3>
                <p className="text-sm sm:text-base opacity-90">
                  핵심 내용이 요약된 결과를 확인하고, 필요한 경우 답변을 생성할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 