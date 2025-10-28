import api from "./index";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  const { accessToken, refreshToken, user } = res.data.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return user;
};

export const register = async (data: {
  email: string;
  nickname: string;
  password: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction?: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const reissueToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");

  const res = await api.post("/auth/reissue", { refreshToken });
  const { accessToken, refreshToken: newRefresh } = res.data.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", newRefresh);

  return res.data;
};

export const getKakaoLoginUrl = async (): Promise<string> => {
  const res = await api.get("/auth/kakao");
  return res.data.data;
};

export const kakaoLoginRedirect = async (code: string) => {
  const res = await api.get(`/auth/kakao/redirect?code=${code}`);
  const { accessToken, refreshToken, user } = res.data.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return user;
};
