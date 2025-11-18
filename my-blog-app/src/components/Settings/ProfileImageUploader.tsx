import { useState } from 'react'
import axiosInstance from '@/api/axiosInstance'
import { useUserSettings } from '@/hooks/useUserSettings'

export default function ProfileImageUploader({ initialUrl }: { initialUrl: string }) {
  const [preview, setPreview] = useState(initialUrl)
  const { setNewProfile } = useUserSettings()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 화면 미리보기
    setPreview(URL.createObjectURL(file))

    // presigned URL 요청
    const res = await axiosInstance.get('/images/presigned-url', {
      params: { fileName: file.name },
    })

    const presignedUrl = res.data.data

    // S3 업로드
    await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
    })

    // 업로드된 실제 URL
    const finalUrl = presignedUrl.split('?')[0]

    setNewProfile(finalUrl)
  }

  return (
    <div className='flex flex-col items-center'>
      <label className='cursor-pointer'>
        <img src={preview} className='w-[96px] h-[96px] rounded-full object-cover border' />
        <input type='file' className='hidden' onChange={handleUpload} />
      </label>
    </div>
  )
}
