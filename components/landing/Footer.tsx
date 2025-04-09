'use client'

import React from 'react'
import Link from 'next/link'
import Logo from '../common/Logo'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-apple-dark border-t border-gray-200 dark:border-white-opacity-04">
      <div className="apple-section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="text-center md:text-left">
            <Logo variant="text" size="md" href="/" className="block" />
            <p className="text-sm text-gray-600 dark:text-white/60">
              🤖 AI로 더 스마트하게 대화를 요약하세요
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-gray-900 dark:text-white font-medium mb-4">빠른 링크</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="flex items-center justify-center md:justify-start text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all group">
                  <span className="w-6 h-6 flex items-center justify-center mr-1.5 bg-gray-100 dark:bg-white-opacity-04 rounded-md group-hover:bg-gray-200 dark:group-hover:bg-white-opacity-06 transition-all">✨</span>
                  상세 기능 소개
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="flex items-center justify-center md:justify-start text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all group">
                  <span className="w-6 h-6 flex items-center justify-center mr-1.5 bg-gray-100 dark:bg-white-opacity-04 rounded-md group-hover:bg-gray-200 dark:group-hover:bg-white-opacity-06 transition-all">💰</span>
                  요금제
                </Link>
              </li>
              <li>
                <Link href="/blog" className="flex items-center justify-center md:justify-start text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all group">
                  <span className="w-6 h-6 flex items-center justify-center mr-1.5 bg-gray-100 dark:bg-white-opacity-04 rounded-md group-hover:bg-gray-200 dark:group-hover:bg-white-opacity-06 transition-all">📝</span>
                  블로그
                </Link>
              </li>
              <li>
                <Link href="/faq" className="flex items-center justify-center md:justify-start text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all group">
                  <span className="w-6 h-6 flex items-center justify-center mr-1.5 bg-gray-100 dark:bg-white-opacity-04 rounded-md group-hover:bg-gray-200 dark:group-hover:bg-white-opacity-06 transition-all">❓</span>
                  자주 묻는 질문
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-gray-900 dark:text-white font-medium mb-4">연락처</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@summy.ai" className="flex items-center justify-center md:justify-start text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all group">
                  <span className="w-6 h-6 flex items-center justify-center mr-1.5 bg-gray-100 dark:bg-white-opacity-04 rounded-md group-hover:bg-gray-200 dark:group-hover:bg-white-opacity-06 transition-all">📧</span>
                  support@summy.ai
                </a>
              </li>
              <li>
                <a href="https://pf.kakao.com/_xxxxx" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all group">
                  <span className="w-6 h-6 flex items-center justify-center mr-1.5 bg-gray-100 dark:bg-white-opacity-04 rounded-md group-hover:bg-gray-200 dark:group-hover:bg-white-opacity-06 transition-all">💬</span>
                  카카오톡 채널
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=서울특별시" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all group">
                  <span className="w-6 h-6 flex items-center justify-center mr-1.5 bg-gray-100 dark:bg-white-opacity-04 rounded-md group-hover:bg-gray-200 dark:group-hover:bg-white-opacity-06 transition-all">📍</span>
                  서울특별시
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-gray-900 dark:text-white font-medium mb-4">뉴스레터 구독</h4>
            <p className="text-sm text-gray-600 dark:text-white/60 mb-4">새로운 기능과 업데이트를 받아보세요</p>
            <form action="/api/newsletter" method="POST" className="flex flex-col sm:flex-row gap-2 max-w-xs sm:max-w-md mx-auto md:mx-0">
              <input 
                type="email" 
                name="email"
                placeholder="이메일 주소" 
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-white-opacity-04 border border-gray-200 dark:border-white-opacity-06 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-gray-300 dark:focus:border-white-opacity-10 text-sm"
                required
              />
              <button type="submit" className="apple-button apple-button-primary whitespace-nowrap text-sm">
                구독
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-gray-200 dark:border-white-opacity-04 pt-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/terms" className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all group">
              <span className="w-5 h-5 flex items-center justify-center bg-gray-100 dark:bg-white-opacity-04 rounded-md group-hover:bg-gray-200 dark:group-hover:bg-white-opacity-06 transition-all">📋</span>
              이용약관
            </Link>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300 dark:bg-white-opacity-10" />
            <Link href="/privacy" className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all group">
              <span className="w-5 h-5 flex items-center justify-center bg-gray-100 dark:bg-white-opacity-04 rounded-md group-hover:bg-gray-200 dark:group-hover:bg-white-opacity-06 transition-all">🔐</span>
              개인정보처리방침
            </Link>
          </div>
          <div className="flex gap-4">
            <a 
              href="https://twitter.com/summy_ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white-opacity-04 hover:bg-gray-200 dark:hover:bg-white-opacity-08 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-all"
              aria-label="트위터"
            >
              <span className="text-base">🐦</span>
            </a>
            <a 
              href="https://instagram.com/summy.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white-opacity-04 hover:bg-gray-200 dark:hover:bg-white-opacity-08 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-all"
              aria-label="인스타그램"
            >
              <span className="text-base">📱</span>
            </a>
            <a 
              href="https://pf.kakao.com/_xxxxx" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white-opacity-04 hover:bg-gray-200 dark:hover:bg-white-opacity-08 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-all"
              aria-label="카카오톡"
            >
              <span className="text-base">💬</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white-opacity-04 text-center">
          <p className="text-sm text-gray-500 dark:text-white/40">
            © {new Date().getFullYear()} Summy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 