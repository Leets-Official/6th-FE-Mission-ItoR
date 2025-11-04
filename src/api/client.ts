import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";

// 개발/배포 분기 
const isDev = import.meta.env.DEV;
const BASE_URL = isDev ? "/api" : (import.meta.env.VITE_API_BASE_URL || "https://blog.leets.land");

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 인터셉터 미적용 인스턴스 
const raw = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터: accessToken 자동 첨부
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (!token) return config;

  if (config.headers instanceof AxiosHeaders) {
    config.headers.set("Authorization", `Bearer ${token}`);
    return config;
  }
  if (config.headers && typeof config.headers === "object" && !Array.isArray(config.headers)) {
    (config.headers as RawAxiosRequestHeaders)["Authorization"] = `Bearer ${token}`;
    return config;
  }

  const h = new AxiosHeaders();
  h.set("Authorization", `Bearer ${token}`);
  config.headers = h;
  return config;
});

// 재시도 플래그 타입
type RetryableConfig = AxiosRequestConfig & { _retry?: boolean };

let isRefreshing = false;
const waitQueue: Array<(token: string) => void> = [];

// 안전한 문자열 추출
function pickString(obj: Record<string, unknown>, key: string): string | undefined {
  const value = obj?.[key];
  return typeof value === "string" ? value : undefined;
}

// 응답 인터셉터: 401 → 재발급 → 대기열 재시도
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

    if (status === 401 && !cfg._retry) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.removeItem("accessToken");
        return Promise.reject(new Error(message));
      }

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

        const { data } = await raw.post("/auth/reissue", { refreshToken });
        const payload = (data?.data ?? data) as Record<string, unknown>;
        const newAccess = pickString(payload, "accessToken") ?? "";
        const newRefresh = pickString(payload, "refreshToken") ?? "";

        if (newAccess) localStorage.setItem("accessToken", newAccess);
        if (newRefresh) localStorage.setItem("refreshToken", newRefresh);

        waitQueue.splice(0).forEach((resume) => resume(newAccess));

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
