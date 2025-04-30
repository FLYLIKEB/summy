/** 응답 스타일을 정의하는 타입 - 공식적, 친근한, 간단한 스타일 중 선택 */
export type ResponseStyle = 'formal' | 'friendly' | 'concise';

/** 파일 업로드 상태를 관리하는 인터페이스 */
export interface FileUploadState {
  /** 드래그 중인지 여부 */
  isDragging: boolean;
  /** 업로드된 파일 객체 */
  uploadedFile: File | null;
  /** 업로드된 파일명 */
  fileName: string;
}

/** 요약 상태를 관리하는 인터페이스 */
export interface SummaryState {
  /** 요약 처리 중인지 여부 */
  isSummarizing: boolean;
  /** 요약 결과 텍스트 */
  result: string;
}

/** 응답 관련 상태를 관리하는 인터페이스 */
export interface ResponseState {
  /** 응답 제안 처리 중인지 여부 */
  isSuggesting: boolean;
  /** 제안된 응답 텍스트 */
  suggestedResponse: string;
  /** 선택된 응답 스타일 */
  selectedStyle: ResponseStyle;
  /** 응답 편집 모드 여부 */
  isEditing: boolean;
  /** 편집된 응답 텍스트 */
  editedResponse: string;
  /** 이유 표시 여부 */
  showReason: boolean;
}

/** 통계 정보를 담는 인터페이스 */
export interface Statistics {
  /** 참가자 수 */
  participants: number;
  /** 소요 시간 */
  duration: string;
  /** 키워드 수 */
  keywords: number;
  /** 진행률 */
  progress: number;
}

/** 키워드 정보를 담는 인터페이스 */
export interface Keyword {
  /** 키워드 텍스트 */
  text: string;
  /** 키워드 색상 */
  color: string;
}

/** 요약 섹션을 정의하는 인터페이스 */
export interface SummarySection {
  /** 섹션 제목 */
  title: string;
  /** 요약 포인트 목록 */
  points: string[];
}

/** 참가자 정보를 담는 인터페이스 */
export interface Participant {
  /** 참가자 이름 */
  name: string;
  /** 참가자 내용 */
  content: string;
}

/** 타임라인 항목을 정의하는 인터페이스 */
export interface TimelineItem {
  /** 날짜 */
  date: string;
  /** 내용 */
  content: string;
}

/** 액션 버튼 컴포넌트의 props 인터페이스 */
export interface ActionButtonsProps {
  /** 요약 처리 중인지 여부 */
  isSummarizing: boolean
  /** 응답 제안 처리 중인지 여부 */
  isSuggesting: boolean
  /** 요약 실행 함수 */
  onSummarize: () => void
  /** 응답 제안 실행 함수 */
  onSuggestResponse: () => void
} 