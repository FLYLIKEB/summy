import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = 'http://52.78.150.124:8080/api/xai/complete';
const API_TIMEOUT = 60000;

/**
 * API 프록시 함수
 * 외부 HTTP API를 HTTPS 환경에서 호출할 수 있도록 중계합니다.
 */
export async function POST(req: NextRequest) {
  try {
    console.log('[API Proxy] 요청 전송 시작:', new Date().toISOString());
    
    // 요청 본문 추출
    const body = await req.json();
    console.log('[API Proxy] 요청 데이터 길이:', body.message?.length + '자');
    
    // 외부 API 호출
    const response = await axios.post(API_URL, body, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: API_TIMEOUT
    });
    
    console.log('[API Proxy] 응답 수신 완료:', new Date().toISOString());
    console.log('[API Proxy] 전체 응답 데이터:', JSON.stringify(response.data, null, 2));

    // 응답 처리 및 파싱
    let responseData = response.data;
    
    // 필요시 응답 형식 가공
    try {
      if (responseData.choices && responseData.choices.length > 0) {
        const content = responseData.choices[0].message.content;
        if (content) {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsedJson = JSON.parse(jsonMatch[0]);
            console.log('[API Proxy] 파싱된 JSON 응답:', {
              ...responseData,
              ...parsedJson
            });
            
            // 원본 응답과 파싱된 데이터 합치기
            responseData = {
              ...responseData,
              ...parsedJson
            };
          }
        }
      }
    } catch (parseError) {
      console.error('[API Proxy] JSON 파싱 오류:', parseError);
    }
    
    // 클라이언트에 응답 반환
    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error('[API Proxy] 요청 오류:', error.message);
    
    // 에러 응답 반환
    return NextResponse.json(
      { error: `API 요청 중 오류가 발생했습니다: ${error.message}` }, 
      { status: error.response?.status || 500 }
    );
  }
} 