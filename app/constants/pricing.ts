import { PricingPlan, FAQItem } from '../types/pricing';

export const PRICING_PLANS: PricingPlan[] = [
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
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: '요금제는 언제든 변경할 수 있나요?',
    answer: '네, 언제든지 요금제를 업그레이드하거나 다운그레이드할 수 있습니다. 변경은 다음 결제 주기부터 적용됩니다.'
  },
  {
    question: '무료 요금제의 제한사항은 무엇인가요?',
    answer: '무료 요금제는 하루 10회까지 요약할 수 있으며, 기본적인 AI 요약 기능만 사용 가능합니다. 요약 이력은 7일간만 보관됩니다.'
  },
  {
    question: '비즈니스 요금제의 API는 어떻게 사용하나요?',
    answer: '비즈니스 요금제 가입 시 API 키가 발급되며, 상세한 API 문서를 제공해드립니다. 기술 지원팀이 API 통합을 도와드립니다.'
  },
  {
    question: '환불 정책은 어떻게 되나요?',
    answer: '첫 14일 동안은 무조건 환불이 가능합니다. 그 이후에는 남은 기간에 대해 일할 계산으로 환불해드립니다.'
  }
]; 