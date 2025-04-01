import Link from 'next/link';

export default function ContactCTA() {
  return (
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
  );
} 