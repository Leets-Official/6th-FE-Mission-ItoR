import { useRef, useState } from 'react'
import { getPresignedUrl, uploadToS3 } from '@/api/imageAPI'

type ProfileImageUploaderProps = {
  value?: string
  onChange?: (url: string) => void
}

export default function ProfileImageUploader({ value, onChange }: ProfileImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | undefined>(value)
  const [isUploading, setIsUploading] = useState(false)

  const handleClick = () => {
    if (!isUploading) fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // 미리보기
      setPreview(URL.createObjectURL(file))

      // 1) presigned-url 요청
      const presignedUrl = await getPresignedUrl(file.name)

      // 2) S3 업로드
      const uploadedUrl = await uploadToS3(presignedUrl, file)

      // 3) 부모에게 최종 URL 전달
      onChange?.(uploadedUrl)
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
      alert('이미지 업로드에 실패했습니다.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <button
        type='button'
        onClick={handleClick}
        className='w-[96px] h-[96px] rounded-full bg-gray-200 overflow-hidden flex items-center justify-center'
        disabled={isUploading}
      >
        {preview ? (
          <img src={preview} alt='profile' className='w-full h-full object-cover' />
        ) : (
          <span className='text-xs text-gray-500'>{isUploading ? '업로드 중...' : '프로필'}</span>
        )}
      </button>

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />

      <p className='mt-2 text-xs text-gray-400'>이미지를 클릭해서 변경할 수 있어요.</p>
    </div>
  )
}
