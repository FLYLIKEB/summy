'use client'

import React, { useRef, useState } from 'react'
import { Upload } from 'lucide-react'

interface FileUploadProps {
  onFileChange: (file: File | null) => void
  className?: string
}

export default function FileUpload({ onFileChange, className = '' }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (!file) return

    setUploadedFile(file)
    setFileName(file.name)
    onFileChange(file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    setFileName(file.name)
    onFileChange(file)
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setFileName(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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
            <Upload className="w-6 h-6 text-purple-400" />
            <span className="text-white/80">{fileName}</span>
          </div>
          <button
            onClick={handleRemoveFile}
            className="text-white/60 hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Upload className="w-12 h-12 text-purple-400" />
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