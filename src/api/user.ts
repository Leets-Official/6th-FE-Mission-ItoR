// src/api/user.ts
import api from "./client";

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
export async function fetchMyInfo() {
  const res = await api.get<ApiEnvelope<MyInfo>>("/users/me");
  return res.data;
}

/** 2) 유저 정보 수정: PATCH /users (비밀번호 제외) */
export async function updateUser(body: UpdateUserBody) {
  const res = await api.patch<ApiEnvelope<unknown>>("/users", body);
  return res.data;
}

/** 3) 프로필 사진 변경: PATCH /users/picture */
export async function updateUserPicture(body: UpdatePictureBody) {
  const res = await api.patch<ApiEnvelope<unknown>>("/users/picture", body);
  return res.data;
}

/** 4) 비밀번호 변경: PATCH /users/password */
export async function updateUserPassword(body: UpdatePasswordBody) {
  const res = await api.patch<ApiEnvelope<unknown>>("/users/password", body);
  return res.data;
}

/** 5) 닉네임 변경: PATCH /users/nickname */
export async function updateUserNickname(body: UpdateNicknameBody) {
  const res = await api.patch<ApiEnvelope<unknown>>("/users/nickname", body);
  return res.data;
}
