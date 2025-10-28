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
