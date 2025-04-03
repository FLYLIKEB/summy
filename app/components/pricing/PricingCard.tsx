import Link from 'next/link';
import { PricingPlan } from '../../types/pricing';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/common/card';
import { cn } from '@/lib/utils';

// 분리된 컴포넌트들
const PopularBadge = () => (
  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
    <span className="bg-purple-600 text-white px-6 py-1.5 rounded-badge text-sm font-medium shadow-lg border border-purple-400">
      가장 인기
    </span>
  </div>
);

const PriceDisplay = ({ price }: { price: string | number }) => (
  <div className="text-4xl font-black mb-4">
    ₩{price}
    <span className="text-lg text-white/60">/월</span>
  </div>
);

const FeatureList = ({ features }: { features: string[] }) => (
  <ul className="space-y-4 mb-8">
    {features.map((feature) => (
      <li key={feature} className="flex items-center gap-2">
        <span className="text-purple-400">✓</span>
        {feature}
      </li>
    ))}
  </ul>
);

const PricingButton = ({ href, cta, isPopular }: { href: string; cta: string; isPopular: boolean }) => (
  <Link href={href} className="w-full">
    <button 
      className={cn(
        "apple-button w-full py-3 rounded-button",
        isPopular 
          ? "apple-button-primary" 
          : "apple-button-secondary"
      )}
    >
      {cta}
    </button>
  </Link>
);

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
        {plan.popular && <PopularBadge />}
        
        <CardHeader className={`text-center ${plan.popular ? 'pt-12' : ''}`}>
          <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
          <PriceDisplay price={plan.price} />
          <p className="text-white/80">{plan.description}</p>
        </CardHeader>

        <CardContent className="flex-1">
          <FeatureList features={plan.features} />
        </CardContent>

        <CardFooter>
          <PricingButton 
            href={plan.href}
            cta={plan.cta}
            isPopular={plan.popular}
          />
        </CardFooter>
      </Card>
    </div>
  );
} 