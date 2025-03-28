import React from 'react'

export default function PersonaProblems() {
  return (
    <section>
      <div className="section-container">
        <div className="card-title">
          <span className="card-title-icon">🎯</span>
          <h2 className="card-title-text">누구에게 필요할까요?</h2>
        </div>
        <div className="grid gap-6">
          <div className="card">
            <div className="flex items-start gap-4">
              <span className="text-3xl">😩</span>
              <div>
                <h3 className="text-xl font-bold mb-2">바쁜 팀장 A</h3>
                <p className="text-base opacity-90">
                  "단톡방에서 중요한 메시지만 알고 싶어요. 회의 중에는 메시지를 못 봤는데, 나중에 500개가 넘는 메시지를 다 읽기가 너무 힘들어요."
                </p>
                <div className="mt-4 card">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <p className="text-sm">
                      <strong>summy의 해결책:</strong> 주요 논의 사항과 결정된 내용만 3줄로 요약해드려요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🫣</span>
              <div>
                <h3 className="text-xl font-bold mb-2">내성적인 디자이너 B</h3>
                <p className="text-base opacity-90">
                  "말 센스가 없어서 답장하기가 어려워요. 대화의 분위기를 잘 못 읽어서 실수할까봐 걱정돼요."
                </p>
                <div className="mt-4 card">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <p className="text-sm">
                      <strong>summy의 해결책:</strong> 대화의 감정과 맥락을 분석해서 적절한 답변 방향을 제안해드려요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start gap-4">
              <span className="text-3xl">😮‍💨</span>
              <div>
                <h3 className="text-xl font-bold mb-2">해외 근무 중인 개발자 C</h3>
                <p className="text-base opacity-90">
                  "시차 때문에 놓친 대화가 너무 많아요. 어떤 이슈가 있었고, 어떻게 해결됐는지 빠르게 파악하고 싶어요."
                </p>
                <div className="mt-4 card">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <p className="text-sm">
                      <strong>summy의 해결책:</strong> 시간대별로 주요 논의 내용을 정리하고 타임라인으로 보여드려요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start gap-4">
              <span className="text-3xl">😅</span>
              <div>
                <h3 className="text-xl font-bold mb-2">썸 타는 중인 대학생 D</h3>
                <p className="text-base opacity-90">
                  "썸녀가 보낸 메시지의 뉘앙스를 잘 모르겠어요. 답장을 잘못하면 어색해질까봐 몇 시간째 고민 중이에요."
                </p>
                <div className="mt-4 card">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <p className="text-sm">
                      <strong>summy의 해결책:</strong> 메시지의 감정과 의도를 분석하고, 자연스러운 답장 방향을 제안해드려요
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