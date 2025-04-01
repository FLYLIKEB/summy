export type ResponseStyle = 'formal' | 'friendly' | 'concise';

export interface FileUploadState {
  isDragging: boolean;
  uploadedFile: File | null;
  fileName: string;
}

export interface SummaryState {
  isSummarizing: boolean;
  result: string;
}

export interface ResponseState {
  isSuggesting: boolean;
  suggestedResponse: string;
  selectedStyle: ResponseStyle;
  isEditing: boolean;
  editedResponse: string;
  showReason: boolean;
}

export interface Statistics {
  participants: number;
  duration: string;
  keywords: number;
  progress: number;
}

export interface Keyword {
  text: string;
  color: string;
}

export interface SummarySection {
  title: string;
  points: string[];
}

export interface Participant {
  name: string;
  content: string;
}

export interface TimelineItem {
  date: string;
  content: string;
} 