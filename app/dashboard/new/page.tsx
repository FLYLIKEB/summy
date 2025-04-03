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
import { ResponseStyle } from '@/app/demo/types'

// 플랫폼 정보 상수화
const PLATFORMS = [
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

// 단계 타입 정의
type Step = 'platform' | 'upload' | 'result';

/**
 * 플랫폼 선택 컴포넌트
 */
const PlatformSelection = ({ 
  onSelectPlatform 
}: { 
  onSelectPlatform: (platformId: string) => void 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8"
  >
    <h2 className="col-span-full text-xl font-medium mb-3">플랫폼 선택</h2>
    {PLATFORMS.map((platform) => (
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        key={platform.id}
        onClick={() => onSelectPlatform(platform.id)}
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
);

/**
 * 파일 업로드 컴포넌트 
 */
const UploadSection = ({
  onFileChange,
  onSummarize,
  onSuggestResponse,
  isSummarizing,
  isSuggesting,
  onBackClick
}: {
  onFileChange: (file: File | null) => void,
  onSummarize: () => void,
  onSuggestResponse: () => void,
  isSummarizing: boolean,
  isSuggesting: boolean,
  onBackClick: () => void
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-8"
  >
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-medium">파일 업로드</h2>
      <button 
        onClick={onBackClick}
        className="text-medium-contrast hover:text-high-contrast text-sm transition-all"
      >
        이전 단계
      </button>
    </div>

    <form onSubmit={(e) => {
      e.preventDefault();
      onSummarize();
    }} className="space-y-8">
      <div className="apple-card p-6">
        <FileUpload
          onFileChange={onFileChange}
          className="animate-fade-in-up"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
        <ActionButtons
          isSummarizing={isSummarizing}
          isSuggesting={isSuggesting}
          onSummarize={onSummarize}
          onSuggestResponse={onSuggestResponse}
        />
      </div>
    </form>
  </motion.div>
);

/**
 * 진행 단계 표시 컴포넌트
 */
const ProgressSteps = ({ currentStep }: { currentStep: Step }) => (
  <div className="flex items-center gap-2 mb-8">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'platform' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70'}`}>
      1
    </div>
    <div className={`h-0.5 flex-1 ${currentStep === 'platform' ? 'bg-white/10' : 'bg-blue-500/70'}`}></div>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'upload' ? 'bg-blue-500 text-white' : currentStep === 'result' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70'}`}>
      2
    </div>
    <div className={`h-0.5 flex-1 ${currentStep === 'result' ? 'bg-blue-500/70' : 'bg-white/10'}`}></div>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'result' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70'}`}>
      3
    </div>
  </div>
);

/**
 * 결과 화면 컴포넌트
 */
const ResultSection = ({
  onRestart,
  isSummarizing,
  isSuggesting,
  result,
  suggestedResponse,
  isEditing,
  editedResponse,
  selectedStyle,
  showReason,
  onStyleSelect,
  onEdit,
  onUpdateResponse,
  onCancelEditing,
  onSaveResponse,
  onToggleReason
}: {
  onRestart: () => void,
  isSummarizing: boolean,
  isSuggesting: boolean,
  result: any,
  suggestedResponse: any,
  isEditing: boolean,
  editedResponse: string,
  selectedStyle: ResponseStyle,
  showReason: boolean,
  onStyleSelect: (style: ResponseStyle) => void,
  onEdit: () => void,
  onUpdateResponse: (response: string) => void,
  onCancelEditing: () => void,
  onSaveResponse: () => void,
  onToggleReason: () => void
}) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-8"
  >
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-medium">분석 결과</h2>
      <button
        onClick={onRestart}
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
            onStyleSelect={onStyleSelect}
            onEdit={onEdit}
            onUpdateResponse={onUpdateResponse}
            onCancelEditing={onCancelEditing}
            onSaveResponse={onSaveResponse}
            showReason={showReason}
            onToggleReason={onToggleReason}
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
);

/**
 * 메인 페이지 컴포넌트 - 대화 요약 생성
 */
export default function NewSummaryPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [step, setStep] = useState<Step>('platform')

  // 파일 업로드 관련 기능
  const {
    uploadedFile,
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
      <ProgressSteps currentStep={step} />

      {/* 단계별 컨텐츠 */}
      {step === 'platform' && (
        <PlatformSelection onSelectPlatform={handleSelectPlatform} />
      )}

      {step === 'upload' && selectedPlatform && (
        <UploadSection
          onFileChange={setFile}
          onSummarize={handleSummarizeClick}
          onSuggestResponse={handleSuggestResponseClick}
          isSummarizing={isSummarizing}
          isSuggesting={isSuggesting}
          onBackClick={() => setStep('platform')}
        />
      )}

      {step === 'result' && (
        <ResultSection
          onRestart={handleRestart}
          isSummarizing={isSummarizing}
          isSuggesting={isSuggesting}
          result={result}
          suggestedResponse={suggestedResponse}
          isEditing={isEditing}
          editedResponse={editedResponse}
          selectedStyle={selectedStyle}
          showReason={showReason}
          onStyleSelect={handleStyleChange}
          onEdit={handleEditResponse}
          onUpdateResponse={updateEditedResponse}
          onCancelEditing={cancelEditing}
          onSaveResponse={handleSaveResponse}
          onToggleReason={toggleReason}
        />
      )}
    </div>
  )
} 