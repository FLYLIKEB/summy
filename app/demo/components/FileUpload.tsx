import React, { useRef, useState } from 'react'
import { Card } from './common/Card'
import { Icon } from './common/Icon'
import { Button } from './common/Button'

interface FileUploadProps {
  onFileChange?: (file: File | null) => void
  className?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, className = '' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (file: File | null) => {
    setUploadedFile(file)
    if (onFileChange) {
      onFileChange(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileChange(file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleFileChange(file)
  }

  const handleRemoveFile = () => {
    handleFileChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAreaClick = () => {
    fileInputRef.current?.click()
  }

  const fileName = uploadedFile?.name

  return (
    <Card className={`relative ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleAreaClick}
        className={`p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer
          ${isDragging 
            ? 'border-blue-500 bg-blue-500/5' 
            : 'border-white/10 hover:border-blue-500/50 hover:bg-white/5'
          }`}
      >
        {uploadedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="file" className="w-6 h-6 text-blue-400" />
              <span className="text-white/80">{fileName}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleRemoveFile()
              }}
              className="text-white/60 hover:text-white"
            >
              <Icon name="remove" className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Icon name="upload" className="w-12 h-12 text-blue-400" />
            <div className="text-center">
              <p className="text-white/80 mb-1">
                파일을 드래그하거나 클릭하여 업로드하세요
              </p>
              <p className="text-sm text-white/60">
                모든 파일 형식을 지원합니다
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
} 