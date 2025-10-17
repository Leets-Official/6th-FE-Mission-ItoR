export default function ListItemMeta({
  nickname = '닉네임',
  date = '2025.10.15',
  commentCount = 0,
  image = '@/assets/images/profileimage.png',
}: {
  nickname?: string
  date?: string
  commentCount?: number
  image?: string
}) {
  return (
    <div className='flex items-center gap-2 px-4 py-3 bg-transparent w-[688px]'>
      {/* 프로필 이미지 */}
      <div
        className='w-[20px] h-[20px] rounded-full bg-cover bg-center'
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* 닉네임 */}
      <span className='text-[12px] font-normal text-[#333] leading-[160%]'>{nickname}</span>

      {/* 구분점 */}
      <div className='w-[2px] h-[2px] rounded-full bg-[#E6E6E6]' />

      {/* 날짜 */}
      <span className='text-[12px] font-light text-[#909090] leading-[160%]'>{date}</span>

      {/* 구분점 */}
      <div className='w-[2px] h-[2px] rounded-full bg-[#E6E6E6]' />

      {/* 댓글 */}
      <span className='text-[12px] font-light text-[#909090] leading-[160%]'>
        댓글 {commentCount}
      </span>
    </div>
  )
}
