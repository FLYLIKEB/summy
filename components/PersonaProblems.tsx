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
    problem: '단톡방에서 중요 메시지만 알고 싶어요. 회의 중 놓친 500개 메시지를 읽기 힘들어요.',
    problemFull: '단톡방에서 중요한 메시지만 알고 싶어요. 회의 중에는 메시지를 못 봤는데, 나중에 500개가 넘는 메시지를 다 읽기가 너무 힘들어요.',
    tags: ['#요약피로', '#시간부족'],
    solution: '주요 내용만 3줄로 요약'
  },
  {
    name: '내성적인 디자이너 B',
    emoji: '🫣',
    image: '/images/personas/designer.svg',
    problem: '말 센스가 없어서 답장하기 어려워요. 대화 분위기를 잘 못 읽어요.',
    problemFull: '말 센스가 없어서 답장하기가 어려워요. 대화의 분위기를 잘 못 읽어서 실수할까봐 걱정돼요.',
    tags: ['#소통고민', '#감정분석'],
    solution: '대화 맥락 분석 후 답변 제안'
  },
  {
    name: '해외 근무 중인 개발자 C',
    emoji: '😮‍💨',
    image: '/images/personas/developer.svg',
    problem: '시차 때문에 놓친 대화가 많아요. 어떤 이슈가 있었는지 파악하고 싶어요.',
    problemFull: '시차 때문에 놓친 대화가 너무 많아요. 어떤 이슈가 있었고, 어떻게 해결됐는지 빠르게 파악하고 싶어요.',
    tags: ['#시차고민', '#이슈추적'],
    solution: '시간대별 주요 논의 요약'
  },
  {
    name: '썸 타는 중인 대학생 D',
    emoji: '😅',
    image: '/images/personas/student.svg',
    problem: '썸녀가 보낸 메시지 뉘앙스를 모르겠어요. 답장을 어떻게 할지 고민중이에요.',
    problemFull: '썸녀가 보낸 메시지의 뉘앙스를 잘 모르겠어요. 답장을 잘못하면 어색해질까봐 몇 시간째 고민 중이에요.',
    tags: ['#감정이해', '#답장고민'],
    solution: '메시지 의도 분석 및 답장 제안'
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
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-gray-900 via-primary-900/40 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            <span className="inline-block mr-2 sm:mr-4">🎯</span>
            <span className="text-4xl sm:text-5xl text-secondary-300">누구에게 필요할까요?</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            summy와 함께 대화의 고민을 해결해보세요
          </p>
        </motion.div>

        {/* 모바일 스냅 스크롤 컨테이너 */}
        <div className="sm:hidden overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex gap-5 w-max"
          >
            {personas.map((persona, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group relative overflow-hidden rounded-2xl bg-gray-900/90 backdrop-blur-sm border border-gray-700 hover:border-primary-500/30 transition-all duration-300 w-[85vw] max-w-sm snap-center flex-shrink-0 shadow-lg"
              >
                <div className="p-5">
                  <div className="flex flex-col items-center gap-4">
                    {/* 캐릭터 이미지와 이름을 나란히 배치 */}
                    <div className="flex items-center gap-3 w-full">
                      {/* 캐릭터 이미지 */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-800 border border-gray-700 shadow-md flex-shrink-0">
                        <Image
                          src={persona.image}
                          alt={persona.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{persona.emoji}</span>
                          <h3 className="text-lg font-bold text-white">{persona.name}</h3>
                        </div>
                        
                        {/* 태그 */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {persona.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary-500/10 text-secondary-300 border border-secondary-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 내용 */}
                    <div className="text-left w-full">
                      <p className="text-gray-300 text-sm mb-3">
                        "{persona.problem}"
                      </p>

                      {/* 해결책 */}
                      <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700 shadow-md">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">✨</span>
                          <p className="text-gray-300 text-xs">{persona.solution}</p>
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
          className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative overflow-hidden rounded-2xl bg-gray-900/90 backdrop-blur-sm border border-gray-700 hover:border-primary-500/30 transition-all duration-500 shadow-lg hover:shadow-primary-800/20 hover:translate-y-[-4px]"
            >
              <div className="p-6 lg:p-8">
                <div className="flex items-start gap-6">
                  {/* 캐릭터 이미지 */}
                  <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden bg-gray-800 border border-gray-700 shadow-md">
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
                      <h3 className="text-2xl font-bold text-white">{persona.name}</h3>
                    </div>
                    
                    <p className="text-gray-300 text-lg mb-4">
                      "{persona.problemFull}"
                    </p>

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {persona.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-secondary-500/10 text-secondary-300 border border-secondary-500/20 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 해결책 */}
                    <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700 shadow-md">
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

              {/* 카드 호버 효과를 위한 그라데이션 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
            className="btn-primary py-3 px-6 flex items-center"
          >
            <span className="inline-flex items-center">
              <span className="bg-white/20 p-1.5 rounded-full mr-2 text-base">🎮</span>
              시작하기
            </span>
          </Link>
        </motion.div>
      </AnimatePresence>
    </section>
  )
} 