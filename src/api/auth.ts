import api from "./index";
import type { AxiosError } from "axios";
import type { User } from "@/store/useUserStore";

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
    const { data } = await api.post<{ data: LoginResponse }>("/auth/login", { email, password });

    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);

    return {
      id: data.data.user.id,
      email: data.data.user.email,
      nickname: data.data.user.nickname,
      profilePicture: data.data.user.profilePicture,
      name: data.data.user.name,
      birthDate: data.data.user.birthDate,
      introduction: data.data.user.introduction,
      loginType: data.data.user.loginType ?? "email",
    };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(error.response?.data?.message ?? "로그인 요청 중 오류가 발생했습니다.");
  }
};

export const getKakaoLoginUrl = async (): Promise<string> => {
  const { data } = await api.get<{ data: string }>("/auth/kakao", { withCredentials: false });
  return data.data;
};

export const handleKakaoCallback = async (code: string): Promise<User | KakaoSignupResponse> => {
  try {
    const { data } = await api.get(`/auth/kakao/redirect?code=${code}`);

    if (data.code === 401) return data as KakaoSignupResponse;

    if (data.code === 200 && data.data) {
      const { accessToken, refreshToken, ...u } = data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

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
    }

    throw new Error("응답 형식이 올바르지 않습니다.");
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
  const { data } = await api.post("/auth/register", userData);
  return data;
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
  const { data } = await api.post("/auth/register-oauth", userData);
  return data;
};

export const reissueToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  const { data } = await api.post<{ data: { accessToken: string; refreshToken: string } }>(
    "/auth/reissue",
    { refreshToken },
  );

  localStorage.setItem("accessToken", data.data.accessToken);
  localStorage.setItem("refreshToken", data.data.refreshToken);
  return data;
};
