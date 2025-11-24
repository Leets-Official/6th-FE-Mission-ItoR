import axiosInstance from './axiosInstance'

export const getMyInfoAPI = async () => {
  const res = await axiosInstance.get('/users/me')
  return res.data.data
}
