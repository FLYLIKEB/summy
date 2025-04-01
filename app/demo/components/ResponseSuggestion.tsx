// 필요한 의존성 모듈 import
import React from 'react'
import { Card } from './common/Card'
import { Icon } from './common/Icon'
import { Button } from './common/Button'
import { RESPONSE_STYLES, RESPONSE_REASONS } from '../constants'
import { ResponseStyle } from '../types'

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
  onToggleReason
}) => {
  return (
    // 메인 카드 컨테이너
    <Card className="mt-8 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-white/10 relative overflow-hidden">
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 animate-gradient"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="relative">
        {/* 헤더 섹션: 제목과 복사 버튼 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* 아이콘과 제목 */}
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 animate-pulse">
                <Icon name="response" className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">답변 제안</h2>
                <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300">AI 제안</span>
              </div>
              <p className="text-sm text-white/60 mt-1">회의 내용을 바탕으로 적절한 답변을 제안합니다</p>
            </div>
          </div>
          {/* 복사 버튼 */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigator.clipboard.writeText(editedResponse)}
              className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors flex items-center gap-2"
            >
              <Icon name="copy" className="w-4 h-4" />
              복사
            </Button>
          </div>
        </div>

        {/* 답변 스타일 선택 섹션 */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-white/60">답변 스타일:</span>
          <div className="flex gap-2">
            {(Object.keys(RESPONSE_STYLES) as ResponseStyle[]).map((style) => (
              <Button
                key={style}
                variant="ghost"
                onClick={() => onStyleSelect(style)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedStyle === style
                    ? 'bg-purple-500/30 text-purple-300'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {RESPONSE_STYLES[style].label}
              </Button>
            ))}
          </div>
        </div>

        {/* 답변 내용 섹션 */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
          {isEditing ? (
            // 편집 모드
            <div className="space-y-4">
              <textarea
                value={editedResponse}
                onChange={(e) => onUpdateResponse(e.target.value)}
                className="w-full h-32 bg-white/5 rounded-lg p-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={onCancelEditing}
                  className="px-4 py-2 bg-white/5 text-white/60 rounded-lg hover:bg-white/10 transition-colors"
                >
                  취소
                </Button>
                <Button
                  variant="primary"
                  onClick={onSaveResponse}
                  className="px-4 py-2 bg-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-500/40 transition-colors"
                >
                  저장
                </Button>
              </div>
            </div>
          ) : (
            // 보기 모드
            <div className="relative group">
              <div className="text-white/80 whitespace-pre-line">{editedResponse}</div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={onEdit}
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Icon name="edit" className="w-4 h-4 text-white/60" />
                </Button>
              </div>
              {/* 답변 작성 이유 섹션 */}
              {showReason && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/5">
                  <h4 className="text-sm font-medium text-purple-300 mb-2">답변 작성 이유</h4>
                  <div className="text-sm text-white/60 space-y-2">
                    {RESPONSE_REASONS[selectedStyle].map((reason, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Icon name="info" className="w-4 h-4 text-purple-400 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 푸터 섹션 */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 text-white/60 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon name="response" className="w-4 h-4 text-purple-400" />
              </div>
              <span className="group-hover:text-white transition-colors duration-300">AI 답변 제안</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}