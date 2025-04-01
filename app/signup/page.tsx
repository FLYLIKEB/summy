'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import KakaoLoginButton from '@/components/KakaoLoginButton'
import GoogleLoginButton from '@/components/GoogleLoginButton'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: 이메일/비밀번호 회원가입 구현
      console.log('회원가입 시도:', { email, password })
      router.push('/dashboard')
    } catch (error) {
      console.error('회원가입 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKakaoLoginSuccess = (userData: any) => {
    console.log('카카오 회원가입 성공:', userData)
    // TODO: 백엔드에 카카오 로그인 정보 전송
    router.push('/dashboard')
  }

  const handleKakaoLoginError = (error: any) => {
    console.error('카카오 회원가입 실패:', error)
    // TODO: 에러 처리
  }

  const handleGoogleLoginSuccess = (userData: any) => {
    console.log('구글 회원가입 성공:', userData)
    // TODO: 백엔드에 구글 로그인 정보 전송
    router.push('/dashboard')
  }

  const handleGoogleLoginError = (error: any) => {
    console.error('구글 회원가입 실패:', error)
    // TODO: 에러 처리
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="section-container py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                ✨ Summy
              </h1>
            </Link>
            <h2 className="mt-4 text-2xl font-bold">
              회원가입
            </h2>
            <p className="mt-2 text-gray-400">
              AI로 더 스마트하게 대화를 요약하세요
            </p>
          </div>

          <div className="space-y-6">
            {/* 소셜 로그인 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-full sm:w-80">
                <KakaoLoginButton
                  onSuccess={handleKakaoLoginSuccess}
                  onError={handleKakaoLoginError}
                  className="btn-secondary w-full !bg-yellow-200 hover:!bg-yellow-300 !text-yellow-900"
                />
              </div>
              <div className="w-full sm:w-80">
                <GoogleLoginButton
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  className="btn-secondary w-full !bg-slate-50 hover:!bg-slate-100 !text-slate-800 !border-slate-200"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">또는</span>
              </div>
            </div>

            {/* 이메일 회원가입 폼 */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  비밀번호 확인
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex justify-center">
                <div className="w-full sm:w-80">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full"
                  >
                    {isLoading ? '회원가입 중...' : '회원가입'}
                  </button>
                </div>
              </div>
            </form>

            <p className="text-center text-sm text-gray-400">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="text-purple-400 hover:text-purple-300">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 