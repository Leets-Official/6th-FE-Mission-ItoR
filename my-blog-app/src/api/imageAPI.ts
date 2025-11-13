import axiosInstance from './axiosInstance'

/**
 * 이미지 업로드 API
 * - 파일을 multipart/form-data 로 전송
 * - 서버는 이미지 URL을 응답으로 반환
 */
export const uploadImageAPI = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('image', file)

  const res = await axiosInstance.post('/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return res.data.data.imageUrl // 서버가 반환하는 이미지 URL
}
