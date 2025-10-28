import { useState } from 'react'
import CommentMetaInfo from './CommentMetaInfo'
import TextCard from '@/components/common/TextCard'
import Blank from '@/components/common/Blank'
import { MoreIcon } from '@/assets/icons/MoreIcon'
import DropdownMenu from '@/components/Dropdown/DropdownMenu'

interface CommentItemProps {
  author: string
  date: string
  content: string
  onDelete: () => void
}

export default function CommentItem({ author, date, content, onDelete }: CommentItemProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className='flex flex-col w-[688px] max-w-[688px] bg-white'>
      {/* 작성자 정보 + 더보기 버튼 */}
      <div className='flex justify-between items-start w-full px-4 py-3'>
        <CommentMetaInfo author={author} date={date} />

        {/* MoreIcon + DropdownMenu */}
        <div className='relative'>
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            <MoreIcon className='w-[16px] h-[16px] text-gray-400 cursor-pointer' />
          </button>

          {menuOpen && (
            <div className='absolute right-0 mt-2 z-50'>
              <DropdownMenu variant='arrow' items={[{ label: '삭제하기', onClick: onDelete }]} />
            </div>
          )}
        </div>
      </div>

      {/* 댓글 본문 */}
      <TextCard variant='body' className='px-4 py-2 text-[#333]'>
        {content}
      </TextCard>

      {/* 구분 여백 */}
      <Blank size='sm' />
    </div>
  )
}
