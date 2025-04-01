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
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none w-full sm:w-auto whitespace-nowrap"
      >
        {isSummarizing ? '요약 중...' : '요약하기'}
      </button>
      <button
        onClick={onSuggestResponse}
        disabled={isSuggesting}
        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none w-full sm:w-auto whitespace-nowrap"
      >
        {isSuggesting ? '제안 중...' : '답변 제안'}
      </button>
    </div>
  )
} 