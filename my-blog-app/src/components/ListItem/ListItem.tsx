import ListItemMeta from './ListItemMeta'
import PictureFrame from './PictureFrame'

interface ListItemProps {
  title: string
  description: string
  image?: string
  nickname?: string
  date?: string
  commentCount?: number
  onClick?: () => void
}

export default function ListItem({
  title,
  description,
  image,
  nickname,
  date,
  commentCount,
  onClick,
}: ListItemProps) {
  return (
    <div
      className='flex w-[688px] max-w-[688px] py-4 items-start gap-6 border-b border-[#F5F5F5] bg-transparent'
      onClick={onClick}
    >
      {/* 왼쪽: 텍스트 영역 */}
      <div className='flex flex-col gap-2 flex-1'>
        <h3 className='text-[16px] font-semibold text-[#333]'>{title}</h3>

        <p className='text-[14px] text-gray-800 leading-[160%] line-clamp-2'>{description}</p>

        <ListItemMeta nickname={nickname} date={date} commentCount={commentCount} />
      </div>

      {/* 오른쪽: 썸네일 이미지 */}
      {image && <PictureFrame src={image} />}
    </div>
  )
}
