import axiosInstance from './axiosInstance'

export const postLogin = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post('/auth/login', data)
  return res.data
}
