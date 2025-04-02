'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const personas = [
  {
    name: '바쁜 팀장 A',
    emoji: '😩',
    image: '/images/personas/team-leader.svg',
    problem: '단톡방에서 중요한 메시지만 알고 싶어요. 회의 중에는 메시지를 못 봤는데, 나중에 500개가 넘는 메시지를 다 읽기가 너무 힘들어요.',
    tags: ['#요약피로', '#시간부족', '#중요메시지'],
    solution: '주요 논의 사항과 결정된 내용만 3줄로 요약해드려요'
  },
  {
    name: '내성적인 디자이너 B',
    emoji: '🫣',
    image: '/images/personas/designer.svg',
    problem: '말 센스가 없어서 답장하기가 어려워요. 대화의 분위기를 잘 못 읽어서 실수할까봐 걱정돼요.',
    tags: ['#답답함해소', '#소통고민', '#감정분석'],
    solution: '대화의 감정과 맥락을 분석해서 적절한 답변 방향을 제안해드려요'
  },
  {
    name: '해외 근무 중인 개발자 C',
    emoji: '😮‍💨',
    image: '/images/personas/developer.svg',
    problem: '시차 때문에 놓친 대화가 너무 많아요. 어떤 이슈가 있었고, 어떻게 해결됐는지 빠르게 파악하고 싶어요.',
    tags: ['#시차고민', '#이슈추적', '#타임라인'],
    solution: '시간대별로 주요 논의 내용을 정리하고 타임라인으로 보여드려요'
  },
  {
    name: '썸 타는 중인 대학생 D',
    emoji: '😅',
    image: '/images/personas/student.svg',
    problem: '썸녀가 보낸 메시지의 뉘앙스를 잘 모르겠어요. 답장을 잘못하면 어색해질까봐 몇 시간째 고민 중이에요.',
    tags: ['#감정이해', '#답장고민', '#뉘앙스분석'],
    solution: '메시지의 감정과 의도를 분석하고, 자연스러운 답장 방향을 제안해드려요'
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

export default function PersonaProblems() {
  return (
    <section className="relative py-12 sm:py-24 bg-gradient-to-b from-primary-900 to-black">
      <div className="section-container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            <span className="inline-block mr-2 sm:mr-4">🎯</span>
            <span className="font-handwriting text-4xl sm:text-5xl text-secondary-300">누구에게 필요할까요?</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            summy와 함께 대화의 고민을 해결해보세요
          </p>
        </motion.div>

        {/* 모바일 스냅 스크롤 컨테이너 */}
        <div className="sm:hidden overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex gap-4 w-max"
          >
            {personas.map((persona, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-900/50 to-secondary-900/50 backdrop-blur-sm border border-primary-500/20 hover:border-secondary-400/50 transition-all duration-300 w-[85vw] snap-center flex-shrink-0"
              >
                <div className="p-4">
                  <div className="flex flex-col items-center gap-4">
                    {/* 캐릭터 이미지 */}
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                      <Image
                        src={persona.image}
                        alt={persona.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    {/* 내용 */}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-2xl">{persona.emoji}</span>
                        <h3 className="text-xl font-bold text-white font-handwriting">{persona.name}</h3>
                      </div>
                      
                      <p className="text-gray-300 text-base mb-3">
                        "{persona.problem}"
                      </p>

                      {/* 태그 */}
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {persona.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 rounded-full text-xs font-medium bg-secondary-500/10 text-secondary-300 border border-secondary-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* 해결책 */}
                      <div className="bg-gradient-to-br from-primary-800/30 to-secondary-800/30 rounded-lg p-3 border border-primary-500/20">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">✨</span>
                          <div>
                            <p className="text-white text-sm font-medium mb-1">summy의 해결책</p>
                            <p className="text-gray-300 text-sm">{persona.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 데스크톱 그리드 레이아웃 */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden sm:grid gap-8"
        >
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-900/50 to-secondary-900/50 backdrop-blur-sm border border-primary-500/20 hover:border-secondary-400/50 transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex items-start gap-6">
                  {/* 캐릭터 이미지 */}
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                    <Image
                      src={persona.image}
                      alt={persona.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>

                  {/* 내용 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{persona.emoji}</span>
                      <h3 className="text-2xl font-bold text-white font-handwriting">{persona.name}</h3>
                    </div>
                    
                    <p className="text-gray-300 text-lg mb-4">
                      "{persona.problem}"
                    </p>

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {persona.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-secondary-500/10 text-secondary-300 border border-secondary-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 해결책 */}
                    <div className="bg-gradient-to-br from-primary-800/30 to-secondary-800/30 rounded-xl p-4 border border-primary-500/20">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">✨</span>
                        <div>
                          <p className="text-white font-medium mb-1">summy의 해결책</p>
                          <p className="text-gray-300">{persona.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 모바일 CTA 버튼 */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="sm:hidden fixed bottom-6 right-4 z-50"
        >
          <Link
            href="/signup"
            className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white font-medium shadow-lg shadow-primary-500/20"
          >
            <span>🎮 시작하기</span>
          </Link>
        </motion.div>
      </AnimatePresence>
    </section>
  )
} 