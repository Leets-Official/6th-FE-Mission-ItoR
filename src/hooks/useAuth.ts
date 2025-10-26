import { useMutation, useQuery } from "@tanstack/react-query";
import {
  signUpRequest,
  loginRequest,
  oauthRegisterRequest,
  reissueToken,
  getKakaoLoginUrl,
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

// 카카오 로그인 redirect URL 요청
export const useKakaoUrl = () =>
  useQuery({
    queryKey: ["kakao-login-url"],
    queryFn: () => getKakaoLoginUrl(),
  });

// 카카오 redirect (AuthCode 받았을 때 실행)
export const useKakaoRedirectLogin = () =>
  useMutation({
    mutationFn: (code: string) => kakaoRedirectLogin(code),
  });
