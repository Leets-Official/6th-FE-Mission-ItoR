import api from "./client";

const AUTH_PATH = "/auth";

/* 공통 유저 정보 타입 */
export interface CommonUserInfo {
  email: string;
  nickname: string;
  profilePicture?: string;
  introduction?: string;
}

/* Request Body */
export interface SignUpBody {
  email: string;
  nickname: string;
  password: string;
  profilePicture?: string;
  birthDate?: string;
  name?: string;
  introduction?: string;
}

export interface OAuthSignUpBody {
  email: string;
  nickname: string;
  password: string;
  provider: "kakao";
  profilePicture?: string;
  birthDate?: string;
  name?: string;
  introduction?: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface ReissueBody {
  refreshToken: string;
}

/* Response */
export interface LoginResponse {
  code: number;
  message: string;
  data: CommonUserInfo & {
    accessToken: string;
    refreshToken: string;
    httpStatus?: string;
    responseMessage?: string;
  };
}

export interface RegisterResponse {
  code: number;
  message: string;
  data: CommonUserInfo & { userId?: number };
}

/* API 함수들 — 제네릭으로 응답 타입을 지정해서 ts-ignore 없이 안전하게 */
export const signUpRequest = async (body: SignUpBody): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>(`${AUTH_PATH}/register`, body);
  return res.data;
};

export const oauthRegisterRequest = async (body: OAuthSignUpBody): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>(`${AUTH_PATH}/oauth/register`, body);
  return res.data;
};

export const loginRequest = async (body: LoginBody): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>(`${AUTH_PATH}/login`, body);
  return res.data;
};

export const reissueToken = async (body: ReissueBody): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>(`${AUTH_PATH}/reissue`, body);
  return res.data;
};

/* 카카오 로그인 URL: 문자열 또는 { data: string } 형태를 모두 허용 */
type KakaoUrlResponse = string | { data: string };

export const getKakaoLoginUrl = async (): Promise<string> => {
  const res = await api.get<KakaoUrlResponse>(`${AUTH_PATH}/kakao`);
  const payload = res.data;
  if (typeof payload === "string") return payload;
  if (payload?.data) return payload.data;
  throw new Error("카카오 로그인 URL을 가져오지 못했습니다.");
};

/* 카카오 redirect 응답의 스키마가 LoginResponse라면 이렇게 지정 */
export const kakaoRedirectLogin = async (code: string): Promise<LoginResponse> => {
  const res = await api.get<LoginResponse>(`${AUTH_PATH}/kakao/redirect`, { params: { code } });
  return res.data;
};
