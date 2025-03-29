import React from 'react'

export default function Features() {
  return (
    <section>
      <div className="section-container">
        <h2 className="section-title">
          어떤 대화든 요약해드려요
        </h2>
        <div className="card">
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-bold text-lg sm:text-xl mb-3">카카오톡, 라인, 슬랙 등 다양한 메신저 지원</h3>
              <p className="text-sm sm:text-base opacity-90">
                카카오톡, 라인, 슬랙 등 다양한 메신저의 대화를 지원해요.
                긴 시간 동안 오간 수많은 메시지도 단 몇 초 만에 핵심만 쏙 뽑아드립니다.
                대화 내용을 요약하고, 상황에 맞는 답변을 추천해드려요.
                더 이상 대화를 놓치지 마세요.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="tag">카카오톡</span>
                <span className="tag">라인</span>
                <span className="tag">슬랙</span>
                <span className="tag">디스코드</span>
              </div>
            </div>
            <div className="card">
              <h3 className="font-bold text-lg sm:text-xl mb-3">AI가 이해하는 요약</h3>
              <p className="text-sm sm:text-base opacity-90">
                단순히 키워드만 추출하는 것이 아니라, AI가 대화의 맥락을 이해하고
                중요한 내용을 정확하게 요약해드려요.
              </p>
            </div>
            <div className="card">
              <h3 className="font-bold text-lg sm:text-xl mb-3">실시간 요약</h3>
              <p className="text-sm sm:text-base opacity-90">
                대화가 진행되는 동안 실시간으로 요약이 업데이트되어
                중요한 내용을 놓치지 않아요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 