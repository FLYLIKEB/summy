import React from 'react'

export default function PersonaProblems() {
  return (
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
  )
} 