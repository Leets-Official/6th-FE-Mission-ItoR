import { useState } from 'react'
import { createPostAPI } from '@/api/postAPI'
import { useToast } from '@/context/ToastContext'

export function useBlogWrite() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'none' | 'positive' | 'negative'>('none')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { showToast } = useToast()

  // 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  // 이미지 삭제
  const handleDeleteImage = () => {
    setImage(null)
    setIsMenuOpen(false)
  }

  // 게시물 등록
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setToastType('negative')
      showToast('제목과 내용을 모두 입력해주세요.', 'negative')
      setTimeout(() => setToastType('none'), 2000)
      return
    }

    try {
      // Swagger 명세에 맞는 body 구조
      const requestBody = {
        title,
        contents: [
          {
            contentOrder: 1,
            content,
            contentType: (image ? 'IMAGE' : 'TEXT') as 'IMAGE' | 'TEXT', // 타입 명시
          },
        ],
      }

      await createPostAPI(requestBody)

      setToastType('positive')
      showToast('게시물이 성공적으로 등록되었습니다!', 'positive')

      // 성공 후 이동
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    } catch (error) {
      console.error(error)
      setToastType('negative')
      showToast('게시물 등록 중 오류가 발생했습니다.', 'negative')
    } finally {
      setTimeout(() => setToastType('none'), 2000)
    }
  }

  return {
    title,
    setTitle,
    content,
    setContent,
    image,
    setImage,
    toastType,
    isMenuOpen,
    setIsMenuOpen,
    handleImageUpload,
    handleDeleteImage,
    handleSubmit,
  }
}
