import api from "./index";
import type { AxiosError } from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
  nickname?: string;
  profileUrl?: string;
  introduction?: string;
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
  try {
    const { data } = await api.get(`/auth/kakao/redirect?code=${code}`);

    console.log("카카오 콜백 응답:", data);

    // 회원가입이 필요한 경우 (code: 401)
    if (data.code === 401) {
      return data as KakaoSignupResponse;
    }

    // ✅ 로그인 성공 (code: 200) - data 객체에 직접 토큰과 사용자 정보가 있음
    if (data.code === 200 && data.data) {
      const { accessToken, refreshToken, ...userInfo } = data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // User 객체 반환
      return {
        id: String(userInfo.id || ""),
        name: userInfo.name || "",
        email: userInfo.email || "",
        nickname: userInfo.nickname || "",
        profileUrl: userInfo.profilePicture || userInfo.picture || "",
        introduction: userInfo.introduction || "",
      } as User;
    }

    // 예상치 못한 응답 구조
    console.error("예상치 못한 응답 구조:", data);
    throw new Error("응답 형식이 올바르지 않습니다.");
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    console.error("카카오 콜백 처리 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message ?? "카카오 로그인 처리 중 오류가 발생했습니다.");
  }
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
