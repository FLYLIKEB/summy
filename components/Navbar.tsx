import Link from 'next/link'
import Image from 'next/image'
import Logo from './ui/Logo'

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-apple-dark backdrop-blur-md border-b border-white-opacity-06">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Logo variant="text" size="md" />

          {/* 로그인/회원가입 버튼 */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="apple-button apple-button-secondary"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="apple-button apple-button-primary"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 