import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from '@/api/axiosInstance'
import ListItemMain from '@/components/BlogDetail/ListItemMain'
import type { Post } from '@/types/post'

export default function BlogDetailPage() {
  const { postId } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!postId) return

    const fetchPost = async () => {
      try {
        // 1차: 로그인 사용자용
        const res = await axiosInstance.get('/posts/token', { params: { postId } })
        setPost(res.data.data)
      } catch (e: any) {
        // 2차: 비로그인용으로 폴백
        if (e?.response?.status === 401 || e?.response?.status === 404) {
          try {
            const res2 = await axiosInstance.get('/posts', { params: { postId } })
            setPost(res2.data.data)
          } catch (e2) {
            console.error('게시글 불러오기 실패(폴백):', e2)
          }
        } else {
          console.error('게시글 불러오기 실패:', e)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  if (loading) return <div>로딩 중...</div>
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>

  return (
    <main className='flex justify-center bg-white'>
      <ListItemMain post={post} />
    </main>
  )
}
