'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionContainer, SectionTitle } from './ui/Section'
import { Card } from './ui/card'
import { ArrowRight } from 'lucide-react'

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
}

/**
 * 주요 기능 섹션 컴포넌트
 * 
 * 서비스의 핵심 기능과 제공 가치를 사용자에게 명확하게 전달하는 섹션입니다.
 * 반응형 그리드 레이아웃으로 구성되어 있으며, 각 기능은 아이콘, 제목, 설명으로 구성됩니다.
 */
export default function Features() {
  // 기능 데이터 배열
  const features: FeatureProps[] = [
    {
      icon: <span className="text-4xl">💻</span>,
      title: '어디서나 접근 가능',
      description: '웹, 모바일, 데스크톱에서 언제 어디서나 대화 요약을 확인하세요.'
    },
    {
      icon: <span className="text-4xl">🎯</span>,
      title: '목적별 맞춤 요약',
      description: '비즈니스, 학습, 개인 대화 등 상황에 맞는 맞춤형 요약을 제공합니다.'
    },
    {
      icon: <span className="text-4xl">🌍</span>,
      title: '다국어 커뮤니케이션',
      description: '한국어는 물론 영어, 일본어, 중국어 등 10개 이상의 언어를 지원합니다.'
    },
    {
      icon: <span className="text-4xl">⚡</span>,
      title: '초고속 AI 처리',
      description: '1,000개 이상의 메시지도 단 몇 초 내에 분석하고 요약합니다.'
    },
    {
      icon: <span className="text-4xl">🔍</span>,
      title: '인사이트 추출',
      description: '중요 키워드, 결정사항, 할 일 등을 자동으로 분류하여 제공합니다.'
    },
    {
      icon: <span className="text-4xl">💬</span>,
      title: '맞춤형 답장 제안',
      description: '대화 맥락과 상황을 분석해 가장 적절한 답변을 여러 스타일로 제안합니다.'
    },
    {
      icon: <span className="text-4xl">🔒</span>,
      title: '엔터프라이즈급 보안',
      description: '군사급 암호화와 데이터 보호 정책으로 모든 대화를 안전하게 보호합니다.'
    }
  ]

  return (
    <section className="apple-section">
      <div className="apple-section-container">
        <div className="text-center mb-10">
          <h2 
            className="apple-section-title cursor-pointer" 
            onClick={() => {
              const featuresSection = document.getElementById('features')
              if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            title="주요 기능 섹션으로 이동"
          >
            주요 기능
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
            대화를 더 스마트하게 관리하는 Summy의 핵심 기능
          </p>
        </div>
        
        {/* 모바일 뷰: 슬라이드 레이아웃 */}
        <div className="md:hidden flex flex-col gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="apple-card apple-card-hover">
                <div className="apple-card-content">
                  <div className="flex gap-3 items-start">
                    <div className="bg-white-opacity-04 p-2.5 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm text-white/60">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 데스크탑 뷰: 그리드 레이아웃 */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="apple-card apple-card-hover h-full">
                <div className="apple-card-content flex flex-col h-full">
                  <div className="bg-white-opacity-04 p-2.5 rounded-lg inline-block mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 