export const RESPONSE_STYLES = {
  formal: {
    label: '정중한',
    description: '공손하고 격식있는 어조로 작성된 답변'
  },
  friendly: {
    label: '친근한',
    description: '편안하고 친근한 어조로 작성된 답변'
  },
  professional: {
    label: '전문적인',
    description: '전문적이고 신뢰감 있는 어조로 작성된 답변'
  }
} as const;

export const RESPONSE_REASONS = {
  formal: [
    '상대방과의 관계가 공식적이거나 격식이 필요한 상황',
    '중요한 의사결정이나 협의가 필요한 경우',
    '상대방의 지위나 직급이 높은 경우'
  ],
  friendly: [
    '일상적인 소통이나 친근한 관계의 상황',
    '긍정적인 피드백이나 격려가 필요한 경우',
    '상대방과의 관계가 친밀한 경우'
  ],
  professional: [
    '업무 관련 전문적인 의사소통이 필요한 경우',
    '기술적인 내용이나 전문 용어를 포함하는 경우',
    '신뢰성과 전문성이 강조되어야 하는 경우'
  ]
} as const;

export type ResponseStyle = keyof typeof RESPONSE_STYLES; 