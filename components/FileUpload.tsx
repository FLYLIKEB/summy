'use client'

import React from 'react'
import { useFileUpload } from '@/hooks/useFileUpload'
import { Icon } from '@/components/ui/Icon'

interface FileUploadProps {
  onFileChange: (file: File | null) => void
  className?: string
}

export default function FileUpload({ onFileChange, className = '' }: FileUploadProps) {
  const {
    isDragging,
    uploadedFile,
    fileName,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop: handleDropBase,
    handleFileInputChange: handleFileInputChangeBase,
    handleRemoveFile: handleRemoveFileBase
  } = useFileUpload()

  const handleDrop = async (e: React.DragEvent) => {
    handleDropBase(e)
    const file = e.dataTransfer.files[0]
    if (file) {
      onFileChange(file)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileInputChangeBase(e)
    const file = e.target.files?.[0]
    if (file) {
      onFileChange(file)
    }
  }

  const handleRemoveFile = () => {
    handleRemoveFileBase()
    onFileChange(null)
  }

  return (
    <div
      className={`relative p-6 rounded-xl border-2 border-dashed transition-colors ${
        isDragging
          ? 'border-purple-500 bg-purple-500/10'
          : 'border-white/20 hover:border-white/40'
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInputChange}
      />

      {uploadedFile ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="file" className="text-purple-400" />
            <span className="text-white/80">{fileName}</span>
          </div>
          <button
            onClick={handleRemoveFile}
            className="text-white/60 hover:text-white"
          >
            <Icon name="remove" size="sm" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Icon name="upload" size="lg" className="text-purple-400" />
          <div className="text-center">
            <p className="text-white/80 mb-1">
              파일을 드래그하거나{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-purple-400 hover:text-purple-300"
              >
                선택
              </button>
              하세요
            </p>
            <p className="text-sm text-white/60">
              모든 파일 형식을 지원합니다
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 