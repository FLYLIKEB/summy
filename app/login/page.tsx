'use client'

import React from 'react'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            로그인
          </h1>
          <p className="text-center mb-8 opacity-80">
            summy에 오신 것을 환영합니다
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-white border-opacity-20 bg-white bg-opacity-5 text-purple-500 focus:ring-purple-500"
                />
                <label htmlFor="remember" className="text-sm opacity-80">
                  로그인 상태 유지
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                비밀번호 찾기
              </Link>
            </div>

            <button className="btn-primary w-full">
              로그인
            </button>

            <p className="text-center text-sm opacity-70">
              아직 계정이 없으신가요?{' '}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300">
                회원가입하기
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center text-sm opacity-70">
            <p>✨ 첫 달 무료 · 언제든 해지 가능 · 설치 필요 없음</p>
          </div>
        </div>
      </div>
    </main>
  )
} 