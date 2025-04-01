'use client'

import React, { useState } from 'react'
import { Slack, MessageCircle, Loader2, Users, Clock, Tag, Activity } from 'lucide-react'
import FileUpload from '@/components/FileUpload'

type ResponseStyle = 'formal' | 'friendly' | 'concise'

const RESPONSE_STYLES = {
  formal: {
    label: '🎩 정중한',
    description: '공손하고 격식있는 어조로 작성된 답변'
  },
  friendly: {
    label: '😊 친근한',
    description: '편안하고 친근한 어조로 작성된 답변'
  },
  concise: {
    label: '⚡ 간결한',
    description: '짧고 핵심적인 내용만 담은 답변'
  }
} as const

const RESPONSE_REASONS = {
  formal: [
    '프로젝트 진행 상황을 공식적으로 보고하는 회의 상황',
    '다음 주 테스트 결과에 대한 중요한 피드백이 필요한 상황',
    '프로젝트 매니저가 참석한 공식 회의'
  ],
  friendly: [
    '개발팀 동료들과의 일상적인 업무 소통',
    '프론트엔드와 백엔드 팀 간의 협력적인 분위기',
    '긍정적인 진행 상황(80%, 70% 완료)에 대한 공유'
  ],
  concise: [
    '짧은 시간 내에 핵심 내용만 전달해야 하는 상황',
    '이메일이나 메시지로 빠른 피드백이 필요한 경우',
    '간단한 업데이트나 알림을 전달하는 경우'
  ]
} as const

const platforms = [
  {
    id: 'slack',
    name: 'Slack',
    icon: Slack,
    description: 'Slack 채널이나 DM 대화를 요약합니다.',
  },
  {
    id: 'kakao',
    name: 'KakaoTalk',
    icon: MessageCircle,
    description: '카카오톡 채팅방 대화를 요약합니다.',
  },
]

interface SummaryResultProps {
  result: string;
}

const SummaryResult: React.FC<SummaryResultProps> = ({ result }) => {
  return (
    <div className="animate-fade-in-up py-8">
      <div className="mt-8 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-white/10 relative overflow-hidden rounded-2xl">
        {/* 배경 효과 */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 animate-gradient"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>

        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 animate-pulse">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">요약 결과</h2>
                <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300">AI 분석</span>
              </div>
              <p className="text-sm text-white/60 mt-1">대화 내용을 분석하여 핵심 정보를 추출했습니다</p>
            </div>
          </div>
          
          {/* 통계 정보 섹션 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-white/60">참여자 수</div>
                  <div className="text-lg font-semibold text-white">4명</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-white/60">회의 시간</div>
                  <div className="text-lg font-semibold text-white">30분</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-white/60">키워드</div>
                  <div className="text-lg font-semibold text-white">3개</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-white/60">진행률</div>
                  <div className="text-lg font-semibold text-white">75%</div>
                </div>
              </div>
            </div>
          </div>

          {/* 키워드 태그 */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm">일정 조정</span>
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm">기능 개발</span>
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm">UI/UX 개선</span>
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm">프로젝트 관리</span>
          </div>

          {/* 진행 상태 바 */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/60">프로젝트 진행률</span>
              <span className="text-purple-400">75%</span>
            </div>
            <div className="h-2 bg-white/5 backdrop-blur-sm rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>
            </div>
          </div>

          <div className="grid gap-6">
            {result.split('\n\n').map((section, index) => {
              const [title, ...points] = section.split('\n')
              return (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-purple-500/20 transition-all duration-300 group relative overflow-hidden">
                  {/* 카드 배경 효과 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-sm font-bold text-purple-400">{index + 1}</span>
                      </div>
                      <h3 className="text-base font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">{title}</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-3 text-white/80 group/item">
                          <span className="text-purple-400 mt-1 group-hover/item:text-pink-400 transition-colors duration-300">•</span>
                          <span className="group-hover/item:text-white transition-colors duration-300">{point.trim().replace(/^-\s*/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3 text-white/60 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-4 h-4 text-purple-400" />
                </div>
                <span className="group-hover:text-white transition-colors duration-300">요약 완료</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ResponseSuggestionProps {
  isEditing: boolean
  editedResponse: string
  selectedStyle: ResponseStyle
  onStyleSelect: (style: ResponseStyle) => void
  onEdit: () => void
  onUpdateResponse: (response: string) => void
  onCancelEditing: () => void
  onSaveResponse: () => void
  showReason: boolean
  onToggleReason: () => void
}

const ResponseSuggestion: React.FC<ResponseSuggestionProps> = ({
  isEditing,
  editedResponse,
  selectedStyle,
  onStyleSelect,
  onEdit,
  onUpdateResponse,
  onCancelEditing,
  onSaveResponse,
  showReason,
  onToggleReason
}) => {
  return (
    <div className="animate-fade-in-up py-8">
      <div className="mt-8 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-white/10 relative overflow-hidden rounded-2xl">
        {/* 배경 효과 */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 animate-gradient"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>

        <div className="relative p-8">
          {/* 헤더 섹션: 제목과 복사 버튼 */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              {/* 아이콘과 제목 */}
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 animate-pulse">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">답변 제안</h2>
                  <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300">AI 제안</span>
                </div>
                <p className="text-sm text-white/60 mt-1">회의 내용을 바탕으로 적절한 답변을 제안합니다</p>
              </div>
            </div>
            {/* 복사 버튼 */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(editedResponse)}
                className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                복사
              </button>
            </div>
          </div>

          {/* 답변 스타일 선택 섹션 */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-white/60">답변 스타일:</span>
            <div className="flex gap-2">
              {(Object.keys(RESPONSE_STYLES) as ResponseStyle[]).map((style) => (
                <button
                  key={style}
                  onClick={() => onStyleSelect(style)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    selectedStyle === style
                      ? 'bg-purple-500/30 text-purple-300'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {RESPONSE_STYLES[style].label}
                </button>
              ))}
            </div>
          </div>

          {/* 답변 내용 섹션 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
            {isEditing ? (
              // 편집 모드
              <div className="space-y-4">
                <textarea
                  value={editedResponse}
                  onChange={(e) => onUpdateResponse(e.target.value)}
                  className="w-full h-32 bg-white/5 rounded-lg p-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={onCancelEditing}
                    className="px-4 py-2 bg-white/5 text-white/60 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={onSaveResponse}
                    className="px-4 py-2 bg-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-500/40 transition-colors"
                  >
                    저장
                  </button>
                </div>
              </div>
            ) : (
              // 보기 모드
              <div className="relative group">
                <div className="text-white/80 whitespace-pre-line">{editedResponse}</div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={onToggleReason}
                    className="px-3 py-1 bg-white/5 text-white/60 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {showReason ? '이유 숨기기' : '이유 보기'}
                  </button>
                  <button
                    onClick={onEdit}
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-white/60" />
                  </button>
                </div>
                {/* 답변 작성 이유 섹션 */}
                {showReason && (
                  <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/5">
                    <h4 className="text-sm font-medium text-purple-300 mb-2">답변 작성 이유</h4>
                    <div className="text-sm text-white/60 space-y-2">
                      {RESPONSE_REASONS[selectedStyle].map((reason, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <MessageCircle className="w-4 h-4 text-purple-400 mt-0.5" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 푸터 섹션 */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3 text-white/60 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-4 h-4 text-purple-400" />
                </div>
                <span className="group-hover:text-white transition-colors duration-300">AI 답변 제안</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NewSummaryPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [isSuggesting, setIsSuggesting] = useState(false)
  const [suggestedResponse, setSuggestedResponse] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<ResponseStyle>('formal')
  const [isEditing, setIsEditing] = useState(false)
  const [editedResponse, setEditedResponse] = useState<string>('')
  const [showReason, setShowReason] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlatform || !file) return

    setIsLoading(true)
    try {
      // TODO: 파일 업로드 및 요약 처리
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setResult(`1. 주요 내용
- 프로젝트 진행 상황 공유 회의
- 프론트엔드 개발 진행률 80%
- 백엔드 개발 진행률 70%
- 데이터베이스 설계 완료

2. 참여자별 발언
김철수: 프론트엔드 개발 80% 완료, 다음 주 사용자 테스트 예정
이영희: 백엔드 개발 70% 완료, 데이터베이스 설계 완료, 다음 주 성능 테스트 예정
박지성: 프로젝트 매니저, 다음 주 회의에서 테스트 결과 공유 예정

3. 다음 단계
- 프론트엔드: 나머지 20% 개발 완료 및 사용자 테스트
- 백엔드: 나머지 API 개발 완료 및 성능 테스트
- 다음 주 회의: 테스트 결과 공유`)
    } catch (error) {
      console.error('요약 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestResponse = async () => {
    if (!result) return

    setIsSuggesting(true)
    try {
      // TODO: API 호출 구현
      await new Promise(resolve => setTimeout(resolve, 2000))
      const response = '안녕하세요. 회의 내용을 잘 확인했습니다. 제안하신 사항들에 대해 검토 후 다음 주 월요일까지 피드백 드리도록 하겠습니다.'
      setSuggestedResponse(response)
      setEditedResponse(response)
    } catch (error) {
      console.error('답변 제안 중 오류가 발생했습니다:', error)
    } finally {
      setIsSuggesting(false)
    }
  }

  const handleStyleChange = (style: ResponseStyle) => {
    setSelectedStyle(style)
    // 스타일에 따라 답변 내용 변경
    let newResponse = ''
    switch (style) {
      case 'formal':
        newResponse = '안녕하세요. 회의 내용을 잘 확인했습니다. 제안하신 사항들에 대해 검토 후 다음 주 월요일까지 피드백 드리도록 하겠습니다.'
        break
      case 'friendly':
        newResponse = '안녕하세요! 회의 내용 잘 확인했습니다. 제안하신 내용들 정말 좋네요. 다음 주 월요일까지 검토하고 피드백 드릴게요.'
        break
      case 'concise':
        newResponse = '회의 내용 확인했습니다. 다음 주 월요일까지 피드백 드리겠습니다.'
        break
    }
    setEditedResponse(newResponse)
    setSuggestedResponse(newResponse)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="section-container py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">새로운 대화 요약</h1>
          <p className="text-gray-400">
            대화 내용을 업로드하고 AI로 스마트하게 요약하세요
          </p>
        </div>

        {/* 플랫폼 선택 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`p-6 rounded-2xl border ${
                selectedPlatform === platform.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-white/10 hover:border-white/20 bg-white/5'
              } transition-colors text-left`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5">
                  <platform.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{platform.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {platform.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 파일 업로드 */}
        {selectedPlatform && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <FileUpload
              onFileChange={setFile}
              className="animate-fade-in-up"
            />

            <div className="flex justify-center gap-4">
              <button
                type="submit"
                disabled={!file || isLoading}
                className={`inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isLoading
                    ? 'bg-purple-500/30 text-purple-300'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    요약 중...
                  </>
                ) : (
                  '요약 시작하기'
                )}
              </button>
              <button
                type="button"
                onClick={handleSuggestResponse}
                disabled={!result || isSuggesting}
                className={`inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSuggesting
                    ? 'bg-purple-500/30 text-purple-300'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {isSuggesting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    제안 중...
                  </>
                ) : (
                  '답변 제안'
                )}
              </button>
            </div>
          </form>
        )}

        {/* 답변 제안 결과 */}
        {suggestedResponse && (
          <ResponseSuggestion
            isEditing={isEditing}
            editedResponse={editedResponse}
            selectedStyle={selectedStyle}
            onStyleSelect={handleStyleChange}
            onEdit={() => setIsEditing(true)}
            onUpdateResponse={setEditedResponse}
            onCancelEditing={() => {
              setIsEditing(false)
              setEditedResponse(suggestedResponse)
            }}
            onSaveResponse={() => {
              setIsEditing(false)
              setSuggestedResponse(editedResponse)
            }}
            showReason={showReason}
            onToggleReason={() => setShowReason(!showReason)}
          />
        )}

        {/* 요약 결과 */}
        {result && <SummaryResult result={result} />}
      </div>
    </div>
  )
} 