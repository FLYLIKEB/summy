import React from 'react'
import { Button } from './common/Button'

interface ActionButtonsProps {
  isSummarizing: boolean
  isSuggesting: boolean
  onSummarize: () => void
  onSuggestResponse: () => void
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isSummarizing,
  isSuggesting,
  onSummarize,
  onSuggestResponse
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <Button
        variant="primary"
        gradient
        isLoading={isSummarizing}
        onClick={onSummarize}
        disabled={isSummarizing}
        className="w-full sm:w-auto"
      >
        요약하기
      </Button>
      <Button
        variant="secondary"
        isLoading={isSuggesting}
        onClick={onSuggestResponse}
        disabled={isSuggesting}
        className="w-full sm:w-auto"
      >
        답변 제안
      </Button>
    </div>
  )
} 