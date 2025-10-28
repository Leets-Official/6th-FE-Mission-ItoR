import api from "./index";

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

// 일반 로그인
export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post<{ data: LoginResponse }>("/auth/login", { email, password });
  localStorage.setItem("accessToken", data.data.accessToken);
  localStorage.setItem("refreshToken", data.data.refreshToken);
  return data.data.user;
};

// 일반 회원가입
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

// 카카오 로그인 URL 가져오기
export const getKakaoLoginUrl = async (): Promise<string> => {
  const { data } = await api.get<{ data: string }>("/auth/kakao");
  return data.data;
};

// 카카오 콜백 처리
export const handleKakaoCallback = async (code: string) => {
  const { data } = await api.get<{ data: LoginResponse }>(`/auth/kakao/redirect?code=${code}`);
  localStorage.setItem("accessToken", data.data.accessToken);
  localStorage.setItem("refreshToken", data.data.refreshToken);
  return data.data.user;
};

// 카카오 회원가입
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

// 토큰 재발급
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
