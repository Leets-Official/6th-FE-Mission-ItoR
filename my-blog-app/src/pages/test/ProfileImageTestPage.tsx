import ProfileImage from '../../components/ProfileImage/ProfileImage'

export default function ProfileImageTestPage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-10 bg-gray-100'>
      <h1 className='text-xl font-bold'>Profile Image Test</h1>
      <div className='flex flex-col items-center gap-6'>
        <ProfileImage size='xl' />
        <ProfileImage size='lg' />
        <ProfileImage size='md' />
        <ProfileImage size='sm' />
      </div>
    </div>
  )
}
