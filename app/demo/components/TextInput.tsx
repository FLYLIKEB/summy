import React from 'react'
import { EXAMPLE_CONVERSATION } from '../constants'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  onResetFileUpload: () => void
}

export const TextInput: React.FC<TextInputProps> = ({ value, onChange, onResetFileUpload }) => {
  return (
    <div className="mt-6">
      <textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          onResetFileUpload()
        }}
        placeholder={EXAMPLE_CONVERSATION}
        className="w-full h-64 p-4 bg-white/5 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
      />
    </div>
  )
} 