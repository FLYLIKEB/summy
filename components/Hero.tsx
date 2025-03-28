import React from 'react'

export default function Hero() {
  return (
    <section className="min-h-[80vh] container mx-auto px-4 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-6xl font-bold mb-6">
          메신저 대화,<br />
          요약의 기술
        </h1>
        <p className="text-2xl mb-12 opacity-90">
          대화 읽기 귀찮을 땐, summy가 대신 요약해줄게요
        </p>
        <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
          AI가 대화 내용을 분석하여 핵심 내용을 요약하고, 
          상황에 맞는 답변을 추천해드려요.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-purple-700 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all">
            무료로 시작하기
          </button>
          <button className="px-8 py-4 bg-white bg-opacity-10 text-white rounded-full font-bold text-lg hover:bg-opacity-20 transition-all border border-white border-opacity-20">
            요약 체험하기
          </button>
        </div>
      </div>
    </section>
  )
} 