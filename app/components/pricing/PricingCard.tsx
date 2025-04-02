import Link from 'next/link';
import { PricingPlan } from '../../types/pricing';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <Card
      variant={plan.popular ? 'feature' : 'glass'}
      padding="lg"
      hover={true}
      className={`relative ${plan.popular ? 'border-2 border-purple-500' : ''}`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            가장 인기
          </span>
        </div>
      )}
      
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
        <div className="text-4xl font-black mb-4">
          ₩{plan.price}
          <span className="text-lg text-white/60">/월</span>
        </div>
        <p className="text-white/80">{plan.description}</p>
      </CardHeader>

      <CardContent>
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="text-purple-400">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          variant={plan.popular ? 'primary' : 'ghost'}
          fullWidth={true}
          className="py-3"
          gradient={plan.popular}
          onClick={() => window.location.href = plan.href}
        >
          {plan.cta}
        </Button>
      </CardFooter>
    </Card>
  );
} 