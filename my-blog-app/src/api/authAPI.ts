import axiosInstance from './axiosInstance'

/** Swagger 명세 기반 공통 응답 타입 */
export interface AuthResponse {
  code: number
  message: string
  data: {
    accessToken?: string
    refreshToken?: string
    nickname?: string
    profilePicture?: string
    introduction?: string
    httpStatus?: string
    responseMessage?: string
  }
}

/** 로그인 API */
export const loginAPI = async (data: {
  email: string
  password: string
}): Promise<AuthResponse> => {
  const res = await axiosInstance.post<AuthResponse>('/auth/login', data)

  // accessToken 저장 (핵심 수정 부분)
  const token = res.data.data.accessToken
  if (token) {
    localStorage.setItem('accessToken', token)
  }

  return res.data
}

/** 회원가입 API */
export const registerAPI = async (data: {
  email: string
  password: string
  nickname: string
  name?: string
  profilePicture?: string
  birthDate?: string
  introduction?: string
}): Promise<AuthResponse> => {
  const res = await axiosInstance.post<AuthResponse>('/auth/register', data)
  return res.data
}

/** 카카오 로그인 콜백 API */
export const handleKakaoCallback = async (code: string) => {
  const res = await axiosInstance.get(`/auth/kakao/redirect?code=${code}`)
  return res.data.data // 백엔드 구조에 따라 .data.user 또는 .data.data
}
