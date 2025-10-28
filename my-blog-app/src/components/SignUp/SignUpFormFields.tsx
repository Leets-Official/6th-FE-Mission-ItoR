import { useState } from 'react'
import TextFiledSet from '@/components/TextFiled/TextFiledSet'

interface SignUpFormFieldsProps {
  variant: 'email' | 'kakao'
}

export default function SignUpFormFields({ variant }: SignUpFormFieldsProps) {
  const [nickname, setNickname] = useState('')
  const hasError = nickname.length > 20

  return (
    <div className='flex flex-col gap-4 w-full items-center'>
      {/* 이메일 회원가입 전용 필드 */}
      {variant === 'email' && (
        <>
          <TextFiledSet
            label='이메일'
            placeholder='이메일'
            showHelper={false}
            helperText='* 반드시 입력해야하는 필수 사항입니다.'
            helperType='error'
          />
          <TextFiledSet
            label='비밀번호'
            placeholder='......'
            showHelper={false}
            helperText='* 비밀번호가 일치하지 않습니다.'
            helperType='error'
          />
          <TextFiledSet label='비밀번호 확인' placeholder='......' showHelper={false} />
        </>
      )}

      {/* 공통 필드 */}
      <TextFiledSet label='이름' placeholder='이름' showHelper={false} />
      <TextFiledSet label='생년월일' placeholder='YYYY - MM - DD' showHelper={false} />
      <TextFiledSet
        label='닉네임'
        placeholder='닉네임'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        showHelper
        helperText={hasError ? '* 닉네임은 최대 20자까지입니다.' : '* 20글자 이내'}
        hasError={hasError}
      />
      <TextFiledSet label='한 줄 소개' placeholder='한 줄 소개' showHelper={false} />
    </div>
  )
}
