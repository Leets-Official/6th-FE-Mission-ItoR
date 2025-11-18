import { useMutation, useQuery } from "@tanstack/react-query";
import {
  signUpRequest,
  loginRequest,
  oauthRegisterRequest,
  reissueToken,
  kakaoRedirectLogin,
  getUserProfile, // Import getUserProfile
  type SignUpBody,
  type LoginBody,
  type OAuthSignUpBody,
  type ReissueBody,
  type UserProfileResponse, // Import UserProfileResponse
} from "@src/api/auth";

/** 카카오 리다이렉트 응답에서 토큰을 표준화한 타입 */
export type KakaoTokenPayload = {
  accessToken?: string;
  refreshToken?: string;
  [key: string]: unknown;
};

/** 응답에서 안전하게 토큰 페이로드만 추출 */
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

export const useSignUp = () =>
  useMutation({
    mutationFn: (body: SignUpBody) => signUpRequest(body),
  });

export const useLogin = () =>
  useMutation({
    mutationFn: (body: LoginBody) => loginRequest(body),
  });

// OAuth 회원가입
export const useOAuthSignUp = () =>
  useMutation({
    mutationFn: (body: OAuthSignUpBody) => oauthRegisterRequest(body),
  });

export const useReissue = () =>
  useMutation({
    mutationFn: (body: ReissueBody) => reissueToken(body),
  });

export const useKakaoStart = () =>
  useMutation<void, unknown, void>({
    mutationFn: async () => {
      const api = (await import("@src/api/axiosInstance")).default;
      const baseURL = api.defaults.baseURL || "";
      window.location.href = `${baseURL}/auth/kakao`;
    },
  });

export const useKakaoRedirectLogin = () =>
  useMutation<KakaoTokenPayload, Error, string>({
    mutationFn: async (code: string) => {
      const raw = await kakaoRedirectLogin(code);
      return extractKakaoPayload(raw);
    },
  });

export const useUserProfile = () =>
  useQuery<UserProfileResponse>({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(),
  });
