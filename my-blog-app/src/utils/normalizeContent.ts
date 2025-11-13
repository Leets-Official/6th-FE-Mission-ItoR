import type { CreatePostRequest } from '@/api/postAPI'

/**
 * contentType을 대문자(TEXT/IMAGE)로 변환해 일관성 유지
 */
export const normalizeContentTypes = (data: CreatePostRequest) => ({
  ...data,
  contents: data.contents.map((item) => ({
    ...item,
    contentType: item.contentType.toUpperCase() === 'IMAGE' ? 'IMAGE' : 'TEXT',
  })),
})
