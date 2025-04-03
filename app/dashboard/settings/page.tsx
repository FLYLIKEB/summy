'use client'

import React, { useState } from 'react'
import { Bell, Key, User, Mail, Trash2, LucideIcon } from 'lucide-react'

interface SettingItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
  isDangerous?: boolean
}

interface SettingSection {
  category: string
  items: SettingItem[]
}

const settings: SettingSection[] = [
  {
    category: '계정',
    items: [
      {
        id: 'profile',
        title: '프로필 설정',
        description: '이름, 프로필 이미지 등을 변경합니다.',
        icon: User,
      },
      {
        id: 'email',
        title: '이메일 변경',
        description: '계정에 연결된 이메일 주소를 변경합니다.',
        icon: Mail,
      },
      {
        id: 'password',
        title: '비밀번호 변경',
        description: '계정 비밀번호를 변경합니다.',
        icon: Key,
      },
    ],
  },
  {
    category: '알림',
    items: [
      {
        id: 'notifications',
        title: '알림 설정',
        description: '이메일, 푸시 알림 등을 관리합니다.',
        icon: Bell,
      },
    ],
  },
  {
    category: '데이터',
    items: [
      {
        id: 'delete',
        title: '계정 삭제',
        description: '계정과 모든 데이터를 영구적으로 삭제합니다.',
        icon: Trash2,
        isDangerous: true,
      },
    ],
  },
]

export default function SettingsPage() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-apple-bg-color text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-medium mb-2">설정</h1>
          <p className="text-sm text-white/60">
            계정 및 앱 설정을 관리하세요
          </p>
        </div>

        {/* 설정 목록 */}
        <div className="space-y-8">
          {settings.map((section) => (
            <div key={section.category}>
              <h2 className="text-lg font-medium mb-4">{section.category}</h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={`w-full p-4 rounded-xl transition-all text-left ${
                      item.isDangerous
                        ? 'bg-white/[0.03] border border-red-500/20 hover:border-red-500/30 hover:bg-white/[0.04]'
                        : 'bg-white/[0.03] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          item.isDangerous ? 'bg-red-500/10' : 'bg-white/[0.05]'
                        }`}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            item.isDangerous ? 'text-red-500' : 'text-white/60'
                          }`}
                        />
                      </div>
                      <div>
                        <h3
                          className={`font-medium ${
                            item.isDangerous ? 'text-red-400' : 'text-white'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`text-sm mt-1 ${
                            item.isDangerous ? 'text-red-400/80' : 'text-white/60'
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 