import React from 'react'
import { Card } from '@/components/ui/card'

export default function SpecialFeatures() {
  return (
    <section>
      <div className="section-container">
        <h2 className="section-title">
          ✨ summy의 특별한 점
        </h2>
        <Card variant="glass" hover className="p-6">
          <div className="space-y-6">
            <Card variant="default" padding="sm" className="p-4">
              <h3 className="font-bold mb-2">AI 기반 요약으로 높은 정확도</h3>
              <div className="progress-bar">
                <div className="progress-fill bg-purple-400" style={{ width: '95%' }}></div>
              </div>
            </Card>
            <Card variant="default" padding="sm" className="p-4">
              <h3 className="font-bold mb-2">문맥과 목적에 따라 요약 방식 선택 가능</h3>
              <div className="flex flex-wrap gap-2">
                <span className="tag">간단 요약</span>
                <span className="tag">요점 정리</span>
                <span className="tag">키워드 추출</span>
              </div>
            </Card>
            <Card variant="default" padding="sm" className="p-4">
              <h3 className="font-bold mb-2">요약본에 코멘트와 인사이트 추가도 가능</h3>
              <p className="text-base opacity-90">
                AI가 제안하는 인사이트와 상황에 맞는 답변을 통해 더 깊이 있는 이해와 효과적인 소통이 가능합니다.
              </p>
            </Card>
          </div>
        </Card>
      </div>
    </section>
  )
} 