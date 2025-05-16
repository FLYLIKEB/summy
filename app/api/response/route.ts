import { NextResponse } from 'next/server';
import { 
  sendApiRequest, 
  sanitizeInput, 
  parseJsonResponse, 
  createErrorResponse,
  createFallbackResponse,
  getResponsePrompt,
  ResponseStyle
} from '../../lib/api-utils';
import { DEFAULT_VALUES } from '../../constants/templates';

/**
 * 응답 생성 API
 * 
 * 입력된 텍스트를 분석하고 응답을 생성합니다.
 * 스타일 옵션을 적용하여 다양한 형식의 응답을 지원합니다.
 */
export async function POST(request: Request) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    const { 
      message, 
      style = DEFAULT_VALUES.style as ResponseStyle, 
      time = DEFAULT_VALUES.time, 
      progress = DEFAULT_VALUES.progress, 
      participants = DEFAULT_VALUES.participants, 
      keywords = DEFAULT_VALUES.keywords 
    } = body as { 
      message?: string, 
      style?: ResponseStyle,
      time?: string,
      progress?: number,
      participants?: number,
      keywords?: number
    };
    
    // 입력 텍스트 정리
    const sanitizedMessage = sanitizeInput(message || '');
    
    // 응답 프롬프트 생성
    const prompt = getResponsePrompt(sanitizedMessage, { 
      style, 
      participants, 
      keywords, 
      time, 
      progress 
    });
    
    // API 요청 전송
    const response = await sendApiRequest(prompt, 'Response API');
    
    // API 응답에서 내용 추출 및 처리
    if (response && response.choices && response.choices.length > 0) {
      const content = response.choices[0].message.content;
      
      try {
        // JSON 응답 파싱
        const parsedJson = parseJsonResponse(content);
        
        // 응답 데이터 추출
        const mainPoints = parsedJson.summary?.mainPoints || [];
        const participantComments = parsedJson.summary?.participantComments || [];
        const nextSteps = parsedJson.summary?.nextSteps || [];
        const extractedKeywords = parsedJson.metadata?.keywords || [];
        const extractedTime = parsedJson.metadata?.time || time;
        const extractedProgress = parsedJson.metadata?.progress !== undefined 
          ? parsedJson.metadata.progress 
          : progress;
        const extractedParticipants = parsedJson.metadata?.participants || participants;

        return NextResponse.json({
          summary: {
            mainPoints: mainPoints,
            participantComments: participantComments,
            nextSteps: nextSteps
          },
          participants: extractedParticipants,
          keywords: extractedKeywords,
          time: extractedTime,
          progress: extractedProgress,
          style: style
        });
      } catch (parseError) {
        console.error('JSON 파싱 오류:', parseError);
        
        // JSON 파싱에 실패하면 기본 데이터 제공
        const fallbackResponse = createFallbackResponse({
          participants,
          keywords,
          time,
          progress
        });
        
        return NextResponse.json({
          ...fallbackResponse,
          style
        });
      }
    } else {
      throw new Error('응답 데이터 형식이 올바르지 않습니다.');
    }
  } catch (error: any) {
    console.error('Response API 오류:', error);
    
    // 에러 응답 생성
    const { status, message } = createErrorResponse(error);
    
    // 개발 환경에서는 샘플 응답 제공
    if (process.env.NODE_ENV === 'development') {
      console.log('[Response API] 개발 환경에서 샘플 응답 제공');
      
      // 요청 파라미터 가져오기
      const requestBody = await request.clone().json().catch(() => ({}));
      const currentStyle = ((requestBody?.style as ResponseStyle) || DEFAULT_VALUES.style) as ResponseStyle;
      const currentTime = requestBody?.time || DEFAULT_VALUES.time;
      const currentProgress = requestBody?.progress || DEFAULT_VALUES.progress;
      const currentParticipants = requestBody?.participants || DEFAULT_VALUES.participants;
      const currentKeywords = requestBody?.keywords || DEFAULT_VALUES.keywords;
      
      // 스타일별 샘플 응답
      const sampleResponses: Record<ResponseStyle, any> = {
        formal: {
          summary: {
            mainPoints: [
              "팀에서 제안한 새로운 기능 개발에 대한 논의가 있었습니다",
              "디자인 개선안에 대한 피드백이 공유되었습니다",
              "다음 릴리즈 일정에 대한 조율이 이루어졌습니다"
            ],
            participantComments: [
              "지우: 디자인 개선안에 긍정적인 의견 제시",
              "팀원1: 기능 개발 일정 공유",
              "팀원2: 테스트 계획 제안"
            ],
            nextSteps: [
              "다음 주 월요일까지 디자인 개선안 확정",
              "화요일 전체 회의에서 개발 일정 재논의",
              "금요일까지 테스트 케이스 작성"
            ]
          },
          participants: currentParticipants,
          keywords: ["디자인", "개발", "일정", "테스트"],
          time: currentTime,
          progress: currentProgress,
          style: 'formal'
        },
        friendly: {
          summary: {
            mainPoints: [
              "새로운 기능 아이디어에 대한 브레인스토밍 진행",
              "현재 진행 중인 작업 현황 공유",
              "팀 협업 방식 개선을 위한 제안 논의"
            ],
            participantComments: [
              "지우: 사용자 경험 개선을 위한 아이디어 제안",
              "팀원1: 현재 진행 상황 공유",
              "팀원2: 협업 도구 활용 방안 제시"
            ],
            nextSteps: [
              "추가 아이디어 수집 및 정리",
              "우선순위 결정을 위한 회의 일정 잡기",
              "협업 도구 테스트 및 적용 방안 검토"
            ]
          },
          participants: currentParticipants,
          keywords: ["아이디어", "협업", "사용자경험", "우선순위"],
          time: currentTime,
          progress: currentProgress,
          style: 'friendly'
        },
        concise: {
          summary: {
            mainPoints: [
              "프로젝트 현황 검토",
              "이슈 해결 방안 논의",
              "다음 단계 계획 수립"
            ],
            participantComments: [
              "지우: 현황 요약 및 이슈 제기",
              "팀원들: 해결 방안 제안"
            ],
            nextSteps: [
              "이슈 해결 작업 진행",
              "진행 상황 공유 방식 개선",
              "후속 회의 일정 확정"
            ]
          },
          participants: currentParticipants,
          keywords: ["프로젝트", "이슈", "계획", "진행"],
          time: currentTime,
          progress: currentProgress,
          style: 'concise'
        }
      };
      
      return NextResponse.json(sampleResponses[currentStyle]);
    }
    
    return NextResponse.json(
      { error: message }, 
      { status }
    );
  }
} 