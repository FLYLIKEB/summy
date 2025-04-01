'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const EXAMPLE_CONVERSATION = `[김팀장] 안녕하세요, 오늘은 Q2 프로젝트 일정 조정과 신규 기능 개발에 대해 논의하도록 하겠습니다. 
먼저 현재 진행 상황을 공유해주시겠어요?

[박개발] 네, 현재 프론트엔드 개발이 70% 정도 진행되었고, 백엔드 API는 80% 완료되었습니다. 
다만 사용자 피드백에서 검색 기능에 대한 불만이 많아서 이 부분 개선이 필요해 보입니다.

[이디자인] UI/UX 개선안을 제시드리겠습니다. 현재 디자인 시스템이 일관성이 부족한 것 같아요. 
컬러 팔레트와 타이포그래피를 통일하고, 컴포넌트 재사용성을 높일 필요가 있습니다.

[정기획] 신규 기능 3개 중에서 2개는 Q2에, 1개는 Q3로 연기하는 것이 어떨까요? 
현재 일정이 너무 타이트해 보입니다.

[김팀장] 네, 좋은 의견입니다. Q2 마감일을 6월 15일로 확정하고, 테스트 기간을 2주 확보하도록 하겠습니다. 
박개발님, 검색 기능 개선은 최우선으로 진행해주세요.

[이디자인] 디자인 시스템 구축을 위해 다음 주까지 상세 기획안을 작성하도록 하겠습니다.

[박개발] 알겠습니다. 검색 기능 개선안은 이번 주 금요일까지 공유드리겠습니다.

[정기획] 그럼 5월 1일까지 상세 일정표를 작성하고, 5월 15일까지 UI/UX 개선안을 확정하도록 하겠습니다. 
테스트 계획은 6월 1일까지 수립하겠습니다.

[김팀장] 네, 모두 수고 많으셨습니다. 다음 주 월요일까지 각자 담당 업무 진행 상황을 공유해주세요.`

const EXAMPLE_SUMMARY = `1. 주요 내용
- Q2 프로젝트 일정 조정 논의
- 신규 기능 개발 계획 수립
- 팀원별 진행 상황 공유

2. 참여자별 발언
- 김팀장: Q2 마감일 6월 15일 확정 및 테스트 기간 2주 확보, 검색 기능 개선 최우선 지시
- 박개발: 프론트엔드 70%, 백엔드 80% 완료, 검색 기능 개선안 금요일까지 제출 예정
- 이디자인: 디자인 시스템 일관성 개선 필요, 다음 주까지 상세 기획안 작성
- 정기획: 신규 기능 2개 Q2, 1개 Q3로 연기 제안, 5월 1일까지 상세 일정표 작성

3. 감정/분위기 분석
- 건설적이고 협력적인 회의 분위기
- 일정 조정에 대한 팀원들의 긍정적 수용
- 효율적인 의사결정 과정

4. 다음 단계
- 5월 1일: 상세 일정표 작성
- 5월 15일: UI/UX 개선안 확정
- 6월 1일: 테스트 계획 수립
- 다음 주 월요일: 팀원별 진행 상황 공유

5. 통계 정보
- 참여자 수: 4명
- 회의 시간: 30분
- 주요 키워드: 일정 조정, 기능 개발, UI/UX 개선
- 진행률: 75%`

const DETAILED_SUMMARY = `1. 주요 내용
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
- 6월 1일까지 테스트 계획 수립`

export default function DemoPage() {
  const [input, setInput] = useState('')
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [isSuggesting, setIsSuggesting] = useState(false)
  const [result, setResult] = useState('')
  const [suggestedResponse, setSuggestedResponse] = useState('')

  const handleSummarize = () => {
    console.log('요약하기 버튼 클릭됨')
    setIsSummarizing(true)
    setResult('')
    setSuggestedResponse('')

    // 실제 API 호출 대신 임시로 지연 시간을 추가
    setTimeout(() => {
      try {
        console.log('요약 시작')
        // 임시 결과 (실제로는 API 응답을 사용)
        const summary = input.trim() ? DETAILED_SUMMARY : EXAMPLE_SUMMARY

        console.log('요약 결과 설정')
        setResult(summary)
      } catch (error) {
        console.error('요약 중 오류 발생:', error)
        setResult('요약 중 오류가 발생했습니다. 다시 시도해주세요.')
      } finally {
        setIsSummarizing(false)
      }
    }, 2000)
  }

  const handleSuggestResponse = () => {
    setIsSuggesting(true)
    setSuggestedResponse('')
    setResult('')

    // 실제 API 호출 대신 임시로 지연 시간을 추가
    setTimeout(() => {
      try {
        console.log('답변 제안 시작')
        // 임시 답변 제안 (실제로는 API 응답을 사용)
        const suggestion = `안녕하세요, 회의 내용을 잘 확인했습니다. 
제안하신 일정 조정안과 기능 개발 계획에 동의합니다. 
다음 주 월요일까지 각자 담당 업무 진행 상황을 공유하도록 하겠습니다.`

        console.log('답변 제안 설정')
        setSuggestedResponse(suggestion)
      } catch (error) {
        console.error('답변 제안 중 오류 발생:', error)
        setSuggestedResponse('답변 제안 중 오류가 발생했습니다. 다시 시도해주세요.')
      } finally {
        setIsSuggesting(false)
      }
    }, 1500)
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
              className="w-full h-48 bg-white bg-opacity-5 rounded-xl p-4 text-white placeholder:text-white/50 placeholder:text-sm placeholder:font-light placeholder:leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder={EXAMPLE_CONVERSATION}
            />
          </div>

          <div className="flex justify-center gap-4">
            <button 
              type="button"
              onClick={handleSummarize}
              disabled={isSummarizing || isSuggesting}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSummarizing ? (
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
            <button 
              type="button"
              onClick={handleSuggestResponse}
              disabled={isSummarizing || isSuggesting}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSuggesting ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  제안 중...
                </div>
              ) : (
                '답변 제안받기'
              )}
            </button>
          </div>

          {suggestedResponse && (
            <div className="card mt-8 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border border-white/10 relative overflow-hidden">
              {/* 배경 효과 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 animate-gradient"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 animate-pulse">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text animate-gradient">답변 제안</h2>
                      <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full text-blue-300">AI 제안</span>
                    </div>
                    <p className="text-sm text-white/60 mt-1">회의 내용을 바탕으로 적절한 답변을 제안합니다</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-blue-500/20 transition-all duration-300">
                  <div className="text-white/80 whitespace-pre-line">{suggestedResponse}</div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-white/60 group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <span className="group-hover:text-white transition-colors duration-300">AI 답변 제안</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="card mt-8 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 relative overflow-hidden">
              {/* 배경 효과 */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 animate-gradient"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>

              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 animate-pulse">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">요약 결과</h2>
                      <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300">AI 분석</span>
                    </div>
                    <p className="text-sm text-white/60 mt-1">대화 내용을 분석하여 핵심 정보를 추출했습니다</p>
                  </div>
                </div>
                
                {/* 통계 정보 섹션 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-white/60">참여자 수</div>
                        <div className="text-lg font-semibold text-white">4명</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-white/60">회의 시간</div>
                        <div className="text-lg font-semibold text-white">30분</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-white/60">키워드</div>
                        <div className="text-lg font-semibold text-white">3개</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-white/60">진행률</div>
                        <div className="text-lg font-semibold text-white">75%</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 키워드 태그 */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm">일정 조정</span>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm">기능 개발</span>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm">UI/UX 개선</span>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm">프로젝트 관리</span>
                </div>

                {/* 진행 상태 바 */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">프로젝트 진행률</span>
                    <span className="text-purple-400">75%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="grid gap-6">
                  {result.split('\n\n').map((section, index) => {
                    const [title, ...points] = section.split('\n')
                    return (
                      <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-purple-500/20 transition-all duration-300 group relative overflow-hidden">
                        {/* 카드 배경 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <span className="text-sm font-bold text-purple-400">{index + 1}</span>
                            </div>
                            <h3 className="text-base font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">{title}</h3>
                          </div>
                          <ul className="space-y-2 text-sm">
                            {points.map((point, pointIndex) => {
                              // 참여자별 발언 섹션인 경우 특별한 스타일 적용
                              if (title === '2. 참여자별 발언') {
                                const [name, ...content] = point.trim().replace(/^-\s*/, '').split(':')
                                return (
                                  <li key={pointIndex} className="flex items-start gap-3 text-white/80 group/item">
                                    <div className="relative">
                                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                                        <span className="text-sm font-bold text-purple-400">{name[0]}</span>
                                      </div>
                                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-semibold text-purple-400 group-hover/item:text-pink-400 transition-colors duration-300">{name}</div>
                                      <div className="text-white/80 group-hover/item:text-white transition-colors duration-300">{content.join(':')}</div>
                                    </div>
                                  </li>
                                )
                              }
                              // 주요 내용 섹션의 경우 주요 단어 강조
                              if (title === '1. 주요 내용') {
                                const text = point.trim().replace(/^-\s*/, '')
                                const words = text.split(' ')
                                return (
                                  <li key={pointIndex} className="flex items-start gap-3 text-white/80 group/item">
                                    <span className="text-purple-400 mt-1 group-hover/item:text-pink-400 transition-colors duration-300">•</span>
                                    <span className="group-hover/item:text-white transition-colors duration-300">
                                      {words.map((word, wordIndex) => (
                                        <span key={wordIndex} className={word.length > 3 ? 'font-medium text-purple-300' : ''}>
                                          {word}{' '}
                                        </span>
                                      ))}
                                    </span>
                                  </li>
                                )
                              }
                              // 다음 단계 섹션의 경우 타임라인 형태로 표시
                              if (title === '4. 다음 단계') {
                                const [date, content] = point.trim().replace(/^-\s*/, '').split(':')
                                return (
                                  <li key={pointIndex} className="flex items-start gap-4 text-white/80 group/item relative">
                                    <div className="relative">
                                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                                        <span className="text-sm font-bold text-purple-400">•</span>
                                      </div>
                                      <div className="absolute left-1/2 top-6 w-0.5 h-full bg-gradient-to-b from-purple-500/20 to-pink-500/20"></div>
                                    </div>
                                    <div className="flex-1 pb-6">
                                      <div className="font-semibold text-purple-400 group-hover/item:text-pink-400 transition-colors duration-300">{date}</div>
                                      <div className="text-white/80 group-hover/item:text-white transition-colors duration-300">{content}</div>
                                    </div>
                                  </li>
                                )
                              }
                              return (
                                <li key={pointIndex} className="flex items-start gap-3 text-white/80 group/item">
                                  <span className="text-purple-400 mt-1 group-hover/item:text-pink-400 transition-colors duration-300">•</span>
                                  <span className="group-hover/item:text-white transition-colors duration-300">{point.trim().replace(/^-\s*/, '')}</span>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-white/60 group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="group-hover:text-white transition-colors duration-300">요약 완료</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60 group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="group-hover:text-white transition-colors duration-300">AI 분석 완료</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 