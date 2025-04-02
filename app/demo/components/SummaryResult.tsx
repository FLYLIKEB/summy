import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Icon } from './common/Icon'
import { DEFAULT_KEYWORDS } from '../constants'

interface SummaryResultProps {
  result: string
}

export const SummaryResult: React.FC<SummaryResultProps> = ({ result }) => {
  return (
    <div className="py-4 sm:py-6">
      <Card 
        variant="glass"
        padding="lg"
        className="bg-white/[0.02] border-white/[0.06] shadow-sm overflow-hidden"
      >
        <div className="mb-5 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.06] flex items-center justify-center">
              <Icon name="summary" className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-medium">요약 결과</h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">대화 내용에서 추출한 핵심 정보입니다</p>
            </div>
          </div>
        </div>
        
        {/* 통계 정보 섹션 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center">
                <Icon name="users" className="w-4 h-4 text-white/70" />
              </div>
              <div>
                <div className="text-xs text-white/50">참여자</div>
                <div className="text-base font-medium">4명</div>
              </div>
            </div>
          </div>
          <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center">
                <Icon name="clock" className="w-4 h-4 text-white/70" />
              </div>
              <div>
                <div className="text-xs text-white/50">시간</div>
                <div className="text-base font-medium">30분</div>
              </div>
            </div>
          </div>
          <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center">
                <Icon name="tag" className="w-4 h-4 text-white/70" />
              </div>
              <div>
                <div className="text-xs text-white/50">키워드</div>
                <div className="text-base font-medium">3개</div>
              </div>
            </div>
          </div>
          <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center">
                <Icon name="progress" className="w-4 h-4 text-white/70" />
              </div>
              <div>
                <div className="text-xs text-white/50">진행률</div>
                <div className="text-base font-medium">75%</div>
              </div>
            </div>
          </div>
        </div>

        {/* 키워드 태그 */}
        <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
          {DEFAULT_KEYWORDS.map((keyword, index) => (
            <span 
              key={index} 
              className="px-3 py-1 rounded-full text-xs bg-white/[0.04] text-white/70"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* 진행 상태 바 */}
        <div className="mb-5 sm:mb-6">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-white/50">프로젝트 진행률</span>
            <span className="text-white/80">75%</span>
          </div>
          <div className="h-1.5 bg-white/[0.02] rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-white/20 rounded-full"></div>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4">
          {result.split('\n\n').map((section, index) => {
            const [title, ...points] = section.split('\n')
            return (
              <Card 
                key={index} 
                variant="outline" 
                padding="md" 
                className="bg-white/[0.01] border-white/[0.04]"
              >
                {/* 카드 내용 */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-white/[0.04] flex items-center justify-center">
                    <span className="text-xs font-medium text-white/70">{index + 1}</span>
                  </div>
                  <h3 className="text-sm font-medium">{title}</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  {points.map((point, pointIndex) => {
                    return (
                      <li key={pointIndex} className="flex items-start gap-2 text-white/70">
                        <span className="text-white/40 mt-1">•</span>
                        <span>{point.trim().replace(/^-\s*/, '')}</span>
                      </li>
                    )
                  })}
                </ul>
              </Card>
            )
          })}
        </div>

        <div className="mt-5 sm:mt-6 pt-4 border-t border-white/[0.04]">
          <div className="flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/[0.04] flex items-center justify-center">
                <Icon name="clock" className="w-3 h-3 text-white/70" />
              </div>
              <span>방금 생성됨</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 