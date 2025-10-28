import { useRef, useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import Blank from '@/components/common/Blank'
import TextCard from '@/components/common/TextCard'
import PictureFrame from './PictureFrame'
import CommentField from './CommentField'
import ProfileImage from '@/components/ProfileImage/ProfileImage'
import PostMetaInfo from './PostMetaInfo'
import BlogTitleSection from './BlogTitleSection'
import { ChatIcon, MoreIcon } from '@/assets/icons'
import CommentCount from './CommentCount'
import DropdownMenu from '@/components/Dropdown/DropdownMenu'
import ConfirmModal from '@/components/common/ConfirmModal/ConfirmModal'
import Toast from '@/components/common/Toast'
import CommentItem from './CommentItem'

export default function ListItemMain() {
  const [commentState, setCommentState] = useState<'beforeLogin' | 'active' | 'writing'>('active') // 테스트용
  const [comments, setComments] = useState<string[]>([]) // 댓글 목록
  const [newComment, setNewComment] = useState('') // 입력값
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [toast, setToast] = useState<{
    show: boolean
    message: string
    type: 'positive' | 'negative'
  }>({
    show: false,
    message: '',
    type: 'positive',
  })

  const commentRef = useRef<HTMLDivElement>(null)

  const handleScrollToComments = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    setComments((prev) => [...prev, newComment.trim()])
    setNewComment('')
  }

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index)
    setConfirmOpen(true)
    setOpenMenuIndex(null)
  }

  const handleDeleteConfirm = () => {
    if (deleteIndex !== null) {
      setComments((prev) => prev.filter((_, i) => i !== deleteIndex))
      setToast({ show: true, message: '댓글이 삭제되었습니다', type: 'positive' })
      setTimeout(() => setToast({ show: false, message: '', type: 'positive' }), 2000)
    }
    setConfirmOpen(false)
  }

  return (
    <div className='flex flex-col w-[1366px] min-h-screen items-center bg-white'>
      {/* 1. PageHeader */}
      <PageHeader
        title='GITLOG'
        rightContent={
          <div className='flex gap-6 items-center'>
            <button onClick={handleScrollToComments}>
              <ChatIcon />
            </button>

            {/* 드롭다운 메뉴 (게시글용) */}
            <div className='relative'>
              <button onClick={() => setOpenMenuIndex(openMenuIndex === -1 ? null : -1)}>
                <MoreIcon />
              </button>
              {openMenuIndex === -1 && (
                <div className='absolute right-0 mt-2 z-50'>
                  <DropdownMenu
                    variant='arrow'
                    items={[
                      { label: '수정하기', onClick: () => alert('수정 페이지 이동 예정') },
                      { label: '삭제하기', onClick: () => setConfirmOpen(true) },
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        }
      />

      <Blank size='lg' />

      {/* 2. Title Section */}
      <BlogTitleSection />

      {/* 3. 본문 Section */}
      <Blank size='md' />
      <section className='flex flex-col w-[688px] max-w-[688px] bg-white px-4 py-3 gap-[10px] rounded-[4px]'>
        <TextCard variant='body'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </TextCard>
        <PictureFrame src='/src/assets/images/blogdetail1.png' type='small' />
        <TextCard variant='body'>
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages.
        </TextCard>
        <PictureFrame src='/src/assets/images/blogdetail2.png' type='large' />
      </section>

      {/* 4. 댓글 Section */}
      <Blank size='md' />
      <section
        ref={commentRef}
        className='flex flex-col items-center self-stretch border-b border-[#F5F5F5] bg-white'
      >
        <div className='w-[688px] max-w-[688px] flex flex-col px-4 py-3 gap-[10px]'>
          <CommentCount count={comments.length} />

          {/* 댓글 리스트 */}
          {comments.length === 0 ? (
            <TextCard variant='body' className='flex justify-center items-center'>
              <div className='text-center text-[14px] text-[#C8C8C8] font-light leading-[160%]'>
                작성된 댓글이 없습니다.
                <br /> 응원의 첫 번째 댓글을 달아주세요.
              </div>
            </TextCard>
          ) : (
            comments.map((comment, index) => (
              <CommentItem
                key={index}
                author='닉네임'
                date='Fed 17. 2025.'
                content={comment}
                onDelete={() => handleDeleteClick(index)}
              />
            ))
          )}

          {/* 댓글 입력 영역 */}
          <Blank size='sm' />
          <div className='flex gap-2'>
            <CommentField
              state={commentState}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onSubmit={handleAddComment}
            />
          </div>
        </div>
      </section>

      {/* 5. Footer (작성자 소개) */}
      <Blank size='lg' />
      <section className='flex flex-col items-center w-full border-t border-[#F5F5F5] bg-[#F5F5F5] py-[64px]'>
        <div className='flex flex-col items-start gap-[12px] w-[688px] px-4 py-3'>
          <ProfileImage size='lg' />
          <TextCard
            variant='primary'
            title='%{닉네임}'
            subtitle='%{한 줄 소개}'
            className='flex flex-col items-center text-center px-0 py-0'
          />
        </div>
      </section>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        title='댓글을 삭제할까요?'
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Toast */}
      {toast.show && (
        <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-50'>
          <Toast type={toast.type} message={toast.message} />
        </div>
      )}
    </div>
  )
}
