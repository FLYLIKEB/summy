'use client'

import React, { useState } from 'react'
import { Button } from './ui/Button'
import { PlayCircle, DownloadCloud, ArrowRight, Rewind, Pause } from 'lucide-react'
import { useToast } from './ui/Toast'

export default function Demo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const { showToast } = useToast()
  
  const handlePlay = () => {
    setIsPlaying(!isPlaying)
    showToast({
      type: 'success',
      title: '비디오 제어',
      message: isPlaying ? '비디오가 일시정지 되었습니다.' : '비디오가 재생됩니다.',
    })
  }
  
  const handleDownload = () => {
    showToast({
      type: 'info',
      title: '다운로드',
      message: '데모 영상 다운로드를 시작합니다.',
    })
  }

  return (
    <section className="apple-section bg-[#1a1a1f]">
      <div className="apple-section-container">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in">
          <h2 className="apple-section-title">데모 보기</h2>
          <p className="text-white/60 text-sm sm:text-base">
            Summy가 어떻게 작동하는지 직접 확인해보세요
          </p>
        </div>

        <div className="apple-card overflow-hidden mx-auto">
          <div className="relative aspect-video rounded-t-xl overflow-hidden animate-fade-in">
            <video 
              src="/videos/demo.mp4" 
              className="w-full h-full object-cover"
              poster="/images/demo-thumbnail.jpg"
              controls={false}
            />
            {/* 비디오 오버레이 컨트롤 */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/30">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handlePlay}
                  className="apple-button apple-button-primary rounded-full px-5 py-2"
                >
                  <span className="flex items-center gap-2">
                    {isPlaying 
                      ? <Pause className="w-4 h-4" />
                      : <PlayCircle className="w-4 h-4" />
                    }
                    {isPlaying ? '일시정지' : '재생'}
                  </span>
                </button>
                <button
                  onClick={handleDownload}
                  className="apple-button apple-button-secondary rounded-full px-5 py-2"
                >
                  <span className="flex items-center gap-2">
                    <DownloadCloud className="w-4 h-4" />
                    다운로드
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="apple-card-content flex flex-col md:flex-row items-center justify-between">
            <div className="animate-slide-in-up mb-4 md:mb-0" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg sm:text-xl font-medium mb-1">복잡한 대화를 한눈에 요약</h3>
              <p className="text-white/60 text-sm">
                30분 회의를 30초 요약으로, 핵심만 추출합니다
              </p>
            </div>
            <div>
              <button
                className="apple-button text-white/70 hover:text-white"
                onClick={() => showToast({
                  type: 'info',
                  message: '더 많은 예제를 확인하는 페이지로 이동합니다.'
                })}
              >
                <span className="flex items-center gap-2">
                  더 많은 예제 보기
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 