import axiosInstance from './axiosInstance'

/** Presigned URL 요청 */
export const getPresignedUrl = async (fileName: string): Promise<string> => {
  const res = await axiosInstance.get('/images/presigned-url', {
    params: { fileName },
  })
  return res.data.data // presigned url
}

/** presigned URL로 S3에 PUT 업로드 */
export const uploadToS3 = async (presignedUrl: string, file: File): Promise<string> => {
  await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },햐
    body: file,
  })

  // presigned URL의 ? 이전 부분이 실제 이미지 URL
  return presignedUrl.split('?')[0]
}
