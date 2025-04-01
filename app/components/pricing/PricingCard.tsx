import Link from 'next/link';
import { PricingPlan } from '../../types/pricing';

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div 
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
  );
} 