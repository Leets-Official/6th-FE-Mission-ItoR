import api from "./client";

// 회원가입 Request 타입
export interface SignUpBody {
  email: string;
  nickname: string;
  password: string;
  profilePicture?: string; // 선택 가능하게
  birthDate?: string;
  name?: string;
  introduction?: string;
}

// 로그인 Request 타입
export interface LoginBody {
  email: string;
  password: string;
}

// 회원가입 Response 타입
export interface SignUpResponse {
  code: number;
  message: string;
  data: {
    email: string;
    nickname: string;
    profilePicture?: string;
    introduction?: string;
  };
}

// 로그인 Response 타입
export interface LoginResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    nickname: string;
    profilePicture?: string;
    introduction?: string;
    httpStatus: string;
    responseMessage: string;
  };
}

// 회원가입 API
export const signUpRequest = async (body: SignUpBody): Promise<SignUpResponse> => {
  const res = await api.post("/auth/register", body);
  return res.data;
};

// 로그인 
export const loginRequest = async (body: LoginBody): Promise<LoginResponse> => {
  const res = await api.post("/auth/login", body);
  return res.data;
};
