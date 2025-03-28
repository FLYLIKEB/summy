import Image from 'next/image'

export default function Demo() {
  return (
    <section>
      <div className="section-container">
        <h2 className="section-title">
          대화 내용을 한눈에 파악하세요
        </h2>
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Image
              src="/images/mockups/demo_1.png"
              alt="Original KakaoTalk group chat"
              width={400}
              height={600}
              className="w-full h-auto aspect-[2/3] object-contain"
            />
            <Image
              src="/images/mockups/demo_2.png"
              alt="Summarized chat by Summy"
              width={400}
              height={600}
              className="w-full h-auto aspect-[2/3] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 