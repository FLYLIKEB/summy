import { NextResponse } from 'next/server';
import { 
  sendApiRequest, 
  sanitizeInput, 
  parseJsonResponse, 
  createErrorResponse,
  createFallbackResponse,
  getSummaryPrompt
} from '../../lib/api-utils';

/**
 * 요약 서비스를 위한 프록시 API
 * 
 * 이 API는 클라이언트에서 직접 외부 API를 호출하지 않고,
 * 서버 측에서 처리할 수 있도록 중개 역할을 합니다.
 * 입력된 텍스트를 분석하여 구조화된 요약을 생성합니다.
 */
export async function POST(request: Request) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    
    // 입력 텍스트 정리 (최대 3000자)
    const sanitizedMessage = sanitizeInput(body.message || '', 3000);
    
    // 요약 프롬프트 생성
    const prompt = getSummaryPrompt(sanitizedMessage);
    
    // API 요청 전송
    const response = await sendApiRequest(prompt, 'API Proxy');
    
    // API 응답에서 내용 추출 및 처리
    if (response && response.choices && response.choices.length > 0) {
      const content = response.choices[0].message.content;
      
      try {
        // JSON 응답 파싱
        const parsedJson = parseJsonResponse(content);
        
        // 원본 응답과 파싱된 JSON을 결합
        const enhancedResponse = {
          ...response,
          summary: parsedJson.summary,
          participants: parsedJson.metadata?.participants || 2,
          keywords: parsedJson.metadata?.keywords || 2,
          time: parsedJson.metadata?.time || '30분',
          progress: parsedJson.metadata?.progress || 0
        };
        
        console.log(`[API Proxy] 파싱된 JSON 응답:`, JSON.stringify(enhancedResponse, null, 2));
        return NextResponse.json(enhancedResponse);
      } catch (parseError) {
        console.error('[API Proxy] JSON 파싱 오류:', parseError);
        
        // 파싱 실패 시 기본 응답 생성
        const fallbackResponse = {
          ...response,
          ...createFallbackResponse()
        };
        
        return NextResponse.json(fallbackResponse);
      }
    }
    
    // 응답 전달
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('프록시 API 오류:', error);
    
    // 에러 응답 생성
    const { status, message } = createErrorResponse(error);
    
    return NextResponse.json(
      { error: message }, 
      { status }
    );
  }
} 