// 필요한 의존성 모듈 import
'use client'

import React, { useState, useEffect } from 'react'
import { useFileUpload } from './hooks/useFileUpload'
import { useSummarize } from './hooks/useSummarize'
import { useResponse } from './hooks/useResponse'
import { FileUpload } from './components/FileUpload'
import { TextInput } from './components/TextInput'
import { ActionButtons } from './components/ActionButtons'
import { SummaryResult } from './components/SummaryResult'
import { ResponseSuggestion } from './components/ResponseSuggestion'

// 데모 페이지 컴포넌트
export default function DemoPage() {
  // 사용자 입력 상태 관리
  const [input, setInput] = useState('')
  
  // 파일 업로드 관련 기능
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

  // 요약 기능 관련 상태와 핸들러
  const {
    isSummarizing,
    result,
    handleSummarize
  } = useSummarize();

  // 답변 제안 기능 관련 상태와 핸들러
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

  // 파일 업로드 시 입력값 업데이트
  useEffect(() => {
    if (uploadedFile) {
      setInput(uploadedFile);
    }
  }, [uploadedFile]);

  // 요약 버튼 클릭 핸들러
  const handleSummarizeClick = () => {
    if (!input.trim()) {
      alert('대화 내용을 입력해주세요.');
      return;
    }
    handleSummarize(input);
  }

  // 답변 제안 버튼 클릭 핸들러
  const handleSuggestResponseClick = () => {
    handleSuggestResponse(input);
  }

  return (
    // 메인 컨테이너
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* 페이지 헤더 */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              요약 체험하기
            </h1>
            <p className="text-sm sm:text-base opacity-80">
              실제 대화를 입력하거나 파일을 업로드하세요. AI가 요약해드립니다.
            </p>
          </div>

          {/* 파일 업로드 섹션 */}
          <FileUpload />

          {/* 구분선 */}
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

          {/* 텍스트 입력 섹션 */}
          <TextInput
            value={input}
            onChange={setInput}
            onResetFileUpload={resetFileUpload}
          />

          {/* 액션 버튼 섹션 */}
          <ActionButtons
            isSummarizing={isSummarizing}
            isSuggesting={isSuggesting}
            onSummarize={handleSummarizeClick}
            onSuggestResponse={handleSuggestResponseClick}
          />

          {/* 답변 제안 결과 섹션 */}
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

          {/* 요약 결과 섹션 */}
          {result && (
            <SummaryResult result={result} />
          )}
        </div>
      </div>
    </div>
  )
} 