import { useState } from 'react'
import TextFiledSet from '@/components/TextFiled/TextFiledSet'

interface SignUpFormFieldsProps {
  variant: 'email' | 'kakao'
  email?: string
  password?: string
  nickname?: string
  onEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onNicknameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SignUpFormFields({
  variant,
  email = '',
  password = '',
  nickname: initialNickname = '',
  onEmailChange,
  onPasswordChange,
  onNicknameChange,
}: SignUpFormFieldsProps) {
  // 내부 닉네임 상태 (props로 제어 안 하면 fallback)
  const [nickname, setNickname] = useState(initialNickname)
  const hasError = nickname.length > 20

  // 닉네임 입력 시 내부/외부 상태 모두 반영
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    onNicknameChange?.(e)
  }

  return (
    <div className='flex flex-col gap-4 w-full items-center'>
      {/* 이메일 회원가입 전용 필드 */}
      {variant === 'email' && (
        <>
          <TextFiledSet
            label='이메일'
            placeholder='이메일'
            value={email}
            onChange={onEmailChange}
            showHelper={false}
            helperText='* 반드시 입력해야 하는 필수 항목입니다.'
            helperType='error'
          />
          <TextFiledSet
            label='비밀번호'
            placeholder='......'
            type='password'
            value={password}
            onChange={onPasswordChange}
            showHelper={false}
            helperText='* 비밀번호가 일치하지 않습니다.'
            helperType='error'
          />
          <TextFiledSet
            label='비밀번호 확인'
            placeholder='......'
            type='password'
            showHelper={false}
          />
        </>
      )}

      {/* 공통 필드 */}
      <TextFiledSet label='이름' placeholder='이름' showHelper={false} />
      <TextFiledSet label='생년월일' placeholder='YYYY - MM - DD' showHelper={false} />
      <TextFiledSet
        label='닉네임'
        placeholder='닉네임'
        value={nickname}
        onChange={handleNicknameChange}
        showHelper
        helperText={hasError ? '* 닉네임은 최대 20자까지입니다.' : '* 20글자 이내'}
        hasError={hasError}
      />
      <TextFiledSet label='한 줄 소개' placeholder='한 줄 소개' showHelper={false} />
    </div>
  )
}
