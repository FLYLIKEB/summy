'use client'

import React from 'react'
import { motion } from 'framer-motion'

const features = [
  {
    title: '📱 카카오톡, 슬랙 등 다양한 메신저 지원',
    description: '카카오톡, 슬랙 등 다양한 메신저의 대화를 지원해요. 긴 시간 동안 오간 수많은 메시지도 단 몇 초 만에 핵심만 쏙 뽑아드립니다. 대화 내용을 요약하고, 상황에 맞는 답변을 추천해드려요. 더 이상 대화를 놓치지 마세요.',
    tags: ['카카오톡', '슬랙', '디스코드'],
    icon: '💬'
  },
  {
    title: '🤖 AI가 이해하는 요약',
    description: '단순히 키워드만 추출하는 것이 아니라, AI가 대화의 맥락을 이해하고 중요한 내용을 정확하게 요약해드려요.',
    icon: '🧠'
  },
  {
    title: '⚡ 실시간 요약',
    description: '대화가 진행되는 동안 실시간으로 요약이 업데이트되어 중요한 내용을 놓치지 않아요.',
    icon: '⚡'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Features() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* 배경 요소 */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      </div>

      <div className="section-container relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-title text-center mb-16"
        >
          💬 어떤 대화든 요약해드려요
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative"
            >
              {/* 말풍선 꼬리 */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-purple-500/20 to-transparent rounded-full blur-sm" />
              
              {/* 카드 */}
              <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-purple-500/50 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                {/* 아이콘 */}
                <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>

                {/* 제목 */}
                <h3 className="font-bold text-lg sm:text-xl mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {feature.title}
                </h3>

                {/* 설명 */}
                <p className="text-sm sm:text-base text-gray-300 mb-4">
                  {feature.description}
                </p>

                {/* 태그 */}
                {feature.tags && (
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 