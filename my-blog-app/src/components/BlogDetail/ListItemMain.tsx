import { useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import Blank from '@/components/common/Blank'
import TextCard from '@/components/common/TextCard'
import PictureFrame from './PictureFrame'
import CommentField from './CommentField'
import ProfileImage from '@/components/ProfileImage/ProfileImage'
import BlogTitleSection from './BlogTitleSection'
import { ChatIcon, MoreIcon } from '@/assets/icons'
import CommentCount from './CommentCount'
import DropdownMenu from '@/components/Dropdown/DropdownMenu'
import CommentItem from './CommentItem'
import { useComment } from '@/hooks/useComment'
import { useToast } from '@/context/ToastContext'
import { useModal } from '@/context/ModalContext'
import type { Post } from '@/types/post'

export default function ListItemMain({ post }: { post: Post }) {
  const [commentState] = useState<'beforeLogin' | 'active' | 'writing'>('active')
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null)

  const {
    comments,
    newComment,
    commentRef,
    setNewComment,
    handleScrollToComments,
    handleAddComment,
    handleDeleteClick,
  } = useComment()

  const { showToast } = useToast()
  const { openModal } = useModal()

  // 댓글 추가 시 토스트 표시
  const handleAddCommentWithToast = () => {
    if (!newComment.trim()) {
      showToast('내용을 입력해주세요.', 'negative')
      return
    }
    handleAddComment()
    showToast('댓글이 등록되었습니다.', 'positive')
  }

  // 댓글 삭제 시 모달 → 토스트 표시
  const handleDeleteClickWithModal = (index: number) => {
    openModal('댓글을 삭제할까요?', () => {
      handleDeleteClick(index)
      showToast('댓글이 삭제되었습니다.', 'positive')
    })
  }

  return (
    <div className='flex flex-col w-[1366px] min-h-screen items-center bg-white'>
      {/* 1. 상단 헤더 */}
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
                      { label: '수정하기', onClick: () => alert('수정 예정') },
                      {
                        label: '삭제하기',
                        onClick: () =>
                          openModal('게시글을 삭제할까요?', () =>
                            showToast('게시글이 삭제되었습니다.', 'positive'),
                          ),
                      },
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        }
      />

      <Blank size='lg' />

      {/* 2. 제목 / 작성자 */}
      <section className='w-[688px]'>
        <h1 className='text-2xl font-bold mb-2'>{post.title}</h1>
        <div className='text-gray-500 text-sm'>
          {post.nickName} · {new Date(post.createdAt).toLocaleString()}
        </div>
      </section>

      <Blank size='md' />

      {/* 3. 본문 */}
      <section className='flex flex-col w-[688px] px-4 py-3 gap-[10px] rounded-[4px]'>
        {post.contents?.map((content, index: number) =>
          content.contentType === 'IMAGE' ? (
            <PictureFrame key={index} src={content.content} type='large' />
          ) : (
            <TextCard key={index} variant='body'>
              {content.content}
            </TextCard>
          ),
        )}
      </section>

      <Blank size='md' />

      {/* 4. 댓글 */}
      <section
        ref={commentRef}
        className='flex flex-col items-center self-stretch border-b border-[#F5F5F5] bg-white'
      >
        <div className='w-[688px] flex flex-col px-4 py-3 gap-[10px]'>
          <CommentCount count={comments.length} />

          {comments.length === 0 ? (
            <TextCard variant='body' className='flex justify-center items-center text-[#C8C8C8]'>
              아직 댓글이 없습니다.
            </TextCard>
          ) : (
            comments.map((comment, index) => (
              <CommentItem
                key={index}
                author='닉네임'
                date='2025.11.05''
                content={comment}
                onDelete={() => handleDeleteClickWithModal(index)}
              />
            ))
          )}

          <Blank size='sm' />
          <CommentField
            state={commentState}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onSubmit={handleAddCommentWithToast}
          />
        </div>
      </section>

      <Blank size='lg' />

      {/* 5. 작성자 정보 */}
      <section className='flex flex-col items-center w-full border-t border-[#F5F5F5] bg-[#F5F5F5] py-[64px]'>
        <div className='flex flex-col items-start gap-[12px] w-[688px] px-4 py-3'>
          <ProfileImage size='lg' src={post.profileUrl} />
          <TextCard
            variant='primary'
            title={post.nickName}
            subtitle='게시물 작성자입니다.'
            className='text-center'
          />
        </div>
      </section>
    </div>
  )
}
