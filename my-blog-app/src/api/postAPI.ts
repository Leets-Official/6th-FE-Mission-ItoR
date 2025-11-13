import axiosInstance from './axiosInstance'
import { normalizeContentTypes } from '@/utils/normalizeContent'

interface TextContent {
  contentOrder: number
  content: string
  contentType: 'TEXT'
}

interface ImageContent {
  contentOrder: number
  content: string
  contentType: 'IMAGE'
}

export interface CreatePostRequest {
  title: string
  contents: (TextContent | ImageContent)[]
}

/**
 * 게시글 생성 API
 * - 이미지가 없는 경우: JSON 전송
 * - 이미지가 있는 경우: FormData 전송
 */
export const createPostAPI = async (data: CreatePostRequest, imageFile?: File | null) => {
  // contentType을 TEXT/IMAGE로 통일
  const fixedData = normalizeContentTypes(data)

  if (!imageFile) {
    // 이미지가 없을 경우 → JSON 전송
    return axiosInstance.post('/posts', fixedData, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // 이미지가 있을 경우 → FormData 전송
  const formData = new FormData()
  formData.append('title', fixedData.title)
  formData.append('contents', JSON.stringify(fixedData.contents))
  formData.append('image', imageFile)

  return axiosInstance.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
