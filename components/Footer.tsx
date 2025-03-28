import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white border-opacity-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">summy</h3>
            <p className="text-sm opacity-70">
              복잡한 대화를 쉽게 이해하는<br />
              AI 기반 메시지 요약 서비스
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-bold">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-sm opacity-70 hover:opacity-100">
                  주요 기능
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm opacity-70 hover:opacity-100">
                  요금제
                </Link>
              </li>
              <li>
                <Link href="#demo" className="text-sm opacity-70 hover:opacity-100">
                  데모 체험
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-bold">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm opacity-70 hover:opacity-100">
                  회사 소개
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm opacity-70 hover:opacity-100">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm opacity-70 hover:opacity-100">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:contact@summy.ai" 
                  className="text-sm opacity-70 hover:opacity-100"
                >
                  contact@summy.ai
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/FLYLIKEB/summy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm opacity-70 hover:opacity-100"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white border-opacity-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-70">
              © 2024 summy. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm opacity-70">
              <span>Made with 💜 by</span>
              <a 
                href="https://github.com/FLYLIKEB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-100"
              >
                FLYLIKEB
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 