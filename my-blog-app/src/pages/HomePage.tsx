// src/pages/HomePage.tsx
import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import Pagination from '@/components/Pagination/Pagination'
import ListItem from '@/components/ListItem/ListItem'
import LoginModal from '@/pages/LoginModal'
import { Button } from '@/components/Button/Button'
import { EditIcon } from '@/assets/icons/EditIcon'
import PictureFrame from '@/components/ListItem/PictureFrame'

export default function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  // 페이지 진입 시 자동으로 로그인 모달 열기
  useEffect(() => {
    setIsLoginOpen(true)
  }, [])

  return (
    <div className='min-h-screen bg-white flex flex-col items-center'>
      <PageHeader
        title='GITLOG'
        rightContent={
          <Button intent='flat' className='text-gray-300' icon={<EditIcon color='#909090' />}>
            깃로그 쓰기
          </Button>
        }
      />

      <main className='flex flex-col items-center mt-10 gap-4'>
        <ListItem
          title='16 Title one line'
          description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
          image='@/assets/images/pictureframe.png'
          nickname='닉네임'
          date='Fed 17. 2025.'
          commentCount={0}
        />
        <ListItem
          title='16 Title one line'
          description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. `}
          image='@/assets/images/profileimage.png'
          nickname='닉네임'
          date='Fed 17. 2025.'
          commentCount={0}
        />
        <ListItem
          title='16 Title one line'
          description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
          nickname='닉네임'
          date='Fed 17. 2025.'
          commentCount={0}
        />
        <ListItem
          title='16 Title one line'
          description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. `}
          nickname='닉네임'
          date='Fed 17. 2025.'
          commentCount={0}
        />
        <ListItem
          title='16 Title one line'
          description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. `}
          image='/sample1.jpg'
          nickname='닉네임'
          date='Fed 17. 2025.'
          commentCount={0}
        />
      </main>

      <div className='mt-10'>
        <Pagination totalPages={5} currentPage={1} onPageChange={() => {}} />
      </div>

      {/* 로그인 모달 — 자동으로 뜨도록 */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </div>
  )
}
