import React from 'react'
import { ActionButtonsProps } from '../types'

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isSummarizing,
  isSuggesting,
  onSummarize,
  onSuggestResponse
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
      <button
        onClick={onSummarize}
        disabled={isSummarizing}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none w-full sm:w-auto whitespace-nowrap text-white relative group overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <span className="hidden sm:inline">✨</span>
          {isSummarizing ? '요약 분석 중...' : '대화 요약하기'}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-mint-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
      <button
        onClick={onSuggestResponse}
        disabled={isSuggesting}
        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none w-full sm:w-auto whitespace-nowrap text-white relative group overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <span className="hidden sm:inline">💬</span>
          {isSuggesting ? '답변 생성 중...' : '맞춤 답변 제안받기'}
        </span>
        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
    </div>
  )
} 