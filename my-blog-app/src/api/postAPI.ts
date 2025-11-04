import axiosInstance from '@/api/axiosInstance'

export const createPostAPI = async (data: {
  title: string
  contents: {
    contentOrder: number
    content: string
    contentType: 'TEXT' | 'IMAGE'
  }[]
}) => {
  // contentType을 대문자 TEXT/IMAGE로 통일
  const fixedData = {
    ...data,
    contents: data.contents.map((item) => ({
      ...item,
      contentType: item.contentType.toUpperCase() === 'IMAGE' ? 'IMAGE' : 'TEXT',
    })),
  }

  // 헤더는 axiosInstance에서 자동으로 Authorization 추가됨
  const res = await axiosInstance.post('/posts', fixedData)
  return res.data
}
