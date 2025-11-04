import { useState } from 'react'
import { createPostAPI } from '@/api/postAPI'
import { useToast } from '@/context/ToastContext'
import { useNavigate } from 'react-router-dom'

type ContentType = 'TEXT' | 'IMAGE'

export function useBlogWrite() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'none' | 'positive' | 'negative'>('none')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { showToast } = useToast()
  const navigate = useNavigate()

  /** 이미지 업로드 */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  /** 이미지 삭제 */
  const handleDeleteImage = () => {
    setImage(null)
    setIsMenuOpen(false)
  }

  /** 게시물 등록 */
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setToastType('negative')
      showToast('제목과 내용을 모두 입력해주세요.', 'negative')
      setTimeout(() => setToastType('none'), 2000)
      return
    }

    // body 구조 Swagger 스펙 완전 일치
    const requestBody = {
      title,
      contents: [
        {
          contentOrder: 1,
          content,
          contentType: image ? ('IMAGE' as ContentType) : ('TEXT' as ContentType),
        },
      ],
    }

    // 디버깅용 콘솔 (요청 데이터 & 토큰 확인)
    console.log('🪪 Token:', localStorage.getItem('accessToken'))
    console.log('📤 [Create Post Body]', JSON.stringify(requestBody, null, 2))

    try {
      await createPostAPI(requestBody)
      setToastType('positive')
      showToast('게시물이 성공적으로 등록되었습니다!', 'positive')
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('❌ [Create Post Error]', error.message)
      } else {
        console.error('❌ [Create Post Error]', error)
      }
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
