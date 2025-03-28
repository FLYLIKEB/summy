import React from 'react'

export default function Features() {
  return (
    <section>
      <div className="section-container">
        <div className="card">
          <div className="card-title">
            <span className="card-title-icon">💬</span>
            <h2 className="card-title-text">어떤 대화든 요약해드려요</h2>
          </div>
          <div className="space-y-6">
            <p className="text-base opacity-90">
              카카오톡, 라인, 슬랙 등 다양한 메신저의 대화를 지원해요.
              긴 시간 동안 오간 수많은 메시지도 단 몇 초 만에 핵심만 쏙 뽑아드립니다.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="tag">주요 결정사항</span>
              <span className="tag">참여자별 발언</span>
              <span className="tag">감정/분위기 분석</span>
              <span className="tag">시간대별 정리</span>
              <span className="tag">답변 제안</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 