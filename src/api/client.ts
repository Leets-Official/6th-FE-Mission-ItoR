// src/api/client.ts
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";
import { API_BASE_URL } from "@src/utils/env";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 인터셉터 미적용 인스턴스
const raw = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터: accessToken 자동 첨부
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (!token) return config;

  // 1) AxiosHeaders 인스턴스면 set으로 추가
  if (config.headers instanceof AxiosHeaders) {
    config.headers.set("Authorization", `Bearer ${token}`);
    return config;
  }

  // 2) 객체 형태면 안전하게 키만 추가
  if (config.headers && typeof config.headers === "object" && !Array.isArray(config.headers)) {
    (config.headers as RawAxiosRequestHeaders)["Authorization"] = `Bearer ${token}`;
    return config;
  }

  // 3) 그 외는 새 객체 생성
  const h = new AxiosHeaders();
  h.set("Authorization", `Bearer ${token}`);
  config.headers = h;
  return config;
});

// 재시도 플래그 타입 정의
type RetryableConfig = AxiosRequestConfig & { _retry?: boolean };

let isRefreshing = false;
const waitQueue: Array<(token: string) => void> = [];

// 안전한 문자열 추출 함수
function pickString(obj: Record<string, unknown>, key: string): string | undefined {
  const value = obj?.[key];
  return typeof value === "string" ? value : undefined;
}

// 응답 인터셉터
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const cfg: RetryableConfig = (error.config || {}) as RetryableConfig;
    const status = error.response?.status ?? 0;
    const rdata = (error.response?.data ?? {}) as Record<string, unknown>;

    const message =
      pickString(rdata, "message") ??
      pickString(rdata, "responseMessage") ??
      error.message ??
      "요청 처리 중 오류가 발생했습니다.";

    // 401이면 토큰 재발급 시도
    if (status === 401 && !cfg._retry) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.removeItem("accessToken");
        return Promise.reject(new Error(message));
      }

      // 이미 재발급 중인 경우 큐에 대기
      if (isRefreshing) {
        return new Promise((resolve) => {
          waitQueue.push((newAccess) => {
            const next: RetryableConfig = { ...cfg, _retry: true };
            if (next.headers instanceof AxiosHeaders) {
              next.headers.set("Authorization", `Bearer ${newAccess}`);
            } else {
              (next.headers as RawAxiosRequestHeaders)["Authorization"] = `Bearer ${newAccess}`;
            }
            resolve(api(next));
          });
        });
      }

      try {
        isRefreshing = true;

        // 토큰 재발급 요청 
        const { data } = await raw.post("/auth/reissue", { refreshToken });
        const payload = (data?.data ?? data) as Record<string, unknown>;
        const newAccess = pickString(payload, "accessToken") ?? "";
        const newRefresh = pickString(payload, "refreshToken") ?? "";

        if (newAccess) localStorage.setItem("accessToken", newAccess);
        if (newRefresh) localStorage.setItem("refreshToken", newRefresh);

        // 대기 중 요청들 재개
        waitQueue.splice(0).forEach((resume) => resume(newAccess));

        // 현재 요청 재시도
        const next: RetryableConfig = { ...cfg, _retry: true };
        if (next.headers instanceof AxiosHeaders) {
          next.headers.set("Authorization", `Bearer ${newAccess}`);
        } else {
          (next.headers as RawAxiosRequestHeaders)["Authorization"] = `Bearer ${newAccess}`;
        }

        return api(next);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(new Error(message));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
