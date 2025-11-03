import api from "./index";
import type { AxiosError } from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  profileUrl?: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
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
    const { data } = await api.post<{ data: LoginResponse }>("/auth/login", { email, password });
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    return data.data.user;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    console.error("로그인 요청 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message ?? "로그인 요청 중 오류가 발생했습니다.");
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
  try {
    const { data } = await api.post("/auth/register", userData);
    return data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    console.error("회원가입 요청 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message ?? "회원가입 요청 중 오류가 발생했습니다.");
  }
};

export const getKakaoLoginUrl = async (): Promise<string> => {
  try {
    const { data } = await api.get<{ data: string }>("/auth/kakao", {
      withCredentials: false,
    });
    return data.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    console.error("카카오 로그인 URL 요청 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message ?? "카카오 로그인 URL 요청 중 오류가 발생했습니다.",
    );
  }
};

export const handleKakaoCallback = async (code: string): Promise<User | KakaoSignupResponse> => {
  const { data } = await api.get(`/auth/kakao/redirect?code=${code}`);

  // 회원가입이 필요한 경우 (code: 401)
  if (data.code === 401) {
    return data as KakaoSignupResponse;
  }

  // 로그인 성공
  localStorage.setItem("accessToken", data.data.accessToken);
  localStorage.setItem("refreshToken", data.data.refreshToken);
  return data.data.user;
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
  try {
    const { data } = await api.post("/auth/register-oauth", userData);
    return data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    console.error("카카오 회원가입 요청 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message ?? "카카오 회원가입 요청 중 오류가 발생했습니다.",
    );
  }
};

export const reissueToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  try {
    const { data } = await api.post<{ data: { accessToken: string; refreshToken: string } }>(
      "/auth/reissue",
      { refreshToken },
    );

    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    return data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    console.error("토큰 재발급 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message ?? "토큰 재발급 중 오류가 발생했습니다.");
  }
};
