import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/card'
import { Icon } from './common/Icon'
import { DEFAULT_KEYWORDS } from '../constants'

interface SummaryResultProps {
  result: string
  error: string | null
}

// API 응답에서 참여자 수 추출 함수
const extractParticipantCount = (text: string): number => {
  const participantMatch = text.match(/참여자.*?(\d+)명/);
  return participantMatch ? parseInt(participantMatch[1]) : 2;
};

// 진행률 추출 함수
const extractProgress = (text: string): number => {
  const progressMatch = text.match(/진행.*?(\d+)%/);
  return progressMatch ? parseInt(progressMatch[1]) : 75;
};

// API 응답에서 키워드 추출 함수
const extractKeywords = (text: string): string[] => {
  // 기본 키워드가 없으면 텍스트에서 추출
  const keywordMatches = text.match(/키워드|주제|핵심단어/i);
  if (keywordMatches) {
    const keywordLine = text.split('\n').find(line => 
      line.includes('키워드') || line.includes('주제') || line.includes('핵심단어')
    );
    if (keywordLine) {
      return keywordLine
        .replace(/.*?[:：]/g, '')
        .split(/[,，、\s]+/)
        .filter(k => k.trim().length > 0)
        .map(k => k.trim());
    }
  }
  
  // 프로젝트 관련 기본 키워드 추출
  const projectKeywords = [];
  if (text.includes('프로젝트')) projectKeywords.push('프로젝트');
  if (text.includes('개발')) projectKeywords.push('개발');
  if (text.includes('구현')) projectKeywords.push('구현');
  if (text.includes('기능')) projectKeywords.push('기능');
  if (text.includes('디자인')) projectKeywords.push('디자인');
  if (text.includes('UI') || text.includes('UX')) projectKeywords.push('UI/UX');
  if (text.includes('계획')) projectKeywords.push('계획');
  if (text.includes('일정')) projectKeywords.push('일정');
  if (text.includes('진행')) projectKeywords.push('진행');
  
  return projectKeywords.length > 0 ? projectKeywords : DEFAULT_KEYWORDS;
};

// 새로운 파싱 함수 - API 응답을 대분류로 구분
const parseStructuredContent = (text: string): {sectionNumber: number, title: string, points: string[]}[] => {
  const result: {sectionNumber: number, title: string, points: string[]}[] = [];
  
  // 텍스트를 줄 단위로 분리
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  let currentSection: {sectionNumber: number, title: string, points: string[]} | null = null;
  let currentSubsection: string | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 대분류 식별 (1. 주요 내용, 2. 참여자별 발언, 3. 다음 단계 등)
    const sectionMatch = line.match(/^\d+\.\s*(.*)/);
    if (sectionMatch) {
      // 이전 섹션이 있으면 저장
      if (currentSection) {
        result.push(currentSection);
      }
      
      // 새 섹션 시작
      currentSection = {
        sectionNumber: result.length + 1,
        title: sectionMatch[1],
        points: []
      };
      currentSubsection = null;
      continue;
    }
    
    // 항목 라인 (- 또는 • 로 시작하는 줄)
    if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
      if (currentSection) {
        const pointText = line.replace(/^[-•*]\s*/, '').trim();
        
        // 하위 섹션 확인 (이름: 내용 형식)
        const subsectionMatch = pointText.match(/^([^:]+):(.*)/);
        if (subsectionMatch && !currentSubsection) {
          currentSubsection = subsectionMatch[1].trim();
          currentSection.points.push(pointText);
        } else {
          currentSection.points.push(pointText);
        }
      }
      continue;
    }
    
    // 일반 텍스트라인 - 이전 포인트의 연속으로 처리
    if (currentSection && line.length > 0) {
      // 새 하위 섹션 확인
      const subsectionMatch = line.match(/^([^:]+):(.*)/);
      if (subsectionMatch) {
        currentSubsection = subsectionMatch[1].trim();
        currentSection.points.push(line);
      } 
      // 짧은 라인은 하위 제목일 수 있음
      else if (line.length < 30 && !line.includes('：') && !line.includes(':')) {
        currentSection.points.push(line);
      }
      // 일반 내용은 이전 포인트에 추가
      else {
        currentSection.points.push(line);
      }
    }
  }
  
  // 마지막 섹션 추가
  if (currentSection) {
    result.push(currentSection);
  }
  
  // 기본 섹션이 없으면 기본값 추가
  if (result.length === 0) {
    const fallbackSections = [
      {
        sectionNumber: 1,
        title: '주요 내용',
        points: text.split('\n').filter(line => line.trim().length > 0)
      }
    ];
    return fallbackSections;
  }
  
  return result;
};

export const SummaryResult: React.FC<SummaryResultProps> = ({ result, error }) => {
  // 오류가 있는 경우 오류 메시지 표시
  if (error) {
    return (
      <div className="py-4 sm:py-6">
        <Card 
          variant="glass"
          padding="lg"
          className="apple-card overflow-hidden"
        >
          <div className="mb-5 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2c2c30] flex items-center justify-center">
                <span className="text-lg">⚠️</span>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-medium">요약 오류</h2>
                <p className="text-xs sm:text-sm text-white/60 mt-1">요약을 생성하는 중 문제가 발생했습니다</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1c1c1e] rounded-lg p-4 border border-white/[0.04] mb-5">
            <p className="text-white/70">{error}</p>
          </div>
          
          <div className="text-sm text-white/50">
            다시 시도하거나 다른 입력을 사용해 보세요.
          </div>
        </Card>
      </div>
    )
  }
  
  // 결과가 없는 경우 빈 컴포넌트 반환
  if (!result) {
    return null;
  }

  // 결과에서 정보 추출
  const participantCount = extractParticipantCount(result);
  const keywords = extractKeywords(result);
  const progress = extractProgress(result);
  
  // 구조화된 컨텐츠 파싱
  const sections = parseStructuredContent(result);
  
  // 키워드 개수
  const keywordCount = Math.min(keywords.length, 9); // 최대 9개로 제한

  return (
    <div className="py-4 sm:py-6">
      <Card 
        variant="glass"
        padding="lg"
        className="apple-card overflow-hidden"
      >
        <div className="mb-5 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2c2c30] flex items-center justify-center">
              <span className="text-lg">📝</span>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-medium">요약 결과</h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">대화 내용에서 추출한 핵심 정보입니다</p>
            </div>
          </div>
        </div>
        
        {/* 통계 정보 섹션 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="bg-[#1c1c1e] rounded-lg p-3 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2c2c30] flex items-center justify-center">
                <span className="text-base">👥</span>
              </div>
              <div>
                <div className="text-xs text-white/50">참여자</div>
                <div className="text-base font-medium">{participantCount}명</div>
              </div>
            </div>
          </div>
          <div className="bg-[#1c1c1e] rounded-lg p-3 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2c2c30] flex items-center justify-center">
                <span className="text-base">⏱️</span>
              </div>
              <div>
                <div className="text-xs text-white/50">시간</div>
                <div className="text-base font-medium">30분</div>
              </div>
            </div>
          </div>
          <div className="bg-[#1c1c1e] rounded-lg p-3 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2c2c30] flex items-center justify-center">
                <span className="text-base">🏷️</span>
              </div>
              <div>
                <div className="text-xs text-white/50">키워드</div>
                <div className="text-base font-medium">{keywordCount}개</div>
              </div>
            </div>
          </div>
          <div className="bg-[#1c1c1e] rounded-lg p-3 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2c2c30] flex items-center justify-center">
                <span className="text-base">📊</span>
              </div>
              <div>
                <div className="text-xs text-white/50">진행률</div>
                <div className="text-base font-medium">{progress}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* 키워드 태그 */}
        <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
          {keywords.slice(0, 9).map((keyword, index) => (
            <span 
              key={index} 
              className="px-3 py-1 rounded-full text-xs bg-[#2c2c30] text-white/70"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* 진행 상태 바 */}
        <div className="mb-5 sm:mb-6">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-white/50">프로젝트 진행률</span>
            <span className="text-white/80">{progress}%</span>
          </div>
          <div className="h-1.5 bg-[#2c2c30] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-mint-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 대분류별 카드 표시 */}
        <div className="grid gap-5 sm:gap-6">
          {sections.map((section, index) => (
            <Card 
              key={index} 
              variant="outline" 
              padding="md" 
              className="bg-[#1c1c1e] border-white/[0.04]"
            >
              {/* 대분류 제목 */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#2c2c30] flex items-center justify-center">
                  <span className="text-xs font-medium text-white/70">{section.sectionNumber}</span>
                </div>
                <h3 className="text-sm font-medium">{section.title}</h3>
              </div>
              
              {/* 내용 항목 */}
              <ul className="space-y-3 text-sm">
                {section.points.map((point, pointIndex) => {
                  // 하위 제목 확인 (이름: 내용 형식)
                  const isSubheading = point.includes(':') && point.split(':')[0].length < 20;
                  
                  if (isSubheading) {
                    const [name, content] = point.split(':');
                    return (
                      <li key={pointIndex} className="flex flex-col gap-1">
                        <div className="flex items-start gap-2">
                          <span className="text-white/40 mt-1">•</span>
                          <span className="font-medium text-white/90">{name.trim()}:</span>
                          <span className="text-white/70">{content.trim()}</span>
                        </div>
                      </li>
                    );
                  } else {
                    return (
                      <li key={pointIndex} className="flex items-start gap-2 text-white/70">
                        <span className="text-white/40 mt-1">•</span>
                        <span>{point.replace(/^[-•*]\s*/, '')}</span>
                      </li>
                    );
                  }
                })}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-5 sm:mt-6 pt-4 border-t border-white/[0.04]">
          <div className="flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#2c2c30] flex items-center justify-center">
                <span className="text-xs">⏱️</span>
              </div>
              <span>방금 생성됨</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 