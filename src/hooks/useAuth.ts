import { useMutation } from "@tanstack/react-query";
import {
  signUpRequest,
  loginRequest,
  oauthRegisterRequest,
  reissueToken,
  kakaoRedirectLogin,
  type SignUpBody,
  type LoginBody,
  type OAuthSignUpBody,
  type ReissueBody,
} from "@src/api/auth";

/** 카카오 리다이렉트 응답에서 토큰을 표준화한 타입 */
export type KakaoTokenPayload = {
  accessToken?: string;
  refreshToken?: string;
  // 그 외 백엔드가 넘겨줄 수 있는 필드(회원가입용 정보 등)
  [key: string]: unknown;
};

/** unknown 응답에서 안전하게 토큰 페이로드만 추출 */
export function extractKakaoPayload(res: unknown): KakaoTokenPayload {
  if (res && typeof res === "object") {
    const obj = res as Record<string, unknown>;
    const inner =
      obj.data && typeof obj.data === "object"
        ? (obj.data as Record<string, unknown>)
        : obj;

    return {
      accessToken:
        typeof inner.accessToken === "string" ? inner.accessToken : undefined,
      refreshToken:
        typeof inner.refreshToken === "string" ? inner.refreshToken : undefined,
      ...inner,
    };
  }
  return {};
}

// 일반 회원가입
export const useSignUp = () =>
  useMutation({
    mutationFn: (body: SignUpBody) => signUpRequest(body),
  });

// 이메일 로그인
export const useLogin = () =>
  useMutation({
    mutationFn: (body: LoginBody) => loginRequest(body),
  });

// OAuth 회원가입
export const useOAuthSignUp = () =>
  useMutation({
    mutationFn: (body: OAuthSignUpBody) => oauthRegisterRequest(body),
  });

// 토큰 재발급
export const useReissue = () =>
  useMutation({
    mutationFn: (body: ReissueBody) => reissueToken(body),
  });

// 카카오 로그인 시작 (카카오 인증 URL로 이동)
export const useKakaoStart = () =>
  useMutation<void, unknown, void>({
    mutationFn: async () => {
      const api = (await import("@src/api/client")).default;
      const baseURL = api.defaults.baseURL || "";
      window.location.href = `${baseURL}/auth/kakao`;
    },
  });

// 카카오 redirect (AuthCode 받았을 때 실행) — 반환 타입을 명시
export const useKakaoRedirectLogin = () =>
  useMutation<KakaoTokenPayload, Error, string>({
    mutationFn: async (code: string) => {
      const raw = await kakaoRedirectLogin(code);
      return extractKakaoPayload(raw);
    },
  });
