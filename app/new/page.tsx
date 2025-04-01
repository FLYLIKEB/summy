'use client'

import React, { useState } from 'react'
import { Slack, MessageCircle, Loader2 } from 'lucide-react'
import FileUpload from '@/components/FileUpload'

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
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlatform || !file) return

    setIsLoading(true)
    try {
      // TODO: 파일 업로드 및 요약 처리
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log('요약 시작:', { platform: selectedPlatform, file })
    } catch (error) {
      console.error('요약 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
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
                  ? 'border-purple-500 bg-purple-500/10'
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <FileUpload onFileChange={setFile} />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!file || isLoading}
                className={`inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isLoading
                    ? 'bg-purple-500/30 text-purple-300'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    요약 중...
                  </>
                ) : (
                  '요약 시작하기'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
} 