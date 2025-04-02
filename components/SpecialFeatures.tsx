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
    <Section>
      <SectionContainer size="medium">
        <SectionTitle 
          title="✨ summy의 특별한 점"
          centered={true}
        />
        
        <Card variant="glass" hover padding="lg">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <Card key={index} variant="default" padding="sm">
                <h3 className="font-bold mb-2">{feature.title}</h3>
                
                {feature.type === 'progress' && (
                  <div className="progress-bar">
                    <div 
                      className="progress-fill bg-purple-400" 
                      style={{ width: `${feature.progressValue}%` }}
                    ></div>
                  </div>
                )}
                
                {feature.type === 'tags' && feature.tags && (
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
                
                {feature.type === 'text' && (
                  <p className="text-base opacity-90">{feature.description}</p>
                )}
              </Card>
            ))}
          </div>
        </Card>
      </SectionContainer>
    </Section>
  )
} 