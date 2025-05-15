// API 테스트 스크립트
const axios = require('axios');

const apiUrl = 'http://52.78.150.124:8080/api/xai/complete';

async function testApi() {
  try {
    console.log('API 요청 테스트를 시작합니다...');
    
    const response = await axios.post(apiUrl, {
      message: "안녕하세요, 이것은 API 테스트입니다. 이 텍스트는 회의 내용을 요약하기 위한 테스트입니다. 지난 회의에서 우리는 제품 출시 일정과 마케팅 전략에 대해 논의했습니다. 출시 일정은 다음 달로 예정되어 있고, 마케팅은 소셜 미디어와 이메일 캠페인을 통해 진행하기로 결정했습니다."
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('응답 상태:', response.status);
    console.log('응답 데이터:', JSON.stringify(response.data, null, 2));
    
    // 응답 내용 추출
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const content = response.data.choices[0].message.content;
      console.log('\n요약 결과:');
      console.log(content);
    } else {
      console.log('응답에 요약 내용이 없습니다.');
    }
    
  } catch (error) {
    console.error('오류 발생:', error.message);
    if (error.response) {
      console.error('응답 상태:', error.response.status);
      console.error('응답 데이터:', error.response.data);
    }
  }
}

// 테스트 실행
testApi(); 