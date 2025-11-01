import axios from "axios";
import { API_BASE_URL } from "@src/utils/env";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


api.interceptors.response.use(
  (res) => res,
  (error) => {
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.responseMessage ||
      error?.message ||
      "요청 처리 중 오류가 발생했습니다.";
    return Promise.reject(new Error(msg));
  }
);

export default api;
