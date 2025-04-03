'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const personas = [
  {
    name: '업무에 집중하는 팀장 A',
    emoji: '😩',
    image: '/images/personas/team-leader.svg',
    problem: '하루 1000개 이상의 메시지 속에서 중요 정보를 놓치고 있어요.',
    problemFull: '매일 쏟아지는 1000개 이상의 메시지에서 꼭 알아야 할 정보가 묻히고, 프로젝트 진행 상황을 파악하기 위해 너무 많은 시간을 소비하고 있어요.',
    tags: ['#정보과부하', '#시간절약'],
    solution: '메시지 우선순위화 및 핵심 정보 추출'
  },
  {
    name: '소통이 어려운 디자이너 B',
    emoji: '🫣',
    image: '/images/personas/designer.svg',
    problem: '복잡한 피드백을 정리하고 명확한 답장을 작성하기가 어려워요.',
    problemFull: '클라이언트와 동료들의 다양한 피드백을 체계적으로 정리하고, 내 의견을 명확하게 전달할 수 있는 답변 작성에 어려움을 겪고 있어요.',
    tags: ['#소통개선', '#답변작성'],
    solution: '피드백 정리 및 맞춤형 답장 문구 제안'
  },
  {
    name: '글로벌 팀과 일하는 개발자 C',
    emoji: '😮‍💨',
    image: '/images/personas/developer.svg',
    problem: '시차와 언어 장벽으로 실시간 의사소통이 어렵고 컨텍스트 파악이 늦어요.',
    problemFull: '해외 팀원들과의 시차 및 언어 장벽으로 인해 빠른 의사결정이 어렵고, 깨어있을 때 쌓인 대화 내용에서 핵심 사항만 빠르게 파악해야 해요.',
    tags: ['#글로벌협업', '#컨텍스트이해'],
    solution: '다국어 요약 및 자동 답장 제안'
  },
  {
    name: '커뮤니케이션에 신경쓰는 대학생 D',
    emoji: '😅',
    image: '/images/personas/student.svg',
    problem: '그룹 프로젝트 대화가 너무 길어져서 핵심을 놓치고 적절한 반응이 어려워요.',
    problemFull: '수십 명이 참여하는 그룹 프로젝트 채팅방에서 중요한 정보를 놓치지 않고, 상황에 맞는 적절한 메시지로 대응하고 싶은데 어려움을 겪고 있어요.',
    tags: ['#정보정리', '#답장고민'],
    solution: '주요 논의 추적 및 상황별 답장 문구 추천'
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
    <section className="relative py-16 sm:py-24 bg-[#1a1a1f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-10">
          <h2 
            className="apple-section-title cursor-pointer" 
            onClick={() => {
              const problemsSection = document.getElementById('problems')
              if (problemsSection) {
                problemsSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            title="왜 필요한가요? 섹션으로 이동"
          >
            왜 필요한가요?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
            메시지와 미팅이 많을수록 소통 효율은 떨어집니다
          </p>
        </div>

        {/* 모바일 스냅 스크롤 컨테이너 */}
        <div className="sm:hidden overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-8">
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
                className="group relative overflow-hidden rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/[0.04] transition-all duration-300 w-[85vw] max-w-sm snap-center flex-shrink-0 shadow-sm"
              >
                <div className="p-4">
                  <div className="flex flex-col items-center gap-3">
                    {/* 캐릭터 이미지와 이름을 나란히 배치 */}
                    <div className="flex items-center gap-3 w-full">
                      {/* 캐릭터 이미지 */}
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white/[0.04] border border-white/[0.06] shadow-sm flex-shrink-0">
                        <Image
                          src={persona.image}
                          alt={persona.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{persona.emoji}</span>
                          <h3 className="text-base font-medium text-white">{persona.name}</h3>
                        </div>
                        
                        {/* 태그 */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {persona.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/[0.04] text-white/70 border border-white/[0.06]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 내용 */}
                    <div className="text-left w-full">
                      <p className="text-white/80 text-xs mb-3">
                        &quot;{persona.problem}&quot;
                      </p>

                      {/* 해결책 */}
                      <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04] shadow-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-base">✨</span>
                          <p className="text-white/70 text-xs">{persona.solution}</p>
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
          className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative overflow-hidden rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/[0.04] transition-all duration-300 shadow-sm hover:bg-white/[0.04]"
            >
              <div className="p-5 lg:p-6">
                <div className="flex items-start gap-5">
                  {/* 캐릭터 이미지 */}
                  <div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-lg overflow-hidden bg-white/[0.04] border border-white/[0.06] shadow-sm">
                    <Image
                      src={persona.image}
                      alt={persona.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>

                  {/* 내용 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{persona.emoji}</span>
                      <h3 className="text-xl font-medium text-white">{persona.name}</h3>
                    </div>
                    
                    <p className="text-white/80 text-sm mb-3">
                      &quot;{persona.problemFull}&quot;
                    </p>

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {persona.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/[0.04] text-white/70 border border-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 해결책 */}
                    <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04] shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">✨</span>
                        <div>
                          <p className="text-white font-medium text-xs mb-1">summy의 해결책</p>
                          <p className="text-white/70 text-sm">{persona.solution}</p>
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
            className="px-4 py-2.5 bg-white/10 text-white rounded-lg text-sm font-medium transition-all hover:bg-white/15 backdrop-blur-md inline-flex items-center gap-2"
          >
            <span className="bg-white/10 p-1.5 rounded-full text-sm">🎮</span>
            시작하기
          </Link>
        </motion.div>
      </AnimatePresence>
    </section>
  )
} 