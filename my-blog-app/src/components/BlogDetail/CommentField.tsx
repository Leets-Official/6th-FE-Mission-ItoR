import TextCard from '@/components/common/TextCard'
import { Button } from '@/components/Button/Button'
import ProfileImage from '@/components/ProfileImage/ProfileImage'
import CommentMetaInfo from './CommentMetaInfo'

export default function CommentField({
  state = 'beforeLogin',
}: {
  state: 'beforeLogin' | 'active' | 'writing'
}) {
  if (state === 'beforeLogin') {
    return (
      <div className='flex flex-col justify-center items-center self-stretch max-w-[688px] py-3 px-4 gap-[10px] rounded-[4px] border border-[#E6E6E6] h-[66px]'>
        <TextCard
          variant='body'
          className='flex justify-center items-center max-w-[688px] py-3 px-4 gap-[10px] self-stretch text-[#333] text-[14px] font-light leading-[160%] tracking-[-0.07px]'
        >
          로그인을 하고 댓글을 달아보세요!
        </TextCard>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-2 rounded-[4px] border border-[#E6E6E6]'>
      <CommentMetaInfo author='닉네임' date='' />
      <TextCard
        variant='body'
        className='flex flex-col items-start gap-[10px] self-stretch py-2 rounded-[4px] border border-[#E6E6E6] text-[#909090] text-[14px] font-light px-4 h-[112px]'
      >
        <textarea
          placeholder='댓글을 입력하세요.'
          className='w-full h-full bg-transparent resize-none outline-none text-[#333]'
        />
      </TextCard>

      <div className='flex justify-end gap-[10px] px-4 py-2'>
        <Button intent={state === 'writing' ? 'black' : 'secondary'} size='md'>
          등록
        </Button>
      </div>
    </div>
  )
}
