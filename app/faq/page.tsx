'use client'

import React, { useState } from 'react'

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const faqCategories = [
    {
      id: 'general',
      title: '일반 문의',
      questions: [
        {
          q: 'Summy는 어떤 서비스인가요?',
          a: 'Summy는 AI를 활용하여 카카오톡, 라인, 슬랙 등 다양한 메신저의 대화를 자동으로 요약해주는 서비스입니다. 긴 대화 내용을 AI가 이해하고 중요한 내용만 추출하여 보여드립니다.'
        },
        {
          q: '어떤 메신저를 지원하나요?',
          a: '현재 카카오톡, 라인, 슬랙, 디스코드를 지원합니다. 앞으로 더 많은 메신저를 지원할 예정입니다.'
        },
        {
          q: '요약은 어떻게 이루어지나요?',
          a: 'AI가 대화의 맥락을 이해하고, 중요한 내용을 추출하여 자연스러운 요약문을 생성합니다. 단순한 키워드 추출이 아닌, 대화의 의미를 파악하여 요약합니다.'
        }
      ]
    },
    {
      id: 'billing',
      title: '결제 관련',
      questions: [
        {
          q: '요금제는 언제든 변경할 수 있나요?',
          a: '네, 언제든지 요금제를 업그레이드하거나 다운그레이드할 수 있습니다. 변경은 다음 결제 주기부터 적용됩니다.'
        },
        {
          q: '무료 요금제의 제한사항은 무엇인가요?',
          a: '무료 요금제는 하루 10회까지 요약할 수 있으며, 기본적인 AI 요약 기능만 사용 가능합니다. 요약 이력은 7일간만 보관됩니다.'
        },
        {
          q: '환불 정책은 어떻게 되나요?',
          a: '첫 14일 동안은 무조건 환불이 가능합니다. 그 이후에는 남은 기간에 대해 일할 계산으로 환불해드립니다.'
        }
      ]
    },
    {
      id: 'technical',
      title: '기술 지원',
      questions: [
        {
          q: '요약이 잘못된 경우 어떻게 하나요?',
          a: '요약 결과가 마음에 들지 않으시면 다시 요약을 시도해보세요. AI가 다른 관점에서 요약을 생성합니다. 지속적으로 문제가 발생한다면 고객 지원팀에 문의해주세요.'
        },
        {
          q: '요약 이력은 얼마나 보관되나요?',
          a: '무료 요금제는 7일, 프로 요금제는 30일, 비즈니스 요금제는 무제한으로 보관됩니다.'
        },
        {
          q: 'API를 사용할 수 있나요?',
          a: '비즈니스 요금제에서만 API 사용이 가능합니다. API 키 발급과 상세한 문서를 제공해드립니다.'
        }
      ]
    },
    {
      id: 'business',
      title: '비즈니스',
      questions: [
        {
          q: '비즈니스 요금제의 장점은 무엇인가요?',
          a: '팀 관리 기능, API 액세스, 무제한 요약 이력 보관, 전용 지원, 맞춤형 기능 개발 등 다양한 혜택을 제공합니다.'
        },
        {
          q: 'API는 어떻게 사용하나요?',
          a: '비즈니스 요금제 가입 시 API 키가 발급되며, 상세한 API 문서를 제공해드립니다. 기술 지원팀이 API 통합을 도와드립니다.'
        },
        {
          q: '맞춤형 기능 개발이 가능한가요?',
          a: '네, 비즈니스 요금제 고객을 대상으로 맞춤형 기능 개발을 제공합니다. 구체적인 요구사항을 상담해주시면 검토 후 도입을 도와드립니다.'
        }
      ]
    }
  ]

  // 모든 FAQ 항목을 하나의 배열로 변환
  const allFaqs = faqCategories.flatMap(category => 
    category.questions.map(q => ({
      ...q,
      category: category.id,
      categoryTitle: category.title
    }))
  )

  // 검색 및 카테고리 필터링
  const filteredFaqs = allFaqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="section-container py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-4">
            ❓ 자주 묻는 질문
          </h1>
          <p className="text-xl text-white/80">
            궁금하신 점을 찾아보세요
          </p>
        </div>

        {/* 검색 및 필터 섹션 */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">전체 카테고리</option>
              {faqCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* FAQ 목록 */}
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-purple-400">{faq.categoryTitle}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{faq.q}</h3>
                      <p className="text-white/80">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>

        {/* 추가 문의 CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">더 자세한 정보가 필요하신가요?</h2>
          <p className="text-white/80 mb-8">
            원하시는 답변을 찾지 못하셨다면 문의해주세요
          </p>
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            문의하기
          </a>
        </div>
      </div>
    </div>
  )
} 