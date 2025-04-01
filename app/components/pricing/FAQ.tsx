import { FAQItem } from '../../types/pricing';

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        자주 묻는 질문
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {items.map((item) => (
          <div key={item.question} className="card p-6">
            <h3 className="text-xl font-bold mb-3">{item.question}</h3>
            <p className="text-white/80">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 