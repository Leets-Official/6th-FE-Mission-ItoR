import { useMutation } from "@tanstack/react-query";
import {
  signUpRequest,
  loginRequest,
  SignUpBody,
  LoginBody,
  SignUpResponse,
  LoginResponse,
} from "@src/api/auth";

// 회원가입 훅
export const useSignUp = () =>
  useMutation<SignUpResponse, Error, SignUpBody>({
    mutationFn: (body) => signUpRequest(body),
  });

// 로그인 훅
export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginBody>({
    mutationFn: (body) => loginRequest(body),
  });
