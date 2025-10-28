import axios from "axios";

const api = axios.create({
  baseURL: "/", // 프록시를 사용할 거라 절대주소 필요 없음
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const { config, response } = error || {};
    console.groupCollapsed(
      `[API ERROR] ${config?.method?.toUpperCase()} ${config?.url}`
    );
    console.log("Request:", config?.data);
    console.log("Response:", response?.status, response?.data);
    console.groupEnd();

    alert(
      response?.data?.message
        ? `회원가입 실패: ${response.data.message}`
        : "회원가입 중 오류가 발생했습니다."
    );
    return Promise.reject(error);
  }
);

export default api;
