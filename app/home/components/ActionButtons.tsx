import React from 'react'
import { ActionButtonsProps } from '../types'

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isSummarizing,
  isSuggesting,
  onSummarize,
  onSuggestResponse
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto">
      <button
        onClick={onSummarize}
        disabled={isSummarizing}
        className="apple-button apple-button-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="flex items-center justify-center gap-2 text-sm font-medium">
          {isSummarizing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              요약 분석 중...
            </>
          ) : (
            <>
              <span className="hidden sm:inline">✨</span>
              대화 요약하기
            </>
          )}
        </span>
      </button>
      <button
        onClick={onSuggestResponse}
        disabled={isSuggesting}
        className="apple-button apple-button-secondary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="flex items-center justify-center gap-2 text-sm font-medium">
          {isSuggesting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              답변 생성 중...
            </>
          ) : (
            <>
              <span className="hidden sm:inline">💬</span>
              맞춤 답변 제안받기
            </>
          )}
        </span>
      </button>
    </div>
  )
} 