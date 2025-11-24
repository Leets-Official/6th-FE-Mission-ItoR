// src/api/axiosInstance.ts
import axios from "axios";

// 백엔드 서버 주소
const BASE_URL = "https://blog.leets.land";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터: 매 요청마다 accessToken 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//응답 인터셉터: 401일 때 자동 토큰 재발급
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response } = error;

    if (!response) {
      alert("서버에 연결할 수 없습니다.");
      return Promise.reject(error);
    }

    const isJwtExpiredError =
      response.status === 500 && response.data?.message?.includes("JWT expired");

    // accessToken 만료 시 재발급 시도 (401 또는 500 + JWT expired 메시지)
    if ((response.status === 401 || isJwtExpiredError) && !config._retry) {
      config._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("refreshToken이 없습니다.");
        }

        const reissueRes = await axios.post(
          `${BASE_URL}/auth/reissue`,
          { refreshToken },
          { withCredentials: true }
        );

        const newAccess = reissueRes.data?.data?.accessToken;
        const newRefresh = reissueRes.data?.data?.refreshToken;

        if (!newAccess) {
          throw new Error("Failed to get new access token from reissue response");
        }

        localStorage.setItem("accessToken", newAccess);
        if (newRefresh) localStorage.setItem("refreshToken", newRefresh);

        // 재시도
        config.headers.Authorization = `Bearer ${newAccess}`;
        return api(config);
      } catch (reissueError) {
        console.error("토큰 재발급 실패:", reissueError);
        localStorage.clear();
        alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login";
        return Promise.reject(reissueError);
      }
    }

    console.groupCollapsed(
      `[API ERROR] ${config?.method?.toUpperCase()} ${config?.url}`
    );
    console.log("Request:", config?.data);
    console.log("Response:", response?.status, response?.data);
    console.groupEnd();

    // alert(
    //   response?.data?.message ||
    //     "요청 중 오류가 발생했습니다."
    // );

    return Promise.reject(error);
  }
);

export default api;