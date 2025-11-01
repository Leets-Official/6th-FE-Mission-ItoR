import { useMutation } from "@tanstack/react-query";
import {
  signUpRequest,
  loginRequest,
  oauthRegisterRequest,
  reissueToken,
  kakaoRedirectLogin,
  SignUpBody,
  LoginBody,
  OAuthSignUpBody,
  ReissueBody,
} from "@src/api/auth";

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

//  카카오 로그인 시작 (카카오 인증 URL 요청)
// mutationFn이 string을 반환한다고 명시해줌
export const useKakaoStart = () =>
  useMutation<void, unknown, void>({
    mutationFn: async () => {
      const api = (await import("@src/api/client")).default;
      const baseURL = api.defaults.baseURL || "";
      window.location.href = `${baseURL}/auth/kakao`;
    },
  });

// 카카오 redirect (AuthCode 받았을 때 실행)
export const useKakaoRedirectLogin = () =>
  useMutation({
    mutationFn: (code: string) => kakaoRedirectLogin(code),
  });
