// 요약 생성 프롬프트 템플릿
export const SUMMARY_PROMPT_TEMPLATE = `다음 대화 내용을 요약하고 필요한 메타데이터를 추출해주세요.

다음 JSON 형식으로 응답해주세요:
{
  "summary": {
    "mainPoints": [
      "프로젝트 상황에 대한 요약",
      "진행 상황에 대한 요약",
      "기타 정보에 대한 요약"
    ],
    "participantComments": [
      "이름1: 담당, 진행 상황",
      "이름2: 담당, 진행 상황"
    ],
    "nextSteps": [
      "다음 작업 목록",
      "추가 작업 계획",
      "일정 계획"
    ]
  },
  "metadata": {
    "participants": $PARTICIPANTS,
    "keywords": [
      "핵심키워드1", 
      "핵심키워드2", 
      "핵심키워드3", 
      "핵심키워드4"
    ],
    "time": "$TIME",
    "progress": $PROGRESS
  }
}

위 형식으로 대화 내용을 요약해주세요:
1. summary 필드에는 대화 내용을 구조화된 형태로 요약해주세요.
2. metadata 필드에는 다음 정보를 포함해주세요:
   - participants: 대화에 참여한 사람 수를 숫자로
   - keywords: 대화에서 추출한 주요 키워드를 배열로
   - time: 대화 진행 시간 추정치를 "분" 단위로
   - progress: 프로젝트 진행률 추정치를 0-100 사이 퍼센트로

대화에서 진행률이 명시되지 않은 경우 대화 내용의 맥락에 따라 0-100 사이 값으로 추정해주세요.
특히 metadata.keywords는 $KEYWORDS개의 중요 키워드를 배열 형태로 제공해주세요.

대화 내용:
$MESSAGE`;

// 응답 생성 프롬프트 템플릿
export const RESPONSE_PROMPT_TEMPLATE = `다음 회의/대화 내용을 요약하고 $STYLE_DESCRIPTION

대화 내용: $MESSAGE

아래 JSON 형식으로 응답해주세요. 응답의 처음부터 끝까지 정확한 JSON 형식을 유지해주세요:

{
  "summary": {
    "mainPoints": [
      "주요 내용 1",
      "주요 내용 2",
      "주요 내용 3"
    ],
    "participantComments": [
      "참여자별 발언 1",
      "참여자별 발언 2"
    ],
    "nextSteps": [
      "다음 단계 1",
      "다음 단계 2",
      "다음 단계 3"
    ]
  },
  "metadata": {
    "participants": $PARTICIPANTS,
    "keywords": [
      "핵심키워드1", 
      "핵심키워드2", 
      "핵심키워드3", 
      "핵심키워드4"
    ],
    "time": "$TIME",
    "progress": $PROGRESS
  }
}

JSON 형식으로만 응답하며, 각 항목은 대화 내용을 잘 요약해야 합니다. 특히 metadata.keywords는 가장 중요한 키워드 $KEYWORDS개를 배열 형태로 제공해주세요.`;

// 스타일별 설명 및 예시
export const STYLE_DESCRIPTIONS = {
  formal: {
    description: '정중하고 공손한 답변을 작성해주세요. 격식을 갖추고, 전문적인 어조를 유지하세요.',
    example: '안녕하세요. 회의 내용을 잘 확인했습니다. 제안하신 사항들에 대해 검토 후 다음 주 월요일까지 피드백 드리도록 하겠습니다.'
  },
  friendly: {
    description: '친근하고 편안한 답변을 작성해주세요. 격식은 조금 줄이고, 친근한 어조로 작성하세요.',
    example: '안녕하세요! 회의 내용 잘 확인했어요. 제안해주신 내용들 정말 좋네요. 다음 주 월요일까지 검토하고 피드백 드릴게요!'
  },
  concise: {
    description: '간결하고 핵심만 담긴 답변을 작성해주세요. 불필요한 내용 없이 핵심 메시지만 전달하세요.',
    example: '회의 내용 확인했습니다. 다음 주 월요일까지 피드백 드리겠습니다.'
  }
};

// 기본값 설정
export const DEFAULT_VALUES = {
  participants: 2,
  keywords: 4, 
  time: '30분',
  progress: 75,
  style: 'formal',
  userName: '지우'
}; 