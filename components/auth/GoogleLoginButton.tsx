'use client'

import React from 'react'
import Script from 'next/script'

interface GoogleLoginButtonProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  className?: string;
}

export default function GoogleLoginButton({ 
  onSuccess, 
  onError,
  className = ''
}: GoogleLoginButtonProps) {
  const handleLogin = async () => {
    try {
      // TODO: 구글 로그인 구현
      const userData = { id: '123', email: 'test@example.com', name: 'Test User' };
      onSuccess?.(userData);
    } catch (error) {
      console.error('구글 로그인 실패:', error);
      onError?.(error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M19.8055 10.2275C19.8055 9.51749 19.7516 8.83499 19.6363 8.17749H10.2002V11.8875H15.6033C15.3858 13.095 14.6403 14.1275 13.5541 14.7725V17.205H16.7283C18.6087 15.4925 19.8055 13.0775 19.8055 10.2275Z" 
          fill="#4285F4"
        />
        <path 
          d="M10.2002 20C12.897 20 15.1714 19.1049 16.7283 17.205L13.5541 14.7725C12.6564 15.365 11.5163 15.7275 10.2002 15.7275C7.59599 15.7275 5.38257 14 4.58647 11.6825H1.31494V14.1925C2.86437 17.6275 6.27184 20 10.2002 20Z" 
          fill="#34A853"
        />
        <path 
          d="M4.58647 11.6825C4.16493 10.4925 4.16493 9.20499 4.58647 8.01499V5.50499H1.31494C-0.177468 8.33499 -0.177468 11.365 1.31494 14.195L4.58647 11.6825Z" 
          fill="#FBBC04"
        />
        <path 
          d="M10.2002 4.27251C11.6227 4.25751 13.0452 4.81501 14.1044 5.82501L16.9359 3.02001C15.1174 1.31501 12.6564 0.352505 10.2002 0.377505C6.27184 0.377505 2.86437 2.75001 1.31494 6.18501L4.58647 8.69751C5.38257 6.38001 7.59599 4.27251 10.2002 4.27251Z" 
          fill="#EA4335"
        />
      </svg>
      구글로 로그인
    </button>
  )
} 