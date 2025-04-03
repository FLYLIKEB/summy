'use client'

import { MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function MobileNewSummaryButton() {
  return (
    <>
      {/* 모바일 - 하단 고정 신규대화 요약 버튼 */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center sm:hidden z-50">
        <Link 
          href="/dashboard/new" 
          className="apple-button apple-button-primary px-6 py-3.5 rounded-full text-base active:scale-[0.98] gap-2.5 shadow-lg focus-visible-ring"
          aria-label="신규대화 요약 시작하기"
        >
          <MessageSquare className="w-5 h-5" aria-hidden="true" />
          <span>신규대화 요약</span>
        </Link>
      </div>
      
      {/* 데스크탑 - 오른쪽 하단 고정 신규대화 요약 버튼 */}
      <div className="hidden sm:block fixed bottom-8 right-8 z-50">
        <Link 
          href="/dashboard/new" 
          className="apple-button apple-button-primary px-5 py-3 rounded-full active:scale-[0.98] gap-2 shadow-lg focus-visible-ring"
          aria-label="신규대화 요약 시작하기"
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span>신규대화 요약</span>
        </Link>
      </div>
    </>
  )
} 