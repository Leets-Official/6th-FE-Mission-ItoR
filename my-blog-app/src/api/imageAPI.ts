import axiosInstance from './axiosInstance'

/** Presigned URL 요청 */
export const getPresignedUrl = async (fileName: string): Promise<string> => {
  const res = await axiosInstance.get('/images/presigned-url', {
    params: { fileName },
  })
  return res.data.data // presigned URL
}

/** Presigned URL로 S3에 파일 업로드 */
export const uploadToS3 = async (presignedUrl: string, file: File): Promise<string> => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  })

  if (!response.ok) {
    throw new Error('S3 업로드 실패')
  }

  // presigned URL에서 '?' 이전은 실제 업로드된 이미지의 HTTPS URL
  return presignedUrl.split('?')[0]
}
