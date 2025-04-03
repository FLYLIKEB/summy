'use client'

import React, { useState, useEffect } from 'react'
import { Slack, MessageCircle, Upload, FileText, RefreshCw } from 'lucide-react'
import { useFileUpload } from '@/app/demo/hooks/useFileUpload'
import { useSummarize } from '@/app/demo/hooks/useSummarize'
import { useResponse } from '@/app/demo/hooks/useResponse'
import { SummaryResult } from '@/app/demo/components/SummaryResult'
import { ResponseSuggestion } from '@/app/demo/components/ResponseSuggestion'
import { ActionButtons } from '@/app/demo/components/ActionButtons'
import { FileUpload } from '@/app/demo/components/FileUpload'
import { motion } from 'framer-motion'

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
  const [step, setStep] = useState<'platform' | 'upload' | 'result'>(
    'platform'
  )

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
    setStep('result');
  }

  // 답변 제안 버튼 클릭 핸들러
  const handleSuggestResponseClick = () => {
    const content = uploadedFile || '';
    handleSuggestResponse(content);
    setStep('result');
  }

  // 플랫폼 선택 핸들러
  const handleSelectPlatform = (platformId: string) => {
    setSelectedPlatform(platformId);
    setStep('upload');
  }

  // 새로 시작하기 
  const handleRestart = () => {
    setSelectedPlatform(null);
    resetFileUpload();
    setStep('platform');
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-medium mb-3">새로운 대화 요약</h1>
        <p className="text-white/60 max-w-2xl">
          대화 내용을 업로드하고 AI로 스마트하게 요약하세요. 중요한 포인트를 빠르게 파악하고 맞춤형 답변까지 제안받을 수 있습니다.
        </p>
      </div>

      {/* 진행 단계 표시 */}
      <div className="flex items-center gap-2 mb-8">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'platform' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70'}`}>
          1
        </div>
        <div className={`h-0.5 flex-1 ${step === 'platform' ? 'bg-white/10' : 'bg-blue-500/70'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'upload' ? 'bg-blue-500 text-white' : step === 'result' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70'}`}>
          2
        </div>
        <div className={`h-0.5 flex-1 ${step === 'result' ? 'bg-blue-500/70' : 'bg-white/10'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'result' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70'}`}>
          3
        </div>
      </div>

      {/* 플랫폼 선택 */}
      {step === 'platform' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8"
        >
          <h2 className="col-span-full text-xl font-medium mb-3">플랫폼 선택</h2>
          {platforms.map((platform) => (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              key={platform.id}
              onClick={() => handleSelectPlatform(platform.id)}
              className="apple-card interactive-card p-6 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="apple-icon-container">
                  <platform.icon className="w-6 h-6 text-high-contrast" />
                </div>
                <div>
                  <h3 className="font-medium text-lg text-high-contrast">{platform.name}</h3>
                  <p className="text-sm text-medium-contrast mt-1">
                    {platform.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* 파일 업로드 */}
      {step === 'upload' && selectedPlatform && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">파일 업로드</h2>
            <button 
              onClick={() => setStep('platform')}
              className="text-medium-contrast hover:text-high-contrast text-sm transition-all"
            >
              이전 단계
            </button>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            handleSummarizeClick();
          }} className="space-y-8">
            <div className="apple-card p-6">
              <FileUpload
                onFileChange={setFile}
                className="animate-fade-in-up"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
              <ActionButtons
                isSummarizing={isSummarizing}
                isSuggesting={isSuggesting}
                onSummarize={handleSummarizeClick}
                onSuggestResponse={handleSuggestResponseClick}
              />
            </div>
          </form>
        </motion.div>
      )}

      {/* 결과 화면 */}
      {step === 'result' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">분석 결과</h2>
            <button
              onClick={handleRestart}
              className="apple-button apple-button-secondary rounded-lg"
            >
              <RefreshCw className="w-4 h-4" />
              <span>새로 시작하기</span>
            </button>
          </div>

          {/* 로딩 상태 */}
          {(isSummarizing || isSuggesting) && (
            <div className="apple-card p-8 text-center">
              <div className="inline-block p-3 rounded-full bg-white-opacity-05 mb-4">
                <div className="animate-spin w-8 h-8 rounded-full border-2 border-white-opacity-10 border-t-white"></div>
              </div>
              <h3 className="text-lg font-medium mb-2">
                {isSummarizing ? '대화 요약 중...' : '맞춤 답변 생성 중...'}
              </h3>
              <p className="text-medium-contrast">
                {isSummarizing 
                  ? '대화를 분석하고 중요한 내용을 추출하고 있습니다.' 
                  : '상황에 맞는 최적의 답변을 준비하고 있습니다.'}
              </p>
            </div>
          )}

          {/* 답변 제안 결과 */}
          {suggestedResponse && !isSuggesting && (
            <div className="apple-card overflow-hidden">
              <div className="p-4 border-b border-white-opacity-04">
                <h3 className="text-lg font-medium">맞춤형 답변 제안</h3>
              </div>
              <div className="p-6">
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
              </div>
            </div>
          )}

          {/* 요약 결과 */}
          {result && !isSummarizing && (
            <div className="apple-card overflow-hidden">
              <div className="p-4 border-b border-white-opacity-04">
                <h3 className="text-lg font-medium">대화 요약</h3>
              </div>
              <div className="p-6">
                <SummaryResult result={result} />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
} 