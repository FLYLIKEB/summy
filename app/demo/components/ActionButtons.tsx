import React from 'react'
import { ActionButtonsProps } from '../types'

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isSummarizing,
  isSuggesting,
  onSummarize,
  onSuggestResponse
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button
        onClick={onSummarize}
        disabled={isSummarizing || isSuggesting}
        className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        {isSummarizing ? '요약 중...' : '요약하기'}
      </button>
      <button
        onClick={onSuggestResponse}
        disabled={isSummarizing || isSuggesting}
        className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        {isSuggesting ? '제안 중...' : '답변 제안'}
      </button>
    </div>
  )
} 