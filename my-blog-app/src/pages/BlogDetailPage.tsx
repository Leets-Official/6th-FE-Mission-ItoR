import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from '@/api/axiosInstance'
import ListItemMain from '@/components/BlogDetail/ListItemMain'
import type { Post } from '@/types/post'

export default function BlogDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    if (!id) return
    axiosInstance
      .get('/posts/token', { params: { postId: id } })
      .then((res) => setPost(res.data.data))
      .catch((err) => console.error('게시글 불러오기 실패:', err))
  }, [id])

  if (!post) return <div>로딩 중...</div>

  return (
    <main className='flex justify-center bg-white'>
      <ListItemMain post={post} />
    </main>
  )
}
