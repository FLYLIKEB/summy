import React from 'react'
import { Card } from '@/components/ui/card'

export default function HowItWorks() {
  return (
    <section>
      <div className="section-container">
        <h2 className="section-title">
          🎯 이렇게 사용하세요
        </h2>
        <Card variant="glass" padding="lg" hover>
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
                <h3 className="font-bold text-lg sm:text-xl mb-2">📋 요약 결과 확인</h3>
                <p className="text-sm sm:text-base opacity-90">
                  주요 내용, 키워드, 액션 아이템 등이 포함된 요약을 확인하세요.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                4️⃣
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">📤 결과 공유</h3>
                <p className="text-sm sm:text-base opacity-90">
                  요약 내용을 다운로드하거나 팀원과 공유하세요.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
} 