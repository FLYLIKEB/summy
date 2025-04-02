import Link from 'next/link';
import { PricingPlan } from '../../types/pricing';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div className="h-full flex flex-col">
      <Card
        variant={plan.popular ? 'feature' : 'glass'}
        padding="lg"
        hover={true}
        className={`${plan.popular ? 'border-2 border-purple-500' : ''} flex-1 flex flex-col relative`}
      >
        {plan.popular && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
            <span className="bg-purple-600 text-white px-6 py-1.5 rounded-badge text-sm font-medium shadow-lg border border-purple-400">
              가장 인기
            </span>
          </div>
        )}
        
        <CardHeader className={`text-center ${plan.popular ? 'pt-12' : ''}`}>
          <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
          <div className="text-4xl font-black mb-4">
            ₩{plan.price}
            <span className="text-lg text-white/60">/월</span>
          </div>
          <p className="text-white/80">{plan.description}</p>
        </CardHeader>

        <CardContent className="flex-1">
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
          <Link 
            href={plan.href}
            className="w-full"
          >
            <div
              className={cn(
                "w-full text-center py-3 transition-colors rounded-button",
                plan.popular 
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white' 
                  : 'bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white'
              )}
            >
              {plan.cta}
            </div>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
} 