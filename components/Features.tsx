'use client'

import React from 'react'
import { motion } from 'framer-motion'

const features = [
  {
    title: '다양한 플랫폼 지원',
    description: 'Slack, Teams, Zoom, 이메일 등 주요 커뮤니케이션 도구와 연동',
    shortDesc: '주요 메신저와 연동', 
    icon: '🔄'
  },
  {
    title: '맞춤형 요약',
    description: '핵심 주제, 주요 결정사항, 할 일 등 필요한 정보만 요약',
    shortDesc: '필요한 정보만 요약',
    icon: '✂️'
  },
  {
    title: '다국어 지원',
    description: '한국어, 영어, 일본어 등 다양한 언어로 대화 요약 가능',
    shortDesc: '다양한 언어 요약 가능',
    icon: '🌐'
  },
  {
    title: '실시간 처리',
    description: '긴 대화도 빠르게 요약해 즉시 확인 가능',
    shortDesc: '빠른 요약 처리',
    icon: '⚡'
  },
  {
    title: '주요 키워드 추출',
    description: '대화의 핵심 키워드를 자동으로 추출하여 제공',
    shortDesc: '핵심 키워드 추출',
    icon: '🔍'
  },
  {
    title: '안전한 데이터 관리',
    description: '모든 대화 내용은 암호화되어 안전하게 보관',
    shortDesc: '암호화된 데이터 보관',
    icon: '🔒'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Features() {
  return (
    <section className="section-padding bg-gradient-to-b from-black to-gray-900">
      <div className="container-padding content-wide">
        <div className="text-center component-spacing">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">주요 기능</h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Summy의 스마트한 기능으로 대화를 효율적으로 관리하세요
          </p>
        </div>

        {/* 모바일용 슬라이드 형태의 그리드 */}
        <div className="sm:hidden overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-8">
          <div className="flex gap-4 w-max">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10 w-[210px] snap-center flex-shrink-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col h-full">
                  <div className="bg-white/10 rounded-lg p-2 w-fit mb-3">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.shortDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 데스크톱용 그리드 */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10 h-full animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col h-full">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/70 flex-grow">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 