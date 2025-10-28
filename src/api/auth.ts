import api from "./axiosInstance";

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const register = async (data: Record<string, any>) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const registerOAuth = async (data: Record<string, any>) => {
  const res = await api.post("/auth/register-oauth", data);
  return res.data;
};

export const reissueToken = async () => {
  const res = await api.post("/auth/reissue");
  return res.data;
};
