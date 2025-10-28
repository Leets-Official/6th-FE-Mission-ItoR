import axiosInstance from './axiosInstance'

// 로그인 API
export const postLogin = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post('/auth/login', data)
  return res.data
}

// 회원가입 API
export const postSignUp = async (data: { email: string; password: string; nickname?: string }) => {
  const res = await axiosInstance.post('/auth/signup', data)
  return res.data
}
