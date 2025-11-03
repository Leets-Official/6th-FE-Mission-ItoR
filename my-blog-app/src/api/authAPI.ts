import axiosInstance from './axiosInstance'

// 로그인 API
export const loginAPI = (data: { email: string; password: string }) =>
  axiosInstance.post('/auth/login', data)

// 회원가입(register) API
export const registerAPI = (data: {
  email: string
  password: string
  nickname: string
  name?: string
  profilePicture?: string
  birthDate?: string
  introduction?: string
}) => axiosInstance.post('/auth/register', data)

// 추가: 카카오 로그인 콜백 API
export const handleKakaoCallback = async (code: string) => {
  const response = await axiosInstance.get(`/auth/kakao/redirect?code=${code}`)
  return response.data.data // 백엔드 응답 구조에 따라 .data.data 또는 .data.user
}
