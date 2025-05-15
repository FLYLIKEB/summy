import { NextResponse } from 'next/server';
import axios from 'axios';

// 외부 API URL
const API_URL = process.env.NEXT_PUBLIC_XAI_API_URL || 'http://52.78.150.124:8080/api/xai/complete';

// 타임아웃 설정 (60초로 증가)
const API_TIMEOUT = 60000;

// 입력 텍스트 정리 및 크기 제한 함수
const sanitizeInput = (text: string): string => {
  // 텍스트가 너무 길면 줄임 (최대 2000자)
  const MAX_LENGTH = 2000;
  if (text.length > MAX_LENGTH) {
    return text.substring(0, MAX_LENGTH) + "... (생략됨)";
  }
  return text;
};

export async function POST(request: Request) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    const { message, style = 'formal' } = body;
    
    // 입력 텍스트 정리
    const sanitizedMessage = sanitizeInput(message || '');
    
    // 사용자 이름 (고정값으로 설정)
    const userName = "지우";
    
    // 스타일에 따른 프롬프트 조정
    let prompt = '';
    
    switch(style) {
      case 'formal':
        prompt = `다음 회의/대화 내용에 대한 정중하고 공손한 답변을 작성해주세요. 격식을 갖추고, 전문적인 어조를 유지하세요.
        
대화 내용: ${sanitizedMessage}

${userName}님의 답변:`;
        break;
      case 'friendly':
        prompt = `다음 회의/대화 내용에 대한 친근하고 편안한 답변을 작성해주세요. 격식은 조금 줄이고, 친근한 어조로 작성하세요.

대화 내용: ${sanitizedMessage}

${userName}님의 답변:`;
        break;
      case 'concise':
        prompt = `다음 회의/대화 내용에 대한 간결하고 핵심만 담긴 답변을 작성해주세요. 불필요한 내용 없이 핵심 메시지만 전달하세요.

대화 내용: ${sanitizedMessage}

${userName}님의 답변:`;
        break;
      default:
        prompt = `다음 회의/대화 내용에 대한 적절한 답변을 작성해주세요.

대화 내용: ${sanitizedMessage}

${userName}님의 답변:`;
    }
    
    // 응답 작성 이유 구하기 위한 추가 프롬프트
    const reasonPrompt = `위 회의/대화 내용에 대해 작성한 답변의 이유를 3가지 간단하게 설명해주세요.
각 이유는 한 문장으로 작성하고, 객관적이고 논리적으로 답변해주세요.`;
    
    const fullPrompt = `${prompt}\n\n${reasonPrompt}`;
    
    console.log(`[Response API] 요청 전송 시작: ${new Date().toISOString()}`);
    
    // API 요청 전송
    const response = await axios.post(API_URL, {
      message: fullPrompt
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: API_TIMEOUT
    });
    
    console.log(`[Response API] 응답 수신 완료: ${new Date().toISOString()}`);
    
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const content = response.data.choices[0].message.content;
      
      // 답변과 이유 분리
      const parts = content.split(/위 회의\/대화 내용에 대해 작성한 답변의 이유|각 이유는 한 문장으로 작성하고/);
      
      let answer = '';
      let reasons = [];
      
      if (parts.length >= 2) {
        // 첫 번째 부분이 답변
        answer = parts[0].replace(/^답변:|^지우님의 답변:/, '').trim();
        
        // 두 번째 부분이 이유
        const reasonText = parts[1];
        reasons = reasonText
          .split(/\d+\.|\n-|\*/)
          .filter(line => line.trim().length > 0)
          .map(line => line.trim())
          .slice(0, 3);
      } else {
        // 분리가 안된 경우, 전체를 답변으로 취급
        answer = content.trim();
        
        // 기본 이유 제공
        reasons = [
          "회의 내용에 대한 적절한 응답이 필요했습니다.",
          "주요 요점을 인정하고 향후 계획을 언급했습니다.",
          "전문적인 관계를 유지하기 위한 적절한 어조를 사용했습니다."
        ];
      }
      
      return NextResponse.json({
        response: answer,
        reasons: reasons,
        style: style,
        userName: userName
      });
    } else {
      throw new Error('응답 데이터 형식이 올바르지 않습니다.');
    }
  } catch (error: any) {
    console.error('Response API 오류:', error);
    
    // 에러 응답 생성
    let status = 500;
    let message = '서버 오류가 발생했습니다';
    
    if (error.response) {
      status = error.response.status;
      message = error.response.data?.message || '요청 처리 중 오류가 발생했습니다';
    } else if (error.code === 'ECONNABORTED') {
      status = 408;
      message = '요청 시간이 초과되었습니다';
    } else if (error.request) {
      status = 503;
      message = '서비스에 연결할 수 없습니다';
    }
    
    // 개발 환경에서는 샘플 응답 제공
    if (process.env.NODE_ENV === 'development') {
      console.log('[Response API] 개발 환경에서 샘플 응답 제공');
      const userName = "지우";
      const responses = {
        formal: {
          response: '안녕하세요. 회의 내용을 잘 확인했습니다. 제안하신 사항들에 대해 검토 후 다음 주 월요일까지 피드백 드리도록 하겠습니다.',
          reasons: [
            "회의에서 제안된 내용에 대한 확인이 필요했습니다.",
            "향후 피드백 일정을 명확히 제시하여 기대치를 설정했습니다.",
            "정중한 어조로 전문적인 관계를 유지했습니다."
          ],
          userName: userName
        },
        friendly: {
          response: '안녕하세요! 회의 내용 잘 확인했어요. 제안해주신 내용들 정말 좋네요. 다음 주 월요일까지 검토하고 피드백 드릴게요!',
          reasons: [
            "친근한 어조로 소통하여 관계를 돈독히 하고자 했습니다.",
            "긍정적인 평가를 통해 제안에 대한 감사를 표현했습니다.",
            "명확한 일정을 제시하여 기대치를 관리했습니다."
          ],
          userName: userName
        },
        concise: {
          response: '회의 내용 확인했습니다. 다음 주 월요일까지 피드백 드리겠습니다.',
          reasons: [
            "핵심 정보만 간결하게 전달했습니다.",
            "시간 효율성을 위해 불필요한 내용을 생략했습니다.",
            "명확한 후속 조치를 약속했습니다."
          ],
          userName: userName
        }
      };
      
      return NextResponse.json(responses[body.style || 'formal']);
    }
    
    return NextResponse.json(
      { error: message }, 
      { status }
    );
  }
} 