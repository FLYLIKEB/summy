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
      title: '멀티 플랫폼 지원',
      description: '모바일, 테블릿, 데스크탑 모두 최적화된 경험을 제공합니다.'
    },
    {
      icon: <span className="text-4xl">🎯</span>,
      title: '맞춤형 요약',
      description: '사용자가 원하는 키워드와 주제를 중심으로 맞춤형 요약을 제공합니다.'
    },
    {
      icon: <span className="text-4xl">🌍</span>,
      title: '다국어 지원',
      description: '한국어, 영어는 물론 다양한 언어로 요약을 제공합니다.'
    },
    {
      icon: <span className="text-4xl">⚡</span>,
      title: '실시간 처리',
      description: '대용량 대화도 즉시 처리하여 빠른 결과를 제공합니다.'
    },
    {
      icon: <span className="text-4xl">🔍</span>,
      title: '키워드 추출',
      description: '중요 키워드를 자동으로 추출하여 핵심 내용을 한눈에 파악할 수 있습니다.'
    },
    {
      icon: <span className="text-4xl">🔒</span>,
      title: '안전한 데이터 관리',
      description: '모든 대화 내용은 암호화되어 안전하게 처리됩니다.'
    }
  ]

  return (
    <section className="apple-section bg-[#1a1a1f]">
      <div className="apple-section-container">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="apple-section-title">주요 기능</h2>
          <p className="apple-section-description">
            대화 요약부터 키워드 추출까지, 효율적인 커뮤니케이션을 위한 모든 기능
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
                    <div className="bg-white/[0.04] p-2.5 rounded-lg">
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
                  <div className="bg-white/[0.04] p-2.5 rounded-lg inline-block mb-3">
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