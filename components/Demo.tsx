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
    <section className="py-16 bg-gradient-to-b from-purple-900/30 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">데모 보기</h2>
          <p className="text-xl text-white/70">
            Summy가 어떻게 작동하는지 직접 확인해보세요
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-t-2xl overflow-hidden animate-fade-in">
            <video 
              src="/videos/demo.mp4" 
              className="w-full h-full object-cover"
              poster="/images/demo-thumbnail.jpg"
              controls={false}
            />
            {/* 비디오 오버레이 컨트롤 */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40">
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handlePlay}
                  hoverEffect="jelly"
                  className="rounded-full"
                  startIcon={isPlaying ? <Pause className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                >
                  {isPlaying ? '일시정지' : '재생'}
                </Button>
                <Button
                  variant="secondary" 
                  size="lg"
                  onClick={handleDownload}
                  hoverEffect="float"
                  className="rounded-full"
                  startIcon={<DownloadCloud className="w-5 h-5" />}
                >
                  다운로드
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-bold mb-1">복잡한 대화를 한눈에 요약</h3>
              <p className="text-white/70">
                30분 회의를 30초 요약으로, 핵심만 추출합니다
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                variant="ghost"
                size="md"
                hoverEffect="shine"
                endIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => showToast({
                  type: 'info',
                  message: '더 많은 예제를 확인하는 페이지로 이동합니다.'
                })}
              >
                더 많은 예제 보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 