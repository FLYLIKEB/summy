import React from 'react'
import { Card } from './common/Card'
import { Icon } from './common/Icon'
import { Button } from './common/Button'
import { RESPONSE_STYLES, RESPONSE_REASONS } from '../constants'
import { ResponseStyle } from '../types'

interface ResponseSuggestionProps {
  isEditing: boolean
  editedResponse: string
  selectedStyle: ResponseStyle
  onStyleSelect: (style: ResponseStyle) => void
  onEdit: () => void
  onUpdateResponse: (response: string) => void
  onCancelEditing: () => void
  onSaveResponse: () => void
  showReason: boolean
  onToggleReason: () => void
}

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
    <Card className="mt-8 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-lg border border-white/10 relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 animate-gradient"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 animate-pulse">
                <Icon name="response" className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text animate-gradient">답변 제안</h2>
                <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full text-blue-300">AI 제안</span>
              </div>
              <p className="text-sm text-white/60 mt-1">회의 내용을 바탕으로 적절한 답변을 제안합니다</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigator.clipboard.writeText(editedResponse)}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2"
            >
              <Icon name="copy" className="w-4 h-4" />
              복사
            </Button>
          </div>
        </div>

        {/* 스타일 선택 */}
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
                    ? 'bg-blue-500/30 text-blue-300'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {RESPONSE_STYLES[style].label}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-blue-500/20 transition-all duration-300">
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={editedResponse}
                onChange={(e) => onUpdateResponse(e.target.value)}
                className="w-full h-32 bg-white/5 rounded-lg p-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
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
                  className="px-4 py-2 bg-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/40 transition-colors"
                >
                  저장
                </Button>
              </div>
            </div>
          ) : (
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
              {showReason && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/5">
                  <h4 className="text-sm font-medium text-blue-300 mb-2">답변 작성 이유</h4>
                  <div className="text-sm text-white/60 space-y-2">
                    {RESPONSE_REASONS[selectedStyle].map((reason, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Icon name="info" className="w-4 h-4 text-blue-400 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 text-white/60 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon name="response" className="w-4 h-4 text-blue-400" />
              </div>
              <span className="group-hover:text-white transition-colors duration-300">AI 답변 제안</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
} 