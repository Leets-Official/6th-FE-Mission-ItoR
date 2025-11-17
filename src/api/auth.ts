// src/api/auth.ts
import api from "@/api/axiosInstance";

export interface SignUpBody {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  nickname: string;
  introduction?: string;
  profilePicture?: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface OAuthSignUpBody {
  email: string;
  name: string;
  birthDate?: string;
  nickname: string;
  introduction?: string;
  profilePicture?: string;
  kakaoId: number;
}

export interface ReissueBody {
  refreshToken: string;
}

export const signUpRequest = async (body: SignUpBody) => {
  const { data } = await api.post("/auth/register", body);
  return data;
};

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  nickname?: string;
  profilePicture?: string;
  introduction?: string;
}

export const loginRequest = async (body: LoginBody): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", body);
  return data;
};

export const oauthRegisterRequest = async (body: OAuthSignUpBody) => {
  const { data } = await api.post("/auth/register/oauth", body);
  return data;
};

export const reissueToken = async (body: ReissueBody) => {
  const { data } = await api.post("/auth/reissue", body);
  return data;
};

export const kakaoRedirectLogin = async (code: string) => {
  const { data } = await api.get("/auth/kakao/redirect", { params: { code } });
  return data;
};

// registerOAuth 별칭으로 export (useRegisterOAuthMutation에서 사용)
export { oauthRegisterRequest as registerOAuth };
