// src/api/auth.ts
import api from "@/api/axiosInstance";
import axios from "axios";

export interface BaseUserProfile {
  email?: string;
  name?: string;
  nickname?: string;
  birthDate?: string;
  introduction?: string | null;
  profilePicture?: string | null;
}

export interface SignUpBody extends BaseUserProfile {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  nickname: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface OAuthSignUpBody extends BaseUserProfile {
  email: string;
  name: string;
  nickname: string;
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
  const response = await api.post("/auth/login", body);
  // API 응답이 data 객체로 한번 더 감싸져 오는 경우가 있어, 이를 처리합니다.
  return response.data?.data || response.data;
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
  // Interceptor를 피하기 위해 clean axios 사용
  const { data } = await axios.get("https://blog.leets.land/auth/kakao/redirect", { params: { code } });
  return data;
};

// registerOAuth 별칭으로 export (useRegisterOAuthMutation에서 사용)
export { oauthRegisterRequest as registerOAuth };

export interface UserProfileResponse extends BaseUserProfile {
  id: number;
  email: string;
  nickname: string;
  profilePicture: string;
  name: string;
  birthDate: string;
  introduction: string;
}

export const getUserProfile = async (): Promise<UserProfileResponse> => {
  const { data } = await api.get("/users/me");
  return data.data;
};

export interface UpdateUserProfilePayload extends BaseUserProfile {}

export const updateUserProfile = async (payload: UpdateUserProfilePayload): Promise<void> => {
  await api.patch("/users", payload);
};

export const updateProfilePicture = async (payload: { profilePicture: string }): Promise<void> => {
  await api.patch("/users/picture", payload);
};
