import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/api/axiosInstance'

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () => axiosInstance.get('/users/me').then((res) => res.data.data),
  })
}
