'use client'

import React from 'react'
import { Section, SectionContainer, SectionTitle } from '@/components/ui/Section'
import { Card } from '@/components/ui/card'

export default function SpecialFeatures() {
  const features = [
    {
      title: 'AI 기반 요약으로 높은 정확도',
      type: 'progress',
      progressValue: 95,
    },
    {
      title: '문맥과 목적에 따라 요약 방식 선택 가능',
      type: 'tags',
      tags: ['간단 요약', '요점 정리', '키워드 추출'],
    },
    {
      title: '요약본에 코멘트와 인사이트 추가도 가능',
      type: 'text',
      description: 'AI가 제안하는 인사이트와 상황에 맞는 답변을 통해 더 깊이 있는 이해와 효과적인 소통이 가능합니다.',
    }
  ]

  return (
    <section className="apple-section bg-[#1a1a1f]">
      <div className="apple-section-container">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="apple-section-title">✨ summy의 특별한 점</h2>
        </div>
        
        <div className="apple-card">
          <div className="apple-card-content space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="apple-card bg-white/[0.01] apple-card-content">
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