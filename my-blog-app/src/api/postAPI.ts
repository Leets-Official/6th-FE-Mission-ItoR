import axiosInstance from './axiosInstance'

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

export const createPostAPI = async (data: CreatePostRequest, imageFile?: File | null) => {
  if (!imageFile) {
    // 이미지가 없을 경우 → JSON 그대로 전송
    return axiosInstance.post('/posts', data, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // 이미지가 있을 경우 → FormData
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('contents', JSON.stringify(data.contents)) // 문자열형 JSON
  formData.append('image', imageFile) // 파일 그대로

  return axiosInstance.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
