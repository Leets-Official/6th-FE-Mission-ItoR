import profileImg from '@/assets/images/profileimage.png'

type CommentMetaInfoProps = {
  author: string
  date: string
}

export default function CommentMetaInfo({ author, date }: CommentMetaInfoProps) {
  return (
    <div className='flex w-[688px] px-4 py-3 items-center gap-[10px] bg-white'>
      {/* 프로필 이미지 */}
      <img src={profileImg} alt='프로필 이미지' />

      {/* 작성자 + 날짜 */}
      <div className='flex flex-col'>
        <span className='text-[14px] font-normal text-[#333] leading-[160%]'>{author}</span>
        <span className='text-[12px] font-light text-[#909090] leading-[160%]'>{date}</span>
      </div>
    </div>
  )
}
