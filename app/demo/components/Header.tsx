import React from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <Logo variant="text" size="md" />
      <div className="flex gap-4">
        <Link 
          href="/login"
          className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all"
        >
          로그인
        </Link>
        <Link 
          href="/signup"
          className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-mint-500 text-white hover:from-purple-600 hover:to-mint-600 transition-all"
        >
          회원가입
        </Link>
      </div>
    </div>
  )
} 