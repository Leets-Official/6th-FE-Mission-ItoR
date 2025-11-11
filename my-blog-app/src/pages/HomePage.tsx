// src/pages/HomePage.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'
import Pagination from '@/components/Pagination/Pagination'
import ListItem from '@/components/ListItem/ListItem'
import LoginModal from '@/pages/LoginModal'
import { Button } from '@/components/Button/Button'
import { EditIcon } from '@/assets/icons/EditIcon'
import axiosInstance from '@/api/axiosInstance'
import { useAuthStore } from '@/stores/useAuthStore'
import type { Post } from '@/types/post'

export default function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStore()

  /** 게시글 목록 불러오기 */
  useEffect(() => {
    axiosInstance
      .get('/posts/all', { params: { size: 10, page } })
      .then((res) => {
        const fetchedPosts = Array.isArray(res.data.data) ? res.data.data : res.data.data.posts
        setPosts(fetchedPosts || [])
      })
      .catch((err) => {
        console.error('❌ 게시글 목록 불러오기 실패:', err)
      })
  }, [page])

  return (
    <div className='min-h-screen bg-white flex flex-col items-center'>
      {/* 헤더 */}
      <PageHeader
        title='GITLOG'
        rightContent={
          <Button
            intent='flat'
            className='text-gray-300'
            icon={<EditIcon color='#909090' />}
            onClick={() => {
              if (isLoggedIn) {
                navigate('/blogwrite')
              } else {
                setIsLoginOpen(true)
              }
            }}
          >
            깃로그 쓰기
          </Button>
        }
      />

      {/* 게시글 리스트 */}
      <main className='flex flex-col items-center mt-10 gap-4'>
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
          <p className='text-gray-400 mt-20'>아직 등록된 게시글이 없습니다.</p>
        )}
      </main>

      {/* 페이지네이션 */}
      <div className='mt-10'>
        <Pagination totalPages={5} currentPage={page} onPageChange={setPage} />
      </div>

      {/* 로그인 모달 */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </div>
  )
}
