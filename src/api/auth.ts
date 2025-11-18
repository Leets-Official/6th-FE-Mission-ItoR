import api from "./index";
import type { AxiosError } from "axios";
import type { User } from "@/store/useUserStore";
import type { ApiResponse } from "./index";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    profilePicture: string;
    name: string;
    birthDate: string;
    introduction: string;
    loginType?: "email" | "kakao";
  };
}

interface KakaoSignupResponse {
  code: 401;
  message: string;
  data: {
    nickname: string;
    picture: string;
    kakaoId: number;
    httpStatus: string;
    responseMessage: string;
  };
}

interface ApiErrorResponse {
  message?: string;
  code?: number;
  data?: unknown;
}

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const res = await api.post<ApiResponse<LoginResponse>>("/auth/login", {
      email,
      password,
    });

    const { accessToken, refreshToken, user } = res.data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      profilePicture: user.profilePicture,
      name: user.name,
      birthDate: user.birthDate,
      introduction: user.introduction,
      loginType: user.loginType ?? "email",
    };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(error.response?.data?.message ?? "로그인 요청 중 오류가 발생했습니다.");
  }
};

export const getKakaoLoginUrl = async (): Promise<string> => {
  const res = await api.get<ApiResponse<string>>("/auth/kakao");
  return res.data.data;
};

export const handleKakaoCallback = async (code: string): Promise<User | KakaoSignupResponse> => {
  try {
    const res = await api.get<ApiResponse<any>>(`/auth/kakao/redirect?code=${code}`);

    if (res.data.code === 401) return res.data as KakaoSignupResponse;

    const u = res.data.data;

    localStorage.setItem("accessToken", u.accessToken);
    localStorage.setItem("refreshToken", u.refreshToken);

    return {
      id: u.id,
      email: u.email,
      nickname: u.nickname,
      profilePicture: u.profilePicture ?? u.picture ?? "",
      name: u.name,
      birthDate: u.birthDate,
      introduction: u.introduction ?? "",
      loginType: u.loginType ?? "kakao",
    };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(error.response?.data?.message ?? "카카오 로그인 처리 중 오류가 발생했습니다.");
  }
};

export const register = async (userData: {
  email: string;
  nickname: string;
  password: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction?: string;
}) => {
  const res = await api.post<ApiResponse<null>>("/auth/register", userData);
  return res.data;
};

export const registerKakao = async (userData: {
  email: string;
  nickname: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction?: string;
  kakaoId: number;
}) => {
  const res = await api.post<ApiResponse<null>>("/auth/register-oauth", userData);
  return res.data;
};

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const reissueToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  const res = await api.post<ApiResponse<TokenResponse>>("/auth/reissue", {
    refreshToken,
  });

  localStorage.setItem("accessToken", res.data.data.accessToken);
  localStorage.setItem("refreshToken", res.data.data.refreshToken);

  return res.data;
};
