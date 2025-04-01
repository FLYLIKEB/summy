'use client'

import React from 'react'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        첫 달 무료로 시작하기
      </h1>
      <p className="text-center mb-8 opacity-80">
        summy와 함께 대화 요약의 새로운 경험을 시작하세요.
      </p>

      <div className="card space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">이메일</label>
          <input
            type="email"
            className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="이메일 주소를 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">비밀번호</label>
          <input
            type="password"
            className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">비밀번호 확인</label>
          <input
            type="password"
            className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            className="rounded border-white border-opacity-20 bg-white bg-opacity-5 text-purple-500 focus:ring-purple-500"
          />
          <label htmlFor="terms" className="text-sm opacity-80">
            이용약관 및 개인정보처리방침에 동의합니다
          </label>
        </div>

        <button className="btn-primary w-full">
          회원가입
        </button>

        <p className="text-center text-sm opacity-70">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-purple-400 hover:text-purple-300">
            로그인하기
          </Link>
        </p>
      </div>

      <div className="mt-8 text-center text-sm opacity-70">
        <p>✨ 첫 달 무료 · 언제든 해지 가능 · 설치 필요 없음</p>
      </div>
    </div>
  )
} 