// src/api/user.ts
import api from "@src/api/client";

/** 공통 래핑 타입 (백엔드 기본 응답 구조) */
export interface ApiEnvelope<T> {
  code: number;
  message: string;
  data: T;
}

/** 내 정보 타입 (GET /users/me) */
export interface MyInfo {
  id: number;
  email: string;
  nickname: string;
  profilePicture?: string | null;
  birthDate?: string | null;
  name?: string | null;
  introduction?: string | null;
}

/** PATCH /users 바디 (비밀번호는 제외!) */
export interface UpdateUserBody {
  email: string;
  nickname: string;
  profilePicture?: string;
  birthDate?: string;
  name?: string;
  introduction?: string;
}

/** PATCH /users/picture 바디 */
export interface UpdatePictureBody {
  profilePicture: string;
}

/** PATCH /users/password 바디 */
export interface UpdatePasswordBody {
  password: string;
}

/** PATCH /users/nickname 바디 */
export interface UpdateNicknameBody {
  nickname: string;
}

/** 1) 내 정보 조회: GET /users/me */
export async function fetchMyInfo(): Promise<ApiEnvelope<MyInfo>> {
  const res = await api.get<ApiEnvelope<MyInfo>>("/users/me");
  return res.data;
}

/** 2) 유저 정보 수정: PATCH /users (비밀번호 제외) */
export async function updateUser(body: UpdateUserBody): Promise<ApiEnvelope<null>> {
  const res = await api.patch<ApiEnvelope<null>>("/users", body);
  return res.data;
}

/** 3) 프로필 사진 변경: PATCH /users/picture */
export async function updateUserPicture(
  body: UpdatePictureBody
): Promise<ApiEnvelope<null>> {
  const res = await api.patch<ApiEnvelope<null>>("/users/picture", body);
  return res.data;
}

/** 4) 비밀번호 변경: PATCH /users/password */
export async function updateUserPassword(
  body: UpdatePasswordBody
): Promise<ApiEnvelope<null>> {
  const res = await api.patch<ApiEnvelope<null>>("/users/password", body);
  return res.data;
}

/** 5) 닉네임 변경: PATCH /users/nickname */
export async function updateUserNickname(
  body: UpdateNicknameBody
): Promise<ApiEnvelope<null>> {
  const res = await api.patch<ApiEnvelope<null>>("/users/nickname", body);
  return res.data;
}

/* ======================= Auth 관련 ======================= */

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

/* API 함수들 */
export const signUpRequest = async (body: SignUpBody): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>(`${AUTH_PATH}/register`, body);
  return res.data;
};

export const oauthRegisterRequest = async (
  body: OAuthSignUpBody
): Promise<RegisterResponse> => {
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

/* 카카오 로그인 URL */
type KakaoUrlResponse = string | { data: string };

export const getKakaoLoginUrl = async (): Promise<string> => {
  const res = await api.get<KakaoUrlResponse>(`${AUTH_PATH}/kakao`);
  const payload = res.data;
  if (typeof payload === "string") return payload;
  if (payload?.data) return payload.data;
  throw new Error("카카오 로그인 URL을 가져오지 못했습니다.");
};


export const kakaoRedirectLogin = async (code: string): Promise<LoginResponse> => {
  const res = await api.get<LoginResponse>(`${AUTH_PATH}/kakao/redirect`, {
    params: { code },
  });
  return res.data;
};
