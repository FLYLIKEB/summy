declare global {
  interface Window {
    Kakao: any;
  }
}

export const KAKAO_SDK_URL = 'https://developers.kakao.com/sdk/js/kakao.js';
export const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

export const initializeKakao = () => {
  if (typeof window.Kakao === 'undefined') {
    return;
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_APP_KEY);
  }
};

export const kakaoLogin = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.Kakao === 'undefined') {
      reject(new Error('Kakao SDK not loaded'));
      return;
    }

    window.Kakao.Auth.login({
      success: (authObj: any) => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res: any) => {
            const kakaoAccount = res.kakao_account;
            resolve({
              id: res.id,
              email: kakaoAccount?.email,
              nickname: kakaoAccount?.profile?.nickname,
              profileImage: kakaoAccount?.profile?.profile_image_url
            });
          },
          fail: (error: any) => {
            reject(error);
          }
        });
      },
      fail: (error: any) => {
        reject(error);
      }
    });
  });
}; 