import React from 'react'
import { useFileUpload } from '../hooks/useFileUpload'
import { Icon } from './common/Icon'
import { Button } from './common/Button'

export const FileUpload: React.FC = () => {
  const {
    isDragging,
    uploadedFile,
    fileName,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    handleRemoveFile
  } = useFileUpload()

  return (
    <div
      className={`relative mb-6 p-6 rounded-xl border-2 border-dashed transition-colors ${
        isDragging
          ? 'border-purple-500 bg-purple-500/10'
          : 'border-white/20 hover:border-white/40'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".txt,.xlsx,.xls"
        onChange={handleFileInputChange}
      />

      {uploadedFile ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="file" className="w-6 h-6 text-purple-400" />
            <span className="text-white/80">{fileName}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
            className="text-white/60 hover:text-white"
          >
            <Icon name="remove" className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Icon name="upload" className="w-12 h-12 text-purple-400" />
          <div className="text-center">
            <p className="text-white/80 mb-1">
              파일을 드래그하거나{' '}
              <Button
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
                className="text-purple-400 hover:text-purple-300"
              >
                선택
              </Button>
              하세요
            </p>
            <p className="text-sm text-white/60">
              지원 형식: .txt, .xlsx, .xls
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 