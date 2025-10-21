import { useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import Blank from '@/components/common/Blank'
import TextCard from '@/components/common/TextCard'
import PictureFrame from './PictureFrame'
import CommentField from './CommentField'
import ProfileImage from '@/components/ProfileImage/ProfileImage'
import PostMetaInfo from './PostMetaInfo'
import BlogTitleSection from './BlogTitleSection'
import { ChatIcon } from '@/assets/icons/ChatIcon'
import { MoreIcon } from '@/assets/icons/MoreIcon'
import CommentCount from './CommentCount'

export default function ListItemMain() {
  const [commentState, setCommentState] = useState<'beforeLogin' | 'active' | 'writing'>(
    'beforeLogin',
  )
  return (
    <div className='flex flex-col w-[1366px] h-[768px] items-center bg-white min-h-screen'>
      {/* 1. 페이지 헤더 */}
      <PageHeader
        title='GITLOG'
        rightContent={
          <div className='flex gap-6'>
            <ChatIcon />
            <MoreIcon />
          </div>
        }
      />
      <Blank size='lg' />

      {/* 2. Title Section */}
      <BlogTitleSection />

      {/* 3. 본문 Section */}
      <Blank size='md' />
      <section className='flex flex-col w-[688px] max-w-[688px] bg-white px-4 py-3 gap-[10px] rounded-[4px]'>
        <TextCard variant='body'>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}</TextCard>
        <PictureFrame src='/src/assets/images/blogdetail1.png' type='small' />
        <TextCard variant='body'>{`It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}</TextCard>
        <PictureFrame src='/src/assets/images/blogdetail2.png' type='large' />
      </section>

      {/* 테스트용 상태 전환 버튼 */}
      <div className='flex gap-2 my-4'>
        <button
          onClick={() => setCommentState('beforeLogin')}
          className='border px-3 py-1 rounded text-sm'
        >
          beforeLogin
        </button>
        <button
          onClick={() => setCommentState('active')}
          className='border px-3 py-1 rounded text-sm'
        >
          active
        </button>
        <button
          onClick={() => setCommentState('writing')}
          className='border px-3 py-1 rounded text-sm'
        >
          writing
        </button>
      </div>

      {/* 4. 댓글 Section */}
      <Blank size='md' />
      <section className='flex flex-col items-center self-stretch border-b border-[#F5F5F5] bg-white'>
        <div className='w-[688px] max-w-[688px] flex flex-col px-4 py-3 gap-[10px]'>
          <CommentCount count={0} />

          <TextCard variant='body' className='flex justify-center items-center'>
            <div className='text-center text-[14px] text-[#C8C8C8] font-light leading-[160%]'>
              작성된 댓글이 없습니다.
              <br /> 응원의 첫 번째 댓글을 달아주세요.
            </div>
          </TextCard>

          <Blank size='sm' />
          <CommentField state={commentState} />
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
    </div>
  )
}
