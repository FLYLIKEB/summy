'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function DemoPage() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleSummarize = async () => {
    if (!input.trim()) return

    setIsLoading(true)
    setResult('')

    try {
      // 실제 API 호출 대신 임시로 지연 시간을 추가
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 임시 결과 (실제로는 API 응답을 사용)
      setResult(`요약 결과:

1. 주요 내용
- 프로젝트 일정 조정 및 마감일 확정
- 새로운 기능 개발 우선순위 결정
- 팀원 역할 재배치 및 책임 명확화

2. 참여자별 발언
- 김팀장: Q2 마감일을 6월 15일로 확정하고, 테스트 기간을 2주 확보
- 박개발: 사용자 피드백을 바탕으로 검색 기능 개선이 우선순위
- 이디자인: UI/UX 개선안 제시 및 디자인 시스템 구축 필요성 언급
- 정기획: 신규 기능 3개 중 2개는 Q2, 1개는 Q3로 연기 제안

3. 감정/분위기 분석
- 전반적으로 긍정적이고 협력적인 분위기
- 일정 조정에 대한 팀원들의 이해와 수용
- 새로운 기능 개발에 대한 열정적인 논의

4. 다음 단계
- 5월 1일까지 상세 일정표 작성
- 5월 15일까지 UI/UX 개선안 확정
- 6월 1일까지 테스트 계획 수립`)
    } catch (error) {
      setResult('요약 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            summy
          </Link>
          <Link 
            href="/" 
            className="px-4 py-2 rounded-full border border-white border-opacity-20 hover:bg-white hover:bg-opacity-10 transition-all"
          >
            돌아가기
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            요약 체험하기
          </h1>
          <p className="text-center mb-8 opacity-80">
            실제 대화를 입력해보세요. AI가 요약해드립니다.
          </p>

          <div className="card mb-6">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-48 bg-white bg-opacity-5 rounded-xl p-4 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="여기에 대화 내용을 붙여넣으세요..."
            />
            <div className="mt-2 text-sm text-white opacity-50">
              예시: "안녕하세요, 오늘은 Q2 프로젝트 일정 조정과 신규 기능 개발에 대해 논의하도록 하겠습니다. 
              먼저 현재 진행 상황을 공유해주시겠어요?"
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleSummarize}
              disabled={isLoading || !input.trim()}
              className={`btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  요약 중...
                </div>
              ) : (
                '요약하기'
              )}
            </button>
          </div>

          {result && (
            <div className="card mt-8">
              <h2 className="text-xl font-bold mb-4">요약 결과</h2>
              <div className="text-white opacity-80 whitespace-pre-line">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 