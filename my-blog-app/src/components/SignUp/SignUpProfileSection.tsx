import { Button } from '@/components/Button/Button'
import ProfileImage from '@/components/ProfileImage/ProfileImage'
import { AddPhotoAlternateIcon } from '@/assets/icons/AddPhotoAlternateIcon'

interface SignUpProfileSectionProps {
  title?: string
}

export default function SignUpProfileSection({ title = '프로필 사진' }: SignUpProfileSectionProps) {
  return (
    <div className='flex flex-col justify-center items-start self-stretch gap-4 max-w-[688px] px-[16px] py-[12px]'>
      <span className='text-gray-400 text-[14px] font-light leading-[160%] tracking-[-0.07px] w-full'>
        {title}
      </span>

      <div className='flex flex-col items-start gap-4'>
        <ProfileImage size='xl' />
        <Button
          intent='tag'
          className='flex gap-1 border border-[#E6E6E6] rounded-[2px] px-[8px] py-[3px]'
        >
          <AddPhotoAlternateIcon />
          <span className='text-[#909090] text-[12px] leading-[160%] font-normal'>
            프로필 사진 추가하기
          </span>
        </Button>
      </div>
    </div>
  )
}
