import axiosInstance from '@/api/axiosInstance'

export const createPostAPI = async (data: {
  title: string
  contents: {
    contentOrder: number
    content: string
    contentType: 'TEXT' | 'IMAGE'
  }[]
}) => {
  const token = localStorage.getItem('accessToken')

  const res = await axiosInstance.post('/posts', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return res.data
}
