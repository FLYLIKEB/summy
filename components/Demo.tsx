import Image from 'next/image'
import Link from 'next/link'

export default function Demo() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">✨ 체험해보세요</h2>
          <p className="text-gray-400">실제로 summy를 사용해보고 경험해보세요</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-[3/2]">
            <Image
              src="/images/mockups/demo_1.png"
              alt="summy 데모 1"
              fill
              className="rounded-lg shadow-xl object-cover"
              priority
            />
          </div>
          <div className="relative aspect-[3/2]">
            <Image
              src="/images/mockups/demo_2.png"
              alt="summy 데모 2"
              fill
              className="rounded-lg shadow-xl object-cover"
              priority
            />
          </div>
        </div>
        <div className="text-center mt-12">
          <Link
            href="/demo"
            className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            지금 시작하기
          </Link>
        </div>
      </div>
    </section>
  )
} 