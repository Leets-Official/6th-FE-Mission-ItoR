import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'
import Blank from '@/components/common/Blank'
import ProfileImage from '@/components/ProfileImage/ProfileImage'
import { Button } from '@/components/Button/Button'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useEffect, useState } from 'react'
import axiosInstance from '@/api/axiosInstance'
import ListItem from '@/components/ListItem/ListItem'
import { SettingsIcon } from '@/assets/icons/SettingsIcon'
import Pagination from '@/components/Pagination/Pagination'
import type { Post } from '@/types/post'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { data: user, isLoading, isError } = useUserInfo()
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)

  /** 전체 게시글 목록 조회 */
  useEffect(() => {
    axiosInstance
      .get('/posts/all', { params: { size: 10, page: 1 } })
      .then((res) => {
        const fetched = Array.isArray(res.data.data) ? res.data.data : res.data.data.posts
        setPosts(fetched || [])
      })
      .catch((err) => console.error('게시글 불러오기 실패:', err))
  }, [])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>불러오는 중...</p>
      </div>
    )
  }

  if (isError || !user) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>사용자 정보를 불러올 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white flex flex-col items-center'>
      <PageHeader title='GITLOG' />

      {/* 상단 회색 영역(전체 폭) */}
      <div className='w-full bg-[#F5F5F5] border-b border-[#F5F5F5] flex justify-center'>
        <div className='flex flex-col max-w-[688px] w-full px-4 py-3 items-start gap-3 self-stretch'>
          <Blank size='lg' />
          <ProfileImage size='lg' src={user.profilePictureUrl} />

          <p className='text-[24px] font-semibold'>{user.nickname}</p>

          <p className='text-gray-600 text-[14px]'>{user.introduction || '소개가 없습니다.'}</p>

          <Button
            intent='tag'
            className='flex gap-1 border border-[#E6E6E6] rounded-[2px] px-[8px] py-[3px] items-center'
            onClick={() => navigate('/settings')}
          >
            <SettingsIcon />
            <span className='text-[#909090] text-[12px] leading-[160%] font-normal'>
              내 프로필 설정
            </span>
          </Button>

          <Blank size='sm' />
        </div>
      </div>

      {/* 전체 게시글 리스트 */}
      <div className='w-full flex justify-center mt-10'>
        <div className='w-full max-w-[688px] px-4'>
          <Blank size='md' />
          {posts.length > 0 ? (
            posts.map((post) => (
              <ListItem
                key={post.postId}
                title={post.title}
                description={
                  post.contents?.[0]?.content
                    ? post.contents[0].content.length > 80
                      ? post.contents[0].content.slice(0, 80) + '...'
                      : post.contents[0].content
                    : '(내용 없음)'
                }
                nickname={post.nickName}
                date={new Date(post.createdAt).toLocaleDateString('ko-KR')}
                commentCount={post.commentCount || 0}
                onClick={() => navigate(`/blog/${post.postId}`)}
              />
            ))
          ) : (
            <p className='text-gray-400 mt-20'>아직 게시글이 없습니다.</p>
          )}
        </div>
      </div>

      <Blank size='md' />
      <div className='mt-10'>
        <Pagination totalPages={5} currentPage={page} onPageChange={setPage} />
      </div>
    </div>
  )
}
