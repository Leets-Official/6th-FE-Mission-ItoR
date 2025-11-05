import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'
import Pagination from '@/components/Pagination/Pagination'
import ListItem from '@/components/ListItem/ListItem'
import LoginModal from '@/pages/LoginModal'
import { Button } from '@/components/Button/Button'
import { EditIcon } from '@/assets/icons/EditIcon'
import PictureFrame from '@/components/ListItem/PictureFrame'
import { mockPosts } from '@/constants/mockPosts'
import { useAuthStore } from '@/stores/useAuthStore'

export default function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStore()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setIsLoginOpen(true)
    }
  }, [])

  return (
    <div className='min-h-screen bg-white flex flex-col items-center'>
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

      <main className='flex flex-col items-center mt-10 gap-4'>
        {mockPosts.map((post) => (
          <ListItem
            key={post.id}
            title={post.title}
            description={post.description}
            image={post.image}
            nickname={post.nickname}
            date={post.date}
            commentCount={post.commentCount}
          />
        ))}
      </main>

      <div className='mt-10'>
        <Pagination totalPages={5} currentPage={1} onPageChange={() => {}} />
      </div>

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </div>
  )
}
