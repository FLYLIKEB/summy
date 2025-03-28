export default function Demo() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">이런 식으로 정리해드려요!</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Chat */}
            <div className="interview-card">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">💬</span>
                <h3 className="font-bold">원본 대화</h3>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">진아</span>
                  </div>
                  <div className="persona-card flex-1">
                    <p>다들 회식 언제가 괜찮으신가요?</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">미영</span>
                  </div>
                  <div className="persona-card flex-1">
                    <p>저는 다음주 수요일 빼고 다 괜찮아요!</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">현우</span>
                  </div>
                  <div className="persona-card flex-1">
                    <p>저도 수요일은 클라이언트 미팅이 있어서 어려울 것 같네요 ㅠ</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">진아</span>
                  </div>
                  <div className="persona-card flex-1">
                    <p>그럼 다음주 목요일은 어떠신가요? 저희 회사 근처에 새로 생긴 칼국수 맛집이 있더라구요!</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">승민</span>
                  </div>
                  <div className="persona-card flex-1">
                    <p>오 좋네요! 저도 목요일 가능합니다 👍</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Result */}
            <div className="interview-card">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">✨</span>
                <h3 className="font-bold">summy의 요약</h3>
              </div>
              <div className="space-y-6">
                <div className="persona-card">
                  <h4 className="font-medium mb-2">주요 결정사항</h4>
                  <p className="text-base">회식 일정이 다음주 목요일로 확정되었습니다.</p>
                </div>
                <div className="persona-card">
                  <h4 className="font-medium mb-2">장소</h4>
                  <p className="text-base">회사 근처 새로 생긴 칼국수 맛집</p>
                </div>
                <div className="persona-card">
                  <h4 className="font-medium mb-2">참석 현황</h4>
                  <div className="flex gap-1">
                    <span className="tag">진아</span>
                    <span className="tag">미영</span>
                    <span className="tag">현우</span>
                    <span className="tag">승민</span>
                  </div>
                </div>
                <div className="persona-card">
                  <h4 className="font-medium mb-2">특이사항</h4>
                  <p className="text-base">수요일은 미영님과 현우님이 불가능 (미팅 일정)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 