import Link from 'next/link'
import Image from 'next/image'
import Logo from './ui/Logo'

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Logo variant="full" size="md" />

          {/* 로그인/회원가입 버튼 */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-mint-500 rounded-full hover:from-purple-600 hover:to-mint-600 transition-all shadow-lg shadow-purple-500/20"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 