'use client'

import React, { useState, useEffect } from 'react'
import { useFileUpload } from './hooks/useFileUpload'
import { useSummarize } from './hooks/useSummarize'
import { useResponse } from './hooks/useResponse'
import { Header } from './components/Header'
import { FileUpload } from './components/FileUpload'
import { TextInput } from './components/TextInput'
import { ActionButtons } from './components/ActionButtons'
import { SummaryResult } from './components/SummaryResult'
import { ResponseSuggestion } from './components/ResponseSuggestion'

export default function DemoPage() {
  const [input, setInput] = useState('')
  
  const {
    isDragging,
    uploadedFile,
    fileName,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    handleRemoveFile,
    resetFileUpload
  } = useFileUpload();

  const {
    isSummarizing,
    result,
    handleSummarize
  } = useSummarize();

  const {
    isSuggesting,
    suggestedResponse,
    selectedStyle,
    isEditing,
    editedResponse,
    showReason,
    handleSuggestResponse,
    handleCopyResponse,
    handleStyleChange,
    handleEditResponse,
    handleSaveResponse,
    toggleReason,
    updateEditedResponse,
    cancelEditing
  } = useResponse();

  useEffect(() => {
    if (uploadedFile) {
      setInput(uploadedFile);
    }
  }, [uploadedFile]);

  const handleSummarizeClick = () => {
    if (!input.trim()) {
      alert('대화 내용을 입력해주세요.');
      return;
    }
    handleSummarize(input);
  }

  const handleSuggestResponseClick = () => {
    handleSuggestResponse(input);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Header />

        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              요약 체험하기
            </h1>
            <p className="text-sm sm:text-base opacity-80">
              실제 대화를 입력하거나 파일을 업로드하세요. AI가 요약해드립니다.
            </p>
          </div>

          <FileUpload />

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-sm text-white/60 bg-gradient-to-b from-gray-900 to-black">
                또는
              </span>
            </div>
          </div>

          <TextInput
            value={input}
            onChange={setInput}
            onResetFileUpload={resetFileUpload}
          />

          <ActionButtons
            isSummarizing={isSummarizing}
            isSuggesting={isSuggesting}
            onSummarize={handleSummarizeClick}
            onSuggestResponse={handleSuggestResponseClick}
          />

          {suggestedResponse && (
            <ResponseSuggestion
              isEditing={isEditing}
              editedResponse={editedResponse}
              selectedStyle={selectedStyle}
              onStyleSelect={handleStyleChange}
              onEdit={handleEditResponse}
              onUpdateResponse={updateEditedResponse}
              onCancelEditing={cancelEditing}
              onSaveResponse={handleSaveResponse}
              showReason={showReason}
              onToggleReason={toggleReason}
            />
          )}

          {result && (
            <SummaryResult result={result} />
          )}
        </div>
      </div>
    </div>
  )
} 