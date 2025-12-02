import { useState } from 'react'
import { getPresignedUrl, uploadToS3 } from '@/api/imageAPI'
import { useUserSettings } from '@/hooks/useUserSettings'

interface UploaderProps {
  initialUrl: string
  onChange: (newUrl: string) => void
  disabled: boolean
}

export default function ProfileImageUploader({ initialUrl, onChange, disabled }: UploaderProps) {
  const [preview, setPreview] = useState(initialUrl)
  const { setNewProfile } = useUserSettings()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || disabled) return

    setPreview(URL.createObjectURL(file))

    try {
      const presignedUrl = await getPresignedUrl(file.name)

      const finalUrl = await uploadToS3(presignedUrl, file)

      setNewProfile(finalUrl)

      onChange(finalUrl)
    } catch (err) {
      console.error('이미지 업로드 실패:', err)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <label className={`cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <img src={preview} className='w-[96px] h-[96px] rounded-full object-cover border' />
        {/* disabled 상태에서는 input을 비활성화 */}
        <input
          type='file'
          className='hidden'
          accept='image/*'
          onChange={handleUpload}
          disabled={disabled}
        />
      </label>
    </div>
  )
}
