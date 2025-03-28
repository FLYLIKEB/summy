import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero'
import Demo from '@/components/Demo'
import PersonaProblems from '@/components/PersonaProblems'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
      <Hero />
        <Demo />
        <PersonaProblems />

        {/* Persona Problems Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                <div className="interview-card">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">😩</span>
                    <div>
                      <h3 className="text-xl font-bold mb-2">바쁜 팀장 A</h3>
                      <p className="text-lg opacity-90">
                        "단톡방에서 중요한 메시지만 알고 싶어요. 회의 중에는 메시지를 못 봤는데, 나중에 500개가 넘는 메시지를 다 읽기가 너무 힘들어요."
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 ml-14">
                    <div className="persona-card">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">✨</span>
                        <p className="text-base">
                          <strong>summy의 해결책:</strong> 주요 논의 사항과 결정된 내용만 3줄로 요약해드려요
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="interview-card">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">🫣</span>
                    <div>
                      <h3 className="text-xl font-bold mb-2">내성적인 디자이너 B</h3>
                      <p className="text-lg opacity-90">
                        "말 센스가 없어서 답장하기가 어려워요. 대화의 분위기를 잘 못 읽어서 실수할까봐 걱정돼요."
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 ml-14">
                    <div className="persona-card">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">✨</span>
                        <p className="text-base">
                          <strong>summy의 해결책:</strong> 대화의 감정과 맥락을 분석해서 적절한 답변 방향을 제안해드려요
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="interview-card">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">😮‍💨</span>
                    <div>
                      <h3 className="text-xl font-bold mb-2">해외 근무 중인 개발자 C</h3>
                      <p className="text-lg opacity-90">
                        "시차 때문에 놓친 대화가 너무 많아요. 어떤 이슈가 있었고, 어떻게 해결됐는지 빠르게 파악하고 싶어요."
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 ml-14">
                    <div className="persona-card">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">✨</span>
                        <p className="text-base">
                          <strong>summy의 해결책:</strong> 시간대별로 주요 논의 내용을 정리하고 타임라인으로 보여드려요
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

        {/* Final CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="interview-card max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">
                지금 바로 시작해보세요
              </h2>
              <p className="text-xl mb-8 opacity-90">
                매일 쌓이는 메시지와 씨름하지 마세요.<br />
                summy와 함께라면 단 몇 초만에 핵심을 파악할 수 있습니다.
              </p>
              <div className="flex gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-purple-700 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all">
                  무료로 시작하기
                </button>
                <button className="px-8 py-4 bg-white bg-opacity-10 text-white rounded-full font-bold text-lg hover:bg-opacity-20 transition-all border border-white border-opacity-20">
                  요약 체험하기
                </button>
              </div>
              <p className="mt-6 text-sm opacity-70">
                ✨ 첫 달 무료 · 언제든 해지 가능 · 설치 필요 없음
              </p>
            </div>
          </div>
        </section>
    </main>

      {/* Footer */}
      <footer className="border-t border-white border-opacity-10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">summy</h3>
              <p className="text-sm opacity-70">
                복잡한 대화를 쉽게 이해하는<br />
                AI 기반 메시지 요약 서비스
              </p>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h4 className="font-bold">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-sm opacity-70 hover:opacity-100">
                    주요 기능
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-sm opacity-70 hover:opacity-100">
                    요금제
                  </Link>
                </li>
                <li>
                  <Link href="#demo" className="text-sm opacity-70 hover:opacity-100">
                    데모 체험
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-bold">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm opacity-70 hover:opacity-100">
                    회사 소개
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm opacity-70 hover:opacity-100">
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm opacity-70 hover:opacity-100">
                    이용약관
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-bold">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="mailto:contact@summy.ai" 
                    className="text-sm opacity-70 hover:opacity-100"
                  >
                    contact@summy.ai
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/FLYLIKEB/summy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm opacity-70 hover:opacity-100"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white border-opacity-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm opacity-70">
                © 2024 summy. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-sm opacity-70">
                <span>Made with 💜 by</span>
                <a 
                  href="https://github.com/FLYLIKEB" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-100"
                >
                  FLYLIKEB
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 