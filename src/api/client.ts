// src/api/client.ts
import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://blog.leets.land";

/** 공용 인스턴스 */
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/** 인터셉터 미적용 인스턴스 */
export const raw = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

function pickString(obj: unknown, key: string): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const v = (obj as Record<string, unknown>)[key];
  return typeof v === "string" ? v : undefined;
}

function unwrapData(input: unknown): unknown {
  if (input && typeof input === "object" && "data" in input) {
    const inner = (input as { data: unknown }).data;
    return inner ?? input;
  }
  return input;
}

type HeadersWithSet = Record<string, unknown> & {
  set?: (name: string, value: string) => unknown;
};

function asHeadersWithSet(h: AxiosRequestConfig["headers"]): HeadersWithSet {
  if (!h) return {};
  return h as unknown as HeadersWithSet;
}

function setAuthOnConfig(
  cfg: InternalAxiosRequestConfig | AxiosRequestConfig,
  token: string
): void {
  const headers = asHeadersWithSet(cfg.headers);
  if (typeof headers.set === "function") {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
    headers["Authorization"] = `Bearer ${token}`;
  }
  // 원래 선언 타입 범위로만 재대입
  cfg.headers = headers as AxiosRequestConfig["headers"];
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token) setAuthOnConfig(config, token);
  return config;
});

type RetryableConfig = AxiosRequestConfig & { _retry?: boolean };

let isRefreshing = false;
const waitQueue: Array<(token: string | null) => void> = [];

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const cfg: RetryableConfig = (error.config || {}) as RetryableConfig;
    const status = error.response?.status ?? 0;
    const rdata = error.response?.data as unknown;

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

      // 이미 재발급 중이면 큐에 대기
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          waitQueue.push((newToken) => {
            const next: RetryableConfig = { ...cfg, _retry: true };
            if (newToken) setAuthOnConfig(next, newToken);
            api
              .request(next)
              .then(resolve)
              .catch(reject);
          });
        });
      }

      try {
        isRefreshing = true;

        const { data } = await raw.post("/auth/reissue", { refreshToken });
        const payload = unwrapData(data);
        const newAccess = pickString(payload, "accessToken") ?? null;
        const newRefresh = pickString(payload, "refreshToken") ?? null;

        if (!newAccess) throw new Error("Invalid reissue response");

        localStorage.setItem("accessToken", newAccess);
        if (newRefresh) localStorage.setItem("refreshToken", newRefresh);

        // 대기열 처리
        while (waitQueue.length) {
          const resume = waitQueue.shift()!;
          resume(newAccess);
        }

        // 원 요청 재시도
        const next: RetryableConfig = { ...cfg, _retry: true };
        setAuthOnConfig(next, newAccess);
        return api.request(next);
      } catch (e) {
        // 실패 시 정리
        while (waitQueue.length) {
          const resume = waitQueue.shift()!;
          resume(null);
        }
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(e instanceof Error ? e : new Error(message));
      } finally {
        isRefreshing = false;
      }
    }

    // 그 외 에러
    return Promise.reject(new Error(message));
  }
);

export default api;
