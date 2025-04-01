import React from 'react'
import Link from 'next/link'

export default function PricingPage() {
  const plans = [
    {
      name: '무료',
      price: '0',
      description: '기본적인 요약 기능을 체험해보세요',
      features: [
        '하루 10회 요약',
        '기본 AI 요약',
        '카카오톡 지원',
        '7일간 요약 이력 보관'
      ],
      cta: '무료로 시작하기',
      href: '/signup',
      popular: false
    },
    {
      name: '프로',
      price: '9,900',
      description: '더 많은 기능과 더 나은 요약을 경험하세요',
      features: [
        '무제한 요약',
        '고급 AI 요약',
        '모든 메신저 지원',
        '30일간 요약 이력 보관',
        '맞춤형 답변 추천',
        '우선 지원'
      ],
      cta: '프로로 시작하기',
      href: '/signup?plan=pro',
      popular: true
    },
    {
      name: '비즈니스',
      price: '29,900',
      description: '팀과 함께 더 효율적으로 일하세요',
      features: [
        '프로 요금제의 모든 기능',
        '팀 관리 기능',
        'API 액세스',
        '무제한 요약 이력 보관',
        '전용 지원',
        '맞춤형 기능 개발'
      ],
      cta: '문의하기',
      href: '/contact',
      popular: false
    }
  ]

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="section-container py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-4">
            💜 합리적인 요금제로 시작하세요
          </h1>
          <p className="text-xl text-white/80">
            필요에 맞는 요금제를 선택하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`card p-8 relative ${
                plan.popular ? 'border-2 border-purple-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    가장 인기
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="text-4xl font-black mb-4">
                  ₩{plan.price}
                  <span className="text-lg text-white/60">/월</span>
                </div>
                <p className="text-white/80">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-purple-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                href={plan.href}
                className={`block w-full text-center py-3 rounded-lg transition-colors ${
                  plan.popular 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ 섹션 */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            자주 묻는 질문
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">요금제는 언제든 변경할 수 있나요?</h3>
              <p className="text-white/80">
                네, 언제든지 요금제를 업그레이드하거나 다운그레이드할 수 있습니다.
                변경은 다음 결제 주기부터 적용됩니다.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">무료 요금제의 제한사항은 무엇인가요?</h3>
              <p className="text-white/80">
                무료 요금제는 하루 10회까지 요약할 수 있으며, 기본적인 AI 요약 기능만 사용 가능합니다.
                요약 이력은 7일간만 보관됩니다.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">비즈니스 요금제의 API는 어떻게 사용하나요?</h3>
              <p className="text-white/80">
                비즈니스 요금제 가입 시 API 키가 발급되며, 상세한 API 문서를 제공해드립니다.
                기술 지원팀이 API 통합을 도와드립니다.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">환불 정책은 어떻게 되나요?</h3>
              <p className="text-white/80">
                첫 14일 동안은 무조건 환불이 가능합니다. 그 이후에는 남은 기간에 대해
                일할 계산으로 환불해드립니다.
              </p>
            </div>
          </div>
        </div>

        {/* 추가 문의 CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">더 자세한 정보가 필요하신가요?</h2>
          <p className="text-white/80 mb-8">
            요금제나 기능에 대해 더 자세히 알고 싶으시다면 문의해주세요
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            문의하기
          </Link>
        </div>
      </div>
    </div>
  )
} 