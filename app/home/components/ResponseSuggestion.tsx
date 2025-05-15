// 필요한 의존성 모듈 import
import React from 'react'
import { Card } from '@/components/common/card'
import { Icon } from './common/Icon'
import { Button } from '@/components/common/Button'
import { RESPONSE_STYLES, RESPONSE_REASONS } from '../constants'
import { ResponseStyle } from '../types'

const styleLabels: Record<ResponseStyle, { label: string; description: string }> = {
  formal: {
    label: '🎩 정중한',
    description: '공손하고 격식있는 어조로 작성된 답변'
  },
  friendly: {
    label: '😊 친근한',
    description: '편안하고 친근한 어조로 작성된 답변'
  },
  concise: {
    label: '⚡ 간결한',
    description: '짧고 핵심적인 내용만 담은 답변'
  }
}

// 컴포넌트 Props 타입 정의
interface ResponseSuggestionProps {
  isEditing: boolean                                  // 편집 모드 여부
  editedResponse: string                              // 편집된 답변 내용
  selectedStyle: ResponseStyle                        // 선택된 답변 스타일
  onStyleSelect: (style: ResponseStyle) => void       // 스타일 선택 핸들러
  onEdit: () => void                                 // 편집 모드 전환 핸들러
  onUpdateResponse: (response: string) => void        // 답변 내용 업데이트 핸들러
  onCancelEditing: () => void                        // 편집 취소 핸들러
  onSaveResponse: () => void                         // 답변 저장 핸들러
  showReason: boolean                                // 답변 작성 이유 표시 여부
  onToggleReason: () => void                        // 답변 작성 이유 토글 핸들러
  responseReasons?: string[]                         // 답변 작성 이유 목록
  userName?: string                                 // 사용자 이름
}

// 답변 제안 컴포넌트
export const ResponseSuggestion: React.FC<ResponseSuggestionProps> = ({
  isEditing,
  editedResponse,
  selectedStyle,
  onStyleSelect,
  onEdit,
  onUpdateResponse,
  onCancelEditing,
  onSaveResponse,
  showReason,
  onToggleReason,
  responseReasons,
  userName = "지우"
}) => {
  return (
    <div className="animate-fade-in-up py-8">
      {/* 메인 카드 컨테이너 */}
      <Card className="mt-8 apple-card border-white/10 relative overflow-hidden">
        <div className="relative p-4 sm:p-6">
          {/* 헤더 섹션: 제목과 복사 버튼 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6">
            <div className="flex items-center gap-4">
              {/* 아이콘과 제목 */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c2c30] flex items-center justify-center">
                <span className="text-lg">💬</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-medium">답변 제안</h2>
                  <span className="px-2 py-1 text-xs font-medium bg-[#2c2c30] rounded-full text-white/70">AI 제안</span>
                </div>
                <p className="text-sm text-white/60 mt-1">{userName}님을 위한 맞춤 답변을 제안합니다</p>
              </div>
            </div>
            {/* 복사 버튼 */}
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigator.clipboard.writeText(editedResponse)}
                className="apple-button apple-button-primary !px-3 !py-1.5 flex items-center gap-1 rounded-full whitespace-nowrap"
              >
                <span className="text-base">📋</span>
                <span className="text-sm inline-block">복사</span>
              </Button>
            </div>
          </div>

          {/* 답변 스타일 선택 섹션 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
            <span className="text-sm text-white/60">답변 스타일:</span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(RESPONSE_STYLES) as ResponseStyle[]).map((style) => (
                <Button
                  key={style}
                  variant={selectedStyle === style ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => onStyleSelect(style)}
                  className={selectedStyle === style ? "apple-button apple-button-primary" : "apple-button apple-button-secondary"}
                >
                  {RESPONSE_STYLES[style].label}
                </Button>
              ))}
            </div>
          </div>

          {/* 답변 내용 및 이유 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 답변 내용 섹션 */}
            <div className="md:col-span-2 bg-[#1c1c1e] rounded-xl p-4 sm:p-6 border border-white/10">
              <h4 className="text-sm font-medium text-white mb-3">{userName}님의 답변</h4>
              {isEditing ? (
                // 편집 모드
                <div className="space-y-4">
                  <textarea
                    value={editedResponse}
                    onChange={(e) => onUpdateResponse(e.target.value)}
                    className="w-full h-32 sm:h-40 bg-[#2c2c30] rounded-lg p-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3] resize-none text-sm sm:text-base"
                  />
                  <div className="flex flex-col sm:flex-row justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onCancelEditing}
                      className="apple-button apple-button-secondary"
                    >
                      취소
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={onSaveResponse}
                      className="apple-button apple-button-primary"
                    >
                      저장
                    </Button>
                  </div>
                </div>
              ) : (
                // 보기 모드
                <div className="relative">
                  <div className="text-white/80 whitespace-pre-line text-sm sm:text-base mb-4">{editedResponse}</div>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onEdit}
                      className="apple-button apple-button-secondary px-2 flex items-center justify-center"
                    >
                      <span className="text-base">✏️</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* 답변 작성 이유 섹션 */}
            <div className="md:col-span-1 bg-[#1c1c1e] rounded-xl p-4 sm:p-6 border border-white/10">
              <h4 className="text-sm font-medium text-white mb-3">답변 작성 이유</h4>
              <div className="text-sm text-white/70 space-y-2">
                {(responseReasons || RESPONSE_REASONS[selectedStyle]).map((reason, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-base text-[#0071e3] mt-0.5 flex-shrink-0">💡</span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 푸터 섹션 */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center text-sm">
              <div className="flex items-center gap-3 text-white/60">
                <div className="w-8 h-8 rounded-lg bg-[#2c2c30] flex items-center justify-center">
                  <span className="text-base">💬</span>
                </div>
                <span>AI 답변 제안</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}