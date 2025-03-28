import Image from 'next/image'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">✨ summy</h1>
        <p className="text-xl mb-8">복잡한 정보를 한눈에</p>
        <div className="interview-card max-w-2xl mx-auto">
          <p className="text-lg opacity-90">
            summy는 복잡하고 방대한 정보를 빠르고 쉽게 이해할 수 있도록 요약해주는 스마트 요약 서비스입니다.
            <br />읽어야 할 보고서, 논문, 뉴스, 이메일이 너무 많을 때, summy가 대신 읽고 핵심만 알려줘요.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="interview-card">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-2xl font-bold">무엇이든 요약합니다</h2>
          </div>
          <p className="text-lg opacity-90">
            텍스트, 웹페이지, PDF, 영상 스크립트 등 다양한 형태의 콘텐츠를 지원해요. 
            단 몇 초 만에 핵심 아이디어, 요점, 키워드를 깔끔하게 추출해드립니다.
          </p>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="mb-16">
        <div className="interview-card">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🎯</span>
            <h2 className="text-2xl font-bold">누구에게 필요할까요?</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">👩‍🎓</span>
              </div>
              <p className="text-lg">리서치에 바쁜 학생과 연구자</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <p className="text-lg">많은 문서를 처리하는 직장인과 기획자</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">👩‍💻</span>
              </div>
              <p className="text-lg">새로운 트렌드를 빠르게 알고 싶은 마케터와 콘텐츠 크리에이터</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Features Section */}
      <section>
        <div className="interview-card">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🤖</span>
            <h2 className="text-2xl font-bold">summy의 특별한 점</h2>
          </div>
          <div className="space-y-4">
            <div className="persona-card">
              <h3 className="font-bold mb-2">AI 기반 요약으로 높은 정확도</h3>
              <div className="progress-bar">
                <div className="progress-fill bg-purple-400" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div className="persona-card">
              <h3 className="font-bold mb-2">문맥과 목적에 따라 요약 방식 선택 가능</h3>
              <div className="flex flex-wrap gap-2">
                <span className="tag">간단 요약</span>
                <span className="tag">요점 정리</span>
                <span className="tag">키워드 추출</span>
              </div>
            </div>
            <div className="persona-card">
              <h3 className="font-bold mb-2">요약본에 코멘트와 인사이트 추가도 가능</h3>
              <p className="text-sm opacity-90">
                AI가 제안하는 인사이트를 통해 더 깊이 있는 이해가 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-16">
        <p className="text-xl mb-4">지금 바로 summy와 함께, 시간을 아끼고 본질에 집중하세요.</p>
        <p className="text-lg opacity-90">당신의 정보를 더 똑똑하게 다루는 방법, summy입니다.</p>
      </section>
    </main>
  )
} 