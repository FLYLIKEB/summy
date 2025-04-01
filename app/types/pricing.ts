export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  popular: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
} 