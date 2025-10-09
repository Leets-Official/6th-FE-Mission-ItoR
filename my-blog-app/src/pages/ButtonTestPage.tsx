import { Button } from '../components/Button/Button'
import { EditIcon } from '../assets/icons/EditIcon'

export default function ButtonTestPage() {
  return (
    <div className='p-8 space-y-4'>
      <h1 className='text-xl font-bold'>Button Test</h1>

      <div className='space-x-4'>
        <Button intent='primary' icon={<EditIcon color='#00A1FF' />}>
          깃로그 시작하기
        </Button>
        <Button intent='secondary' icon={<EditIcon color='#909090' />}>
          깃로그 시작하기
        </Button>
        <Button intent='flat' icon={<EditIcon color='#909090' />}>
          깃로그 시작하기
        </Button>
        <Button intent='tertiary' icon={<EditIcon color='#909090' />}>
          깃로그 시작하기
        </Button>
        <Button intent='ghost' icon={<EditIcon color='#909090' />}>
          깃로그 시작하기
        </Button>
        <Button intent='black' icon={<EditIcon color='#FFF' />}>
          깃로그 시작하기
        </Button>
        <Button intent='blackMuted' icon={<EditIcon color='#909090' />}>
          깃로그 시작하기
        </Button>
        <Button intent='tag' icon={<EditIcon color='#909090' />} iconSize={10.5}>
          깃로그 시작하기
        </Button>
        <Button intent='tagFilled' icon={<EditIcon color='#909090' />} iconSize={10.5}>
          깃로그 시작하기
        </Button>
      </div>

      <div className='space-x-4'>
        <Button intent='primary' disabled>
          Disabled Primary
        </Button>
        <Button intent='black' disabled>
          Disabled Black
        </Button>
      </div>
    </div>
  )
}
