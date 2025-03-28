import Image from 'next/image'

export default function Demo() {
  return (
    <section>
      <div className="section-container">
        <div className="card">
          <div className="card-title">
            <span className="card-title-icon">✨</span>
            <h2 className="card-title-text">이런 식으로 정리해드려요!</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-[3/4]">
              <Image
                src="/images/mockups/demo_1.png"
                alt="카카오톡 단체 채팅방 예시"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative aspect-[3/4]">
              <Image
                src="/images/mockups/demo_2.png"
                alt="Summy가 요약한 결과"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 