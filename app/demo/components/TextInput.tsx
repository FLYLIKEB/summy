import React from 'react'
import { EXAMPLE_CONVERSATION } from '../constants'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  onResetFileUpload: () => void
}

export const TextInput: React.FC<TextInputProps> = ({ value, onChange, onResetFileUpload }) => {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          onResetFileUpload()
        }}
        placeholder={EXAMPLE_CONVERSATION}
        className="w-full h-48 sm:h-60 p-3 bg-white/[0.01] border border-white/[0.08] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 resize-none transition-all text-sm leading-relaxed"
      />
    </div>
  )
} 