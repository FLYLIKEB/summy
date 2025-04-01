import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="section-container py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg mb-2">✨ Summy</h3>
            <p className="text-sm opacity-80">
              AI로 더 스마트하게 대화를 요약하세요
            </p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              📝 이용약관
            </a>
            <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              🔒 개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 