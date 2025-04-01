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
- 대화의 핵심 주제와 결론
- 중요한 결정사항
- 다음 단계나 할 일

2. 참여자별 발언
- 각 참여자의 주요 의견
- 역할과 책임

3. 감정/분위기 분석
- 대화의 전반적인 톤
- 참여자들의 감정 상태

4. 시간대별 정리
- 주요 이슈별 시간대
- 마감일과 약속된 일정`)
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