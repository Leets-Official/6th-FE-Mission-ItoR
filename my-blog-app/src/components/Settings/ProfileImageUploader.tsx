import { useState } from 'react'
import { getPresignedUrl, uploadToS3 } from '@/api/imageAPI'
import { useUserSettings } from '@/hooks/useUserSettings'

export default function ProfileImageUploader({ initialUrl }: { initialUrl: string }) {
  const [preview, setPreview] = useState(initialUrl)
  const { setNewProfile } = useUserSettings()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 미리보기 업데이트
    setPreview(URL.createObjectURL(file))

    try {
      // 1) Presigned URL 요청
      const presignedUrl = await getPresignedUrl(file.name)

      // 2) S3 업로드
      const finalUrl = await uploadToS3(presignedUrl, file)

      // 3) settings form에 반영
      setNewProfile(finalUrl)
    } catch (err) {
      console.error('이미지 업로드 실패:', err)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <label className='cursor-pointer'>
        <img src={preview} className='w-[96px] h-[96px] rounded-full object-cover border' />
        <input type='file' className='hidden' accept='image/*' onChange={handleUpload} />
      </label>
    </div>
  )
}
