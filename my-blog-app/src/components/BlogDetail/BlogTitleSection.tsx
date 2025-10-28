import TextCard from '@/components/common/TextCard'
import Blank from '@/components/common/Blank'
import PostMetaInfo from './PostMetaInfo'

export default function BlogTitleSection() {
  return (
    <section className='flex flex-col w-full max-w-[688px] bg-white px-4 py-[16px]'>
      {/* 제목/부제목 */}
      <TextCard variant='primary' title='32 Title one line' />

      {/* 여백 */}
      <Blank size='md' />

      {/* 게시글 기타사항 (작성자, 날짜) */}
      <PostMetaInfo author='닉네임' date='Fed 17. 2025.' />
    </section>
  )
}
