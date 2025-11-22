// src/api/client.ts
import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from "@src/lib/authStorage";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://blog.leets.land";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

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
  cfg.headers = headers as AxiosRequestConfig["headers"];
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
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
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        return Promise.reject(new Error(message));
      }

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

        saveTokens(newAccess, newRefresh);

        while (waitQueue.length) {
          const resume = waitQueue.shift()!;
          resume(newAccess);
        }

        const next: RetryableConfig = { ...cfg, _retry: true };
        setAuthOnConfig(next, newAccess);
        return api.request(next);
      } catch (e) {
        while (waitQueue.length) {
          const resume = waitQueue.shift()!;
          resume(null);
        }
        clearTokens();
        return Promise.reject(e instanceof Error ? e : new Error(message));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
