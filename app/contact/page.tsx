import React from 'react'

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="section-container py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-4">
            💬 문의하기
          </h1>
          <p className="text-xl text-white/80">
            궁금한 점이 있으시다면 언제든 문의해주세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* 문의 양식 */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6">문의 양식</h2>
            <form action="/api/contact" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium mb-2">
                  문의 유형
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="">선택해주세요</option>
                  <option value="general">일반 문의</option>
                  <option value="billing">결제 관련</option>
                  <option value="technical">기술 지원</option>
                  <option value="business">비즈니스 문의</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  문의 내용
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                  placeholder="문의하실 내용을 자세히 작성해주세요"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                문의하기
              </button>
            </form>
          </div>

          {/* 연락처 정보 */}
          <div className="space-y-8">
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">연락처 정보</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <h3 className="font-medium">이메일</h3>
                    <a 
                      href="mailto:support@summy.ai" 
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      support@summy.ai
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <h3 className="font-medium">카카오톡</h3>
                    <a 
                      href="https://pf.kakao.com/_xxxxx" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      카카오톡 채널 추가하기
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <h3 className="font-medium">주소</h3>
                    <p className="text-white/80">
                      서울특별시
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">자주 묻는 문의</h2>
              <div className="space-y-4">
                <a 
                  href="/faq#billing" 
                  className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <h3 className="font-medium mb-2">결제 관련 문의</h3>
                  <p className="text-sm text-white/60">
                    요금제 변경, 환불, 결제 오류 등
                  </p>
                </a>
                <a 
                  href="/faq#technical" 
                  className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <h3 className="font-medium mb-2">기술 지원</h3>
                  <p className="text-sm text-white/60">
                    기능 사용법, 오류 해결, API 연동 등
                  </p>
                </a>
                <a 
                  href="/faq#business" 
                  className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <h3 className="font-medium mb-2">비즈니스 문의</h3>
                  <p className="text-sm text-white/60">
                    기업 맞춤형 요금제, API 사용 등
                  </p>
                </a>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">응답 시간</h2>
              <div className="space-y-2">
                <p className="text-white/80">
                  일반 문의: 24시간 이내
                </p>
                <p className="text-white/80">
                  긴급 문의: 4시간 이내
                </p>
                <p className="text-sm text-white/60">
                  * 주말 및 공휴일은 다음 영업일로 연장될 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 