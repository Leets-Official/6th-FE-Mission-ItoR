import { useState } from 'react'
import DropdownMenu from '@/components/Dropdown/DropdownMenu'
import CommentMetaInfo from './CommentMetaInfo'
import TextCard from '@/components/common/TextCard'
import Blank from '@/components/common/Blank'
import { MoreIcon } from '@/assets/icons/MoreIcon'

interface CommentItemProps {
  commentId?: number
  author: string
  date: string
  content: string
  onDelete: () => void
  onEditSubmit: (value: string) => void
}

export default function CommentItem({ author, date, content, onDelete }: CommentItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex flex-col w-[688px] bg-white'>
      {/* 상단 메타 정보 */}
      <div className='flex justify-between items-start px-4 py-3'>
        <CommentMetaInfo author={author} date={date} />

        <div className='relative'>
          <button onClick={() => setOpen(!open)}>
            <MoreIcon className='w-[16px] h-[16px]' />
          </button>
          {open && (
            <div className='absolute right-0 mt-2 z-50'>
              <DropdownMenu variant='arrow' items={[{ label: '삭제하기', onClick: onDelete }]} />
            </div>
          )}
        </div>
      </div>

      {/* 본문 */}
      <TextCard variant='body' className='px-4 py-2'>
        {content}
      </TextCard>

      <Blank size='sm' />
    </div>
  )
}
