import api from "./client";

/* Request Body 타입 정의 */

// 일반 회원가입
export interface SignUpBody {
  email: string;
  nickname: string;
  password: string;
  profilePicture?: string;
  birthDate?: string;
  name?: string;
  introduction?: string;
}

// OAuth 회원가입
export interface OAuthSignUpBody {
  email: string;
  nickname: string;
  profilePicture?: string;
  birthDate?: string;
  name?: string;
  introduction?: string;
  kakaoId: number;
}

// 이메일 로그인
export interface LoginBody {
  email: string;
  password: string;
}

// 토큰 재발급
export interface ReissueBody {
  refreshToken: string;
}

/* Response 타입 정의 */

// 회원가입 / OAuth 회원가입 공통 응답
export interface RegisterResponse {
  code: number;
  message: string;
  data: {
    email: string;
    nickname: string;
    profilePicture?: string;
    introduction?: string;
  };
}

// 로그인 응답
export interface LoginResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    nickname: string;
    profilePicture?: string;
    introduction?: string;
    httpStatus: string;
    responseMessage: string;
  };
}

// 토큰 재발급 응답
export interface ReissueResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

// 카카오 redirect 응답
export interface KakaoRedirectResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    nickname: string;
    profilePicture?: string;
    introduction?: string;
    httpStatus: string;
    responseMessage: string;
  };
}

/* API 함수 정의  */

// 회원가입
export const signUpRequest = async (body: SignUpBody): Promise<RegisterResponse> => {
  const res = await api.post("/auth/register", body);
  return res.data;
};

// 로그인
export const loginRequest = async (body: LoginBody): Promise<LoginResponse> => {
  const res = await api.post("/auth/login", body);
  return res.data;
};

// OAuth 회원가입 (카카오 등)
export const oauthRegisterRequest = async (
  body: OAuthSignUpBody
): Promise<RegisterResponse> => {
  const res = await api.post("/auth/register-oauth", body);
  return res.data;
};

// 토큰 재발급
export const reissueToken = async (body: ReissueBody): Promise<ReissueResponse> => {
  const res = await api.post("/auth/reissue", body);
  return res.data;
};

// 카카오 로그인 redirect URL 요청
export const getKakaoLoginUrl = async (): Promise<string> => {
  const { data } = await api.get("/auth/kakao");
  if (typeof data === "string") return data;
  if (data?.data) return data.data;
  throw new Error("카카오 로그인 URL을 가져오지 못했습니다.");
};

export const kakaoRedirectLogin = async (code: string) => {
  const { data } = await api.get(`/auth/kakao/redirect`, { params: { code } });
  return data;
};
