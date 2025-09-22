// 인증 관련 타입 정의

// 로그인 요청/응답
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    nickname: string;
    profilePicture: string;
    introduction: string;
    httpStatus: string;
    responseMessage: string;
  };
}

// 회원가입 요청/응답
export interface RegisterRequest {
  email: string;
  password: string;
  nickname: string;
  // 추가 필드들...
}

export interface RegisterResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    nickname: string;
    profilePicture: string;
    introduction: string;
    httpStatus: string;
    responseMessage: string;
  };
}

// OAuth2 회원가입 요청/응답
export interface RegisterOAuthRequest {
  provider: 'kakao' | 'google' | 'naver';
  authCode: string;
  nickname?: string;
}

export interface RegisterOAuthResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    nickname: string;
    profilePicture: string;
    introduction: string;
    httpStatus: string;
    responseMessage: string;
  };
}

// 카카오 리다이렉트 URL 응답
export interface KakaoRedirectResponse {
  code: number;
  message: string;
  data: {
    redirectUrl: string;
  };
}

// 카카오 콜백 요청/응답
export interface KakaoRedirectRequest {
  code: string;
  state?: string;
}

export interface KakaoRedirectCallbackResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    nickname: string;
    profilePicture: string;
    introduction: string;
    httpStatus: string;
    responseMessage: string;
  };
}
