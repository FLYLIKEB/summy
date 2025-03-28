import React from 'react'

export default function SpecialFeatures() {
  return (
    <section>
      <div className="section-container">
        <div className="card">
          <div className="card-title">
            <span className="card-title-icon">🤖</span>
            <h2 className="card-title-text">summy의 특별한 점</h2>
          </div>
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-bold mb-2">AI 기반 요약으로 높은 정확도</h3>
              <div className="progress-bar">
                <div className="progress-fill bg-purple-400" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div className="card">
              <h3 className="font-bold mb-2">문맥과 목적에 따라 요약 방식 선택 가능</h3>
              <div className="flex flex-wrap gap-2">
                <span className="tag">간단 요약</span>
                <span className="tag">요점 정리</span>
                <span className="tag">키워드 추출</span>
              </div>
            </div>
            <div className="card">
              <h3 className="font-bold mb-2">요약본에 코멘트와 인사이트 추가도 가능</h3>
              <p className="text-base opacity-90">
                AI가 제안하는 인사이트를 통해 더 깊이 있는 이해가 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 