'use client'

import React from 'react'
import Link from 'next/link'
import { BarChart3, MessageSquare, Clock, Settings } from 'lucide-react'

// 임시 데이터
const summaries = [
  {
    id: 1,
    title: '마케팅팀 주간 회의',
    platform: 'Slack',
    date: '2024-03-20',
    messageCount: 125,
    summaryLength: '3분',
  },
  {
    id: 2,
    title: '제품 기획 논의',
    platform: 'KakaoTalk',
    date: '2024-03-19',
    messageCount: 89,
    summaryLength: '2분',
  },
  {
    id: 3,
    title: '디자인 피드백',
    platform: 'KakaoTalk',
    date: '2024-03-18',
    messageCount: 67,
    summaryLength: '1분',
  },
]

const stats = [
  {
    label: '총 요약 횟수',
    value: '24회',
    icon: BarChart3,
    color: 'bg-purple-500',
  },
  {
    label: '총 메시지 수',
    value: '2,847개',
    icon: MessageSquare,
    color: 'bg-pink-500',
  },
  {
    label: '절약한 시간',
    value: '5.2시간',
    icon: Clock,
    color: 'bg-blue-500',
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="section-container py-8">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              안녕하세요, 홍길동님 👋
            </h1>
            <p className="text-gray-400 mt-1">
              오늘도 Summy와 함께 효율적인 하루 보내세요
            </p>
          </div>
          <Link href="/settings" className="btn-secondary">
            <Settings className="w-4 h-4" />
            <span>설정</span>
          </Link>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{stat.value}</h3>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 요약 내역 */}
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold">최근 요약 내역</h2>
          </div>
          <div className="divide-y divide-white/10">
            {summaries.map((summary) => (
              <div key={summary.id} className="p-6 hover:bg-white/5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{summary.title}</h3>
                  <span className="text-sm text-gray-400">{summary.date}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{summary.platform}</span>
                  <span>•</span>
                  <span>{summary.messageCount}개의 메시지</span>
                  <span>•</span>
                  <span>{summary.summaryLength} 분량</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-white/10 text-center">
            <Link href="/summaries" className="text-purple-400 hover:text-purple-300">
              모든 요약 보기
            </Link>
          </div>
        </div>

        {/* 새 요약 시작 버튼 */}
        <div className="mt-8 text-center">
          <Link
            href="/new"
            className="btn-primary inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            새로운 대화 요약하기
          </Link>
        </div>
      </div>
    </div>
  )
} 