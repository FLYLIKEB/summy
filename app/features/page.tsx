import React from 'react'

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="section-container py-20">
        <h1 className="text-4xl font-black mb-8 text-center">
          ✨ Summy의 모든 기능
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 메신저 지원 */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-4">📱 다양한 메신저 지원</h2>
            <div className="space-y-4">
              <p className="text-white/80">
                카카오톡, 라인, 슬랙, 디스코드 등 다양한 메신저의 대화를 지원합니다.
                각 메신저의 특성에 맞게 최적화된 요약을 제공해드려요.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="tag">카카오톡</span>
                <span className="tag">라인</span>
                <span className="tag">슬랙</span>
                <span className="tag">디스코드</span>
              </div>
            </div>
          </div>

          {/* AI 요약 */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-4">🤖 AI 기반 스마트 요약</h2>
            <div className="space-y-4">
              <p className="text-white/80">
                단순한 키워드 추출이 아닌, AI가 대화의 맥락을 이해하고
                중요한 내용을 정확하게 요약해드립니다.
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>맥락을 고려한 요약</li>
                <li>중요도 기반 핵심 내용 추출</li>
                <li>자연스러운 요약문 생성</li>
              </ul>
            </div>
          </div>

          {/* 실시간 요약 */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-4">⚡ 실시간 요약</h2>
            <div className="space-y-4">
              <p className="text-white/80">
                대화가 진행되는 동안 실시간으로 요약이 업데이트되어
                중요한 내용을 놓치지 않습니다.
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>실시간 업데이트</li>
                <li>자동 저장</li>
                <li>이력 관리</li>
              </ul>
            </div>
          </div>

          {/* 맞춤형 답변 */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-4">💡 맞춤형 답변 추천</h2>
            <div className="space-y-4">
              <p className="text-white/80">
                대화 내용을 분석하여 상황에 맞는 답변을 추천해드립니다.
                더 효과적인 커뮤니케이션을 도와드려요.
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>맥락 기반 답변 추천</li>
                <li>다양한 답변 옵션</li>
                <li>커스터마이징 가능</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">지금 바로 시작하세요</h2>
          <p className="text-white/80 mb-8">
            Summy와 함께 더 스마트한 대화를 경험해보세요
          </p>
          <a 
            href="/pricing" 
            className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            요금제 보기
          </a>
        </div>
      </div>
    </main>
  )
} 