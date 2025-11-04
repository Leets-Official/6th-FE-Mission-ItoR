// src/api/client.ts
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL as string;


// 1. 기본 인스턴스 정의
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 2. 인터셉터 미적용 인스턴스 (토큰 재발급 전용)
const raw = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 3. Authorization 안전 세팅 헬퍼
function attachAuth(config: AxiosRequestConfig, tokenWithBearer: string): void {
  const headers = config.headers;

  if (headers instanceof AxiosHeaders) {
    headers.set("Authorization", tokenWithBearer);
    return;
  }

  if (headers && typeof headers === "object" && !Array.isArray(headers)) {
    (headers as RawAxiosRequestHeaders)["Authorization"] = tokenWithBearer;
    return;
  }

  // headers가 없거나 이상한 타입이면 새로 생성
  config.headers = new AxiosHeaders({ Authorization: tokenWithBearer });
}

// 4. 요청 인터셉터: accessToken 자동 첨부

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (!token) return config;

  const tokenWithBearer = `Bearer ${token}`;
  attachAuth(config, tokenWithBearer);
  return config;
});

// 5. 재시도 타입 및 큐 정의
type RetryableConfig = AxiosRequestConfig & { _retry?: boolean };

let isRefreshing = false;
const waitQueue: Array<(tokenWithBearer: string) => void> = [];

// 6. 안전한 문자열 추출 함수
function pickString(obj: Record<string, unknown>, key: string): string | undefined {
  const value = obj?.[key];
  return typeof value === "string" ? value : undefined;
}

// 7. 응답 인터셉터: 토큰 재발급 로직
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

    // 401 에러 시 토큰 재발급 시도
    if (status === 401 && !cfg._retry) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.removeItem("accessToken");
        return Promise.reject(new Error(message));
      }

      // 이미 재발급 중이라면 큐에 요청 대기
      if (isRefreshing) {
        return new Promise((resolve) => {
          waitQueue.push((newAccessWithBearer) => {
            const next: RetryableConfig = { ...cfg, _retry: true };
            attachAuth(next, newAccessWithBearer);
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

        const newAccessWithBearer = `Bearer ${newAccess}`;

        // 대기 중인 요청들 재개
        waitQueue.splice(0).forEach((resume) => resume(newAccessWithBearer));

        // 현재 요청 재시도
        const next: RetryableConfig = { ...cfg, _retry: true };
        attachAuth(next, newAccessWithBearer);
        return api(next);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(new Error(message));
      } finally {
        isRefreshing = false;
      }
    }

    // 401 이외의 에러는 그대로 반환
    return Promise.reject(new Error(message));
  }
);

// 8. export
export default api;
export { raw };
