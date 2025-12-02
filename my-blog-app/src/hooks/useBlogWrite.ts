import { useState } from 'react'
import { createPostAPI } from '@/api/postAPI'
import { useToast } from '@/context/ToastContext'
import { useNavigate } from 'react-router-dom'
import type { CreatePostRequest } from '@/api/postAPI'

export function useBlogWrite() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 미리보기
    setImagePreview(URL.createObjectURL(file))

    // Base64 변환
    const reader = new FileReader()
    reader.onload = () => {
      setImageBase64(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDeleteImage = () => {
    setImagePreview(null)
    setImageBase64(null)
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      showToast('제목과 내용을 입력해주세요.', 'negative')
      return
    }

    const contents: CreatePostRequest['contents'] = [
      {
        contentOrder: 1,
        content,
        contentType: 'TEXT',
      },
    ]

    if (imageBase64) {
      contents.push({
        contentOrder: 2,
        content: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
        contentType: 'IMAGE',
      })
    }

    try {
      await createPostAPI({ title, contents })
      showToast('게시물이 성공적으로 등록되었습니다!', 'positive')
      navigate('/')
    } catch (error: any) {
      console.log('🔥 서버 응답:', error.response?.data)
      showToast('게시물 등록 중 오류가 발생했습니다.', 'negative')
    }
  }

  return {
    title,
    setTitle,
    content,
    setContent,
    imagePreview,
    setImagePreview,
    handleImageUpload,
    handleDeleteImage,
    handleSubmit,
  }
}
