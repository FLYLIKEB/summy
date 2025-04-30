'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Logo from '../common/Logo'
import VisitorTracking from '../VisitorTracking'
import { FormUtils } from '@/components/utils/FormUtils'
import { useToast } from '../common/Toast'

// 푸터 링크 컴포넌트
const FooterLink = ({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) => (
  <Link href={href} className="flex items-center justify-center md:justify-start text-sm text-white/60 hover:text-white transition-all group">
    <span className="w-6 h-6 flex items-center justify-center mr-1.5 bg-white-opacity-04 rounded-md group-hover:bg-white-opacity-06 transition-all">{icon}</span>
    {children}
  </Link>
)

// 소셜 링크 컴포넌트
const SocialLink = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-8 h-8 flex items-center justify-center rounded-full bg-white-opacity-04 hover:bg-white-opacity-08 text-white/70 hover:text-white transition-all"
    aria-label={label}
  >
    <span className="text-base">{icon}</span>
  </a>
)

// 피드백 폼 컴포넌트
const FeedbackForm = () => {
  const [email, setEmail] = useState('')
  const [advice, setAdvice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await FormUtils.submitFeedback(email, advice)
      showToast({
        title: '성공!',
        message: '의견이 성공적으로 제출되었습니다.',
        type: 'success'
      })
      setEmail('')
      setAdvice('')
    } catch (error) {
      if (error instanceof Error) {
        showToast({
          title: '오류',
          message: error.message,
          type: 'error'
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto md:mx-0">
      <div className="flex flex-col gap-2">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소" 
          className="w-full px-4 py-2 rounded-lg bg-white-opacity-04 border border-white-opacity-06 text-white placeholder-white/40 focus:outline-none focus:border-white-opacity-10 text-sm"
          required
          disabled={isSubmitting}
        />
        <textarea 
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
          placeholder="서비스에 대한 조언을 남겨주세요"
          className="w-full px-4 py-2 rounded-lg bg-white-opacity-04 border border-white-opacity-06 text-white placeholder-white/40 focus:outline-none focus:border-white-opacity-10 text-sm min-h-[100px] resize-none"
          disabled={isSubmitting}
        />
      </div>
      <button 
        type="submit" 
        className="apple-button apple-button-primary whitespace-nowrap text-sm"
        disabled={isSubmitting}
      >
        {isSubmitting ? '제출 중...' : '🤍 의견 제출하기 🤍'}
      </button>
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="bg-apple-dark border-t border-white-opacity-04">
      <div className="apple-section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 로고 섹션 */}
          <div className="text-center md:text-left">
            <Logo variant="text" size="md" href="/" className="block" />
            <p className="text-sm text-white/60">
              🤖 AI로 더 스마트하게 대화를 요약하세요
            </p>
          </div>
          
          {/* 빠른 링크 섹션 */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-medium mb-4">빠른 링크</h4>
            <ul className="space-y-3">
              <li><FooterLink href="/features" icon="✨">상세 기능 소개</FooterLink></li>
              <li><FooterLink href="/pricing" icon="💰">요금제</FooterLink></li>
              <li><FooterLink href="/blog" icon="📝">블로그</FooterLink></li>
              <li><FooterLink href="/faq" icon="❓">자주 묻는 질문</FooterLink></li>
            </ul>
          </div>

          {/* 연락처 섹션 */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-medium mb-4">연락처</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@summy.ai" className="flex items-center justify-center md:justify-start text-sm text-white/60 hover:text-white transition-all group">
                  <span className="w-6 h-6 flex items-center justify-center mr-1.5 bg-white-opacity-04 rounded-md group-hover:bg-white-opacity-06 transition-all">📧</span>
                  support@summy.ai
                </a>
              </li>
              <li>
                <a href="https://pf.kakao.com/_xxxxx" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start text-sm text-white/60 hover:text-white transition-all group">
                  <span className="w-6 h-6 flex items-center justify-center mr-1.5 bg-white-opacity-04 rounded-md group-hover:bg-white-opacity-06 transition-all">💬</span>
                  카카오톡 채널
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=서울특별시" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start text-sm text-white/60 hover:text-white transition-all group">
                  <span className="w-6 h-6 flex items-center justify-center mr-1.5 bg-white-opacity-04 rounded-md group-hover:bg-white-opacity-06 transition-all">📍</span>
                  서울특별시
                </a>
              </li>
            </ul>
          </div>

          {/* 피드백 섹션 */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-medium mb-4">사전 런칭 신청</h4>
            <p className="text-sm text-white/60 mb-4">이메일을 남겨주시면 서비스가 런칭되었을 때 알림을 드리겠습니다.</p>
            <FeedbackForm />
            <div id="visitor-tracking" className="mt-4">
              <VisitorTracking />
            </div>
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-white-opacity-04 pt-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/terms" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-all group">
              <span className="w-5 h-5 flex items-center justify-center bg-white-opacity-04 rounded-md group-hover:bg-white-opacity-06 transition-all">📋</span>
              이용약관
            </Link>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white-opacity-10" />
            <Link href="/privacy" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-all group">
              <span className="w-5 h-5 flex items-center justify-center bg-white-opacity-04 rounded-md group-hover:bg-white-opacity-06 transition-all">🔐</span>
              개인정보처리방침
            </Link>
          </div>
          <div className="flex gap-4">
            <SocialLink href="https://twitter.com/summy_ai" icon="🐦" label="트위터" />
            <SocialLink href="https://instagram.com/summy.ai" icon="📱" label="인스타그램" />
            <SocialLink href="https://pf.kakao.com/_xxxxx" icon="💬" label="카카오톡" />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white-opacity-04 text-center">
          <p className="text-sm text-white/40">
            © 2025 Summy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 