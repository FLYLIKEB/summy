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

// 파일 업로드 관련 상수
export const SUPPORTED_FILE_TYPES = [
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

// 예시 대화 내용
export const EXAMPLE_CONVERSATION = `안녕하세요, 오늘 회의 주제는 프로젝트 진행 상황 공유입니다.

김철수: 안녕하세요, 저는 프론트엔드 개발을 담당하고 있는 김철수입니다.

이영희: 안녕하세요, 백엔드 개발을 담당하고 있는 이영희입니다.

박지성: 안녕하세요, 프로젝트 매니저 박지성입니다. 오늘은 각자 담당하고 있는 부분의 진행 상황을 공유하고, 다음 주까지 해야 할 일들을 정리해보도록 하겠습니다.

김철수: 네, 프론트엔드 쪽에서는 사용자 인터페이스 구현이 80% 정도 완료되었습니다. 다음 주까지는 나머지 20%를 완료하고, 사용자 테스트를 진행할 예정입니다.

이영희: 백엔드 쪽에서는 API 개발이 70% 완료되었고, 데이터베이스 설계도 완료되었습니다. 다음 주에는 나머지 API 개발을 완료하고, 성능 테스트를 진행할 예정입니다.

박지성: 좋습니다. 그럼 다음 주 회의에서는 각자의 진행 상황과 테스트 결과를 공유하도록 하겠습니다. 회의를 마치겠습니다.`;

// 예시 요약 결과
export const EXAMPLE_SUMMARY = `1. 주요 내용
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
- 다음 주 회의: 테스트 결과 공유`; 