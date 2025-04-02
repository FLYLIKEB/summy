import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Icon } from './common/Icon'
import { DEFAULT_KEYWORDS } from '../constants'

interface SummaryResultProps {
  result: string
}

export const SummaryResult: React.FC<SummaryResultProps> = ({ result }) => {
  return (
    <div className="animate-fade-in-up py-8">
      <Card 
        variant="glass"
        hover
        padding="lg"
        className="mt-8 relative overflow-hidden bg-white/5 border-white/10"
      >
        {/* 배경 효과는 Card 컴포넌트에서 자동으로 처리 */}

        <div className="mb-8 flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-mint-500 flex items-center justify-center shadow-lg shadow-purple-500/20 animate-pulse">
              <Icon name="summary" className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-mint-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-mint-400 text-transparent bg-clip-text animate-gradient">요약 결과</h2>
              <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-mint-500/20 rounded-full text-purple-300">AI 분석</span>
            </div>
            <p className="text-sm text-white/60 mt-1">대화 내용을 분석하여 핵심 정보를 추출했습니다</p>
          </div>
        </div>
        
        {/* 통계 정보 섹션 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-mint-500/20 flex items-center justify-center">
                <Icon name="users" className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-white/60">참여자 수</div>
                <div className="text-lg font-semibold text-white">4명</div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-mint-500/20 flex items-center justify-center">
                <Icon name="clock" className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-white/60">회의 시간</div>
                <div className="text-lg font-semibold text-white">30분</div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-mint-500/20 flex items-center justify-center">
                <Icon name="tag" className="w-5 h-5 text-mint-400" />
              </div>
              <div>
                <div className="text-sm text-white/60">키워드</div>
                <div className="text-lg font-semibold text-white">3개</div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-mint-500/20 flex items-center justify-center">
                <Icon name="progress" className="w-5 h-5 text-mint-400" />
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
          {DEFAULT_KEYWORDS.map((keyword, index) => (
            <span 
              key={index} 
              className={`px-3 py-1 rounded-full ${index % 2 === 0 
                ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300' 
                : 'bg-gradient-to-r from-mint-500/20 to-mint-600/20 text-mint-300'} text-sm`
              }
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* 진행 상태 바 */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/60">프로젝트 진행률</span>
            <span className="text-mint-400">75%</span>
          </div>
          <div className="h-2 bg-white/5 backdrop-blur-sm rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-mint-500 rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>
          </div>
        </div>

        <div className="grid gap-6">
          {result.split('\n\n').map((section, index) => {
            const [title, ...points] = section.split('\n')
            return (
              <Card 
                key={index} 
                variant="default" 
                padding="md" 
                hover 
                className="group"
              >
                {/* 카드 내용 */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-mint-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-mint-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                              <span className="text-sm font-bold text-purple-400">{name[0]}</span>
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-mint-500/20 rounded-lg blur opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-purple-400 group-hover/item:text-mint-400 transition-colors duration-300">{name}</div>
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
                          <span className="text-purple-400 mt-1 group-hover/item:text-mint-400 transition-colors duration-300">•</span>
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
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/20 to-mint-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                              <span className="text-sm font-bold text-purple-400">•</span>
                            </div>
                            <div className="absolute left-1/2 top-6 w-0.5 h-full bg-gradient-to-b from-purple-500/20 to-mint-500/20"></div>
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="font-semibold text-purple-400 group-hover/item:text-mint-400 transition-colors duration-300">{date}</div>
                            <div className="text-white/80 group-hover/item:text-white transition-colors duration-300">{content}</div>
                          </div>
                        </li>
                      )
                    }
                    return (
                      <li key={pointIndex} className="flex items-start gap-3 text-white/80 group/item">
                        <span className="text-purple-400 mt-1 group-hover/item:text-mint-400 transition-colors duration-300">•</span>
                        <span className="group-hover/item:text-white transition-colors duration-300">{point.trim().replace(/^-\s*/, '')}</span>
                      </li>
                    )
                  })}
                </ul>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 text-white/60 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-mint-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon name="clock" className="w-4 h-4 text-purple-400" />
              </div>
              <span className="group-hover:text-white transition-colors duration-300">요약 완료</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 