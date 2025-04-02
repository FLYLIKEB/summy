import React from 'react'
import PricingCard from '../components/pricing/PricingCard'
import FAQ from '../components/pricing/FAQ'
import ContactCTA from '../components/pricing/ContactCTA'
import { PRICING_PLANS, FAQ_ITEMS } from '../constants/pricing'

export default function PricingPage() {
  return (
    <div className="bg-gradient-to-b from-purple-600 to-mint-600 text-white">
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
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        <FAQ items={FAQ_ITEMS} />
        <ContactCTA />
      </div>
    </div>
  )
} 