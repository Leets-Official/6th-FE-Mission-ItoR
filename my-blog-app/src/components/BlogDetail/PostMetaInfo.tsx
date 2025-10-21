import profileImg from '@/assets/images/profileimage.png'
import { DotIcon } from '@/assets/icons/DotIcon'

export default function PostMetaInfo({
  author,
  date,
  commentCount = 0,
}: {
  author: string
  date: string
  commentCount?: number
}) {
  return (
    <div className='flex items-center gap-[10px] bg-white w-[688px] px-4 py-3'>
      {/* 프로필 이미지 */}
      <img src={profileImg} alt='프로필 이미지' className='w-5 h-5 rounded-full object-cover' />

      {/* 작성자 + 날짜 + 댓글 */}
      <div className='flex items-center text-[12px] leading-[160%] text-[#909090]'>
        {/* 작성자 */}
        <span className='text-[#333] font-normal'>{author}</span>

        {/* 구분 아이콘 */}
        <DotIcon />

        {/* 날짜 */}
        <span className='font-light'>{date}</span>

        {/* 구분 아이콘 */}
        <DotIcon />

        {/* 댓글 수 */}
        <span className='font-light'>댓글 {commentCount}</span>
      </div>
    </div>
  )
}
