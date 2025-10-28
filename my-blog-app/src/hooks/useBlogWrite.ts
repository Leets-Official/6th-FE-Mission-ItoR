import { useState } from 'react'

export function useBlogWrite() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'none' | 'positive' | 'negative'>('none')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteImage = () => {
    setImage(null)
    setIsMenuOpen(false)
  }

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setToastType('negative')
      setTimeout(() => setToastType('none'), 2000)
      return
    }
    console.log('제목:', title)
    console.log('내용:', content)
    setToastType('positive')
    setTimeout(() => setToastType('none'), 2000)
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
