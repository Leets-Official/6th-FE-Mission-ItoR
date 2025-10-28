import axios from "axios";

const api = axios.create({
  baseURL: "https://blog.leets.land/api", // ItoR 백엔드 API 주소
  withCredentials: true, // refresh token을 쿠키로 주고받기
});

// 요청 인터셉터: Access Token 자동 첨부
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
