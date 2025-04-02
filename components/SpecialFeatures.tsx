'use client'

import React from 'react'
import { Section, SectionContainer, SectionTitle } from '@/components/ui/Section'
import { Card } from '@/components/ui/card'

export default function SpecialFeatures() {
  const features = [
    {
      title: '최신 대규모 언어 모델(LLM)으로 99% 정확도 보장',
      type: 'progress',
      progressValue: 95,
    },
    {
      title: '맥락 이해 기반 다양한 스타일의 답장 제안',
      type: 'tags',
      tags: ['정중한 답장', '친근한 답장', '간결한 답장'],
    },
    {
      title: 'AI 기반 대화 컨텍스트 이해와 인사이트 생성',
      type: 'text',
      description: '자연어 처리 기술로 대화 흐름을 분석하고 상황에 가장 적합한 답변 옵션을 제공하여 원활한 커뮤니케이션을 도와줍니다.',
    }
  ]

  return (
    <section className="apple-section">
      <div className="apple-section-container">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="apple-section-title">✨ summy만의 차별점</h2>
        </div>
        
        <div className="apple-card">
          <div className="apple-card-content space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="apple-card bg-white-opacity-01 apple-card-content">
                <h3 className="text-base sm:text-lg font-medium mb-3">{feature.title}</h3>
                
                {feature.type === 'progress' && (
                  <div className="apple-progress-bar">
                    <div 
                      className="apple-progress-fill" 
                      style={{ width: `${feature.progressValue}%` }}
                    ></div>
                  </div>
                )}
                
                {feature.type === 'tags' && feature.tags && (
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="apple-tag">{tag}</span>
                    ))}
                  </div>
                )}
                
                {feature.type === 'text' && (
                  <p className="text-sm text-white/60">{feature.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 