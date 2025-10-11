import PageHeader from '../../components/common/PageHeader'
import { ChatIcon } from '../../assets/icons/ChatIcon'
import { MoreIcon } from '../../assets/icons/MoreIcon'
import { EditIcon } from '../../assets/icons/EditIcon'
import { Button } from '../../components/Button/Button'

export default function HeaderTestPage() {
  return (
    <div className='min-h-screen bg-gray-100 space-y-6'>
      {/* 1. 깃로그 쓰기 (flat 기본 회색 케이스) */}
      <PageHeader
        title='GITLOG'
        rightContent={
          <Button intent='flat' className='text-gray-300' icon={<EditIcon color='#909090' />}>
            깃로그 쓰기
          </Button>
        }
      />

      {/* 2. 채팅 + 점3개 아이콘 */}
      <PageHeader
        title='GITLOG'
        rightContent={
          <div className='flex gap-2'>
            <ChatIcon />
            <MoreIcon />
          </div>
        }
      />

      {/* 3. 삭제하기 + 게시하기 (색상 오버라이드) */}
      <PageHeader
        title='GITLOG'
        rightContent={
          <div className='flex gap-4'>
            <Button intent='flat' className='!text-negative'>
              삭제하기
            </Button>
            <Button intent='flat' className='!text-black'>
              게시하기
            </Button>
          </div>
        }
      />

      {/* 테스트용 본문 */}
      <main className='p-8'>
        <h1 className='text-xl font-bold'>Header Test Page</h1>
        <p className='text-gray-600 mt-2'>여기는 Header 컴포넌트를 테스트하는 페이지입니다.</p>
      </main>
    </div>
  )
}
