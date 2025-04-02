'use client'

import React, { useState, useEffect } from 'react'
import { Slack, MessageCircle } from 'lucide-react'
import { useFileUpload } from '@/app/demo/hooks/useFileUpload'
import { useSummarize } from '@/app/demo/hooks/useSummarize'
import { useResponse } from '@/app/demo/hooks/useResponse'
import { SummaryResult } from '@/app/demo/components/SummaryResult'
import { ResponseSuggestion } from '@/app/demo/components/ResponseSuggestion'
import { ActionButtons } from '@/app/demo/components/ActionButtons'
import { FileUpload } from '@/app/demo/components/FileUpload'

const platforms = [
  {
    id: 'slack',
    name: 'Slack',
    icon: Slack,
    description: 'Slack 채널이나 DM 대화를 요약합니다.',
  },
  {
    id: 'kakao',
    name: 'KakaoTalk',
    icon: MessageCircle,
    description: '카카오톡 채팅방 대화를 요약합니다.',
  },
]

export default function NewSummaryPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  // 파일 업로드 관련 기능
  const {
    uploadedFile,
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
      console.log('uploadedFile 변경:', uploadedFile);
    }
  }, [uploadedFile]);

  // 요약 버튼 클릭 핸들러
  const handleSummarizeClick = () => {
    const content = uploadedFile || '';
    handleSummarize(content);
  }

  // 답변 제안 버튼 클릭 핸들러
  const handleSuggestResponseClick = () => {
    const content = uploadedFile || '';
    handleSuggestResponse(content);
  }

  return (
    <div className="min-h-screen bg-apple-dark text-white">
      <div className="section-container py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">새로운 대화 요약</h1>
          <p className="text-gray-400">
            대화 내용을 업로드하고 AI로 스마트하게 요약하세요
          </p>
        </div>

        {/* 플랫폼 선택 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`p-6 rounded-2xl border ${
                selectedPlatform === platform.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-white/10 hover:border-white/20 bg-white/5'
              } transition-colors text-left`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5">
                  <platform.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{platform.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {platform.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 파일 업로드 */}
        {selectedPlatform && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSummarizeClick();
          }} className="space-y-6">
            <FileUpload
              onFileChange={setFile}
              className="animate-fade-in-up"
            />

            <div className="flex justify-center gap-4">
              <ActionButtons
                isSummarizing={isSummarizing}
                isSuggesting={isSuggesting}
                onSummarize={handleSummarizeClick}
                onSuggestResponse={handleSuggestResponseClick}
              />
            </div>
          </form>
        )}

        {/* 답변 제안 결과 */}
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

        {/* 요약 결과 */}
        {result && <SummaryResult result={result} />}
      </div>
    </div>
  )
} 