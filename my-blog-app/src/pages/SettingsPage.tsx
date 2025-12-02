import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import Blank from '@/components/common/Blank'
import TextFiledSet from '@/components/TextFiled/TextFiledSet'
import ProfileImageUploader from '@/components/Settings/ProfileImageUploader'
import { Button } from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '@/api/axiosInstance'

export default function SettingsPage() {
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const isView = mode === 'view'

  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  // 상태들
  const [profile, setProfile] = useState('')
  const [nickname, setNickname] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')

  const fetchUser = async () => {
    const res = await axiosInstance.get('/users/me')
    const data = res.data.data

    setUser(data)
    setProfile(data.profilePicture)
    setNickname(data.nickname)
    setIntroduction(data.introduction)
    setEmail(data.email)
    setName(data.name)
    setBirthDate(data.birthDate)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleSave = async () => {
    try {
      if (nickname !== user.nickname) {
        await axiosInstance.patch('/users/nickname', { nickname })
      }

      if (introduction !== user.introduction) {
        await axiosInstance.patch('/users/introduction', { introduction })
      }

      if (password && password === passwordConfirm) {
        await axiosInstance.patch('/users/password', { password })
      }

      if (profile !== user.profilePicture) {
        await axiosInstance.patch('/users/picture', { profilePicture: profile })
      }

      if (name !== user.name || birthDate !== user.birthDate) {
        await axiosInstance.patch('/users/info', { name, birthDate })
      }

      alert('변경 사항이 저장되었습니다.')
      setMode('view')
      navigate('/profile')
      fetchUser()
    } catch {
      alert('저장 중 오류가 발생했습니다.')
    }
  }

  if (!user) return <div className='mt-20'>로딩 중...</div>

  return (
    <div className='min-h-screen bg-white flex flex-col items-center'>
      <PageHeader
        title='GITLOG'
        rightContent={
          <div className='flex gap-4'>
            {isView ? (
              <Button intent='flat' className='!text-black' onClick={() => setMode('edit')}>
                수정하기
              </Button>
            ) : (
              <>
                <Button intent='flat' className='!text-negative' onClick={() => setMode('view')}>
                  취소하기
                </Button>

                <Button intent='flat' className='!text-black' onClick={handleSave}>
                  저장하기
                </Button>
              </>
            )}
          </div>
        }
      />

      {/* 상단 회색 배경 */}
      <div className='w-full bg-[#F5F5F5] border-b border-[#F5F5F5] flex justify-center'>
        <div className='max-w-[688px] w-full px-4 py-6 flex flex-col gap-4'>
          <ProfileImageUploader initialUrl={profile} onChange={setProfile} disabled={isView} />

          <TextFiledSet
            label='닉네임'
            placeholder='닉네임'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={isView}
            showHelper
            helperText={nickname.length > 20 ? '* 닉네임은 최대 20자까지입니다.' : '* 20글자 이내'}
            hasError={nickname.length > 20}
          />

          <TextFiledSet
            label='한 줄 소개'
            placeholder='한 줄 소개'
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            disabled={isView}
          />
        </div>
      </div>

      <Blank size='md' />

      {/* 하단 폼 */}
      <div className='w-full flex justify-center'>
        <div className='w-full max-w-[688px] px-4 flex flex-col gap-4'>
          <TextFiledSet label='이메일' value={email} disabled />

          {!isView && (
            <>
              <TextFiledSet
                label='비밀번호'
                type='password'
                placeholder='******'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <TextFiledSet
                label='비밀번호 확인'
                type='password'
                placeholder='******'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                showHelper
                helperText={
                  passwordConfirm && passwordConfirm !== password
                    ? '* 비밀번호가 일치하지 않습니다.'
                    : '* 동일하게 입력해주세요.'
                }
                hasError={!!(passwordConfirm && passwordConfirm !== password)}
              />
            </>
          )}

          <TextFiledSet
            label='이름'
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isView}
          />

          <TextFiledSet
            label='생년월일'
            placeholder='YYYY-MM-DD'
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            disabled={isView}
          />
        </div>
      </div>

      <Blank size='lg' />
    </div>
  )
}
