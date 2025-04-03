'use client'

import React, { useEffect } from 'react'
import Script from 'next/script'
import { KAKAO_SDK_URL, initializeKakao, kakaoLogin } from '@/lib/kakao'

interface KakaoLoginButtonProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  className?: string;
}

export default function KakaoLoginButton({ 
  onSuccess, 
  onError,
  className = ''
}: KakaoLoginButtonProps) {
  const handleLogin = async () => {
    try {
      const userData = await kakaoLogin();
      onSuccess?.(userData);
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      onError?.(error);
    }
  };

  return (
    <>
      <Script
        src={KAKAO_SDK_URL}
        strategy="lazyOnload"
        onLoad={() => {
          initializeKakao();
        }}
      />
      <button
        onClick={handleLogin}
        className={`flex items-center justify-center gap-2 ${className}`}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none"
        >
          <path 
            d="M10 0C4.477 0 0 3.477 0 7.769c0 2.713 1.824 5.091 4.536 6.437-.198.751-.72 2.724-.825 3.144-.129.522.19.516.399.375.164-.109 2.612-1.777 3.672-2.498.714.105 1.447.16 2.218.16 5.523 0 10-3.477 10-7.769S15.523 0 10 0z" 
            fill="currentColor"
          />
        </svg>
        카카오로 로그인
      </button>
    </>
  )
} 