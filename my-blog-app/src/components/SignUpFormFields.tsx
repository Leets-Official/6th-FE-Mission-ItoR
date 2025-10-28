import TextFiledSet from '@/components/TextFiled/TextFiledSet'

interface SignUpFormFieldsProps {
  email: string
  password: string
  nickname: string
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SignUpFormFields({
  email,
  password,
  nickname,
  onEmailChange,
  onPasswordChange,
  onNicknameChange,
}: SignUpFormFieldsProps) {
  return (
    <div className='flex flex-col gap-4 w-full max-w-[688px]'>
      <TextFiledSet
        label='이메일'
        placeholder='example@email.com'
        value={email}
        onChange={onEmailChange}
        required
        autoComplete='email'
      />
      <TextFiledSet
        label='비밀번호'
        placeholder='8자 이상 입력해주세요'
        value={password}
        onChange={onPasswordChange}
        required
        maxLength={20}
        autoComplete='new-password'
      />
      <TextFiledSet
        label='닉네임'
        placeholder='닉네임을 입력해주세요'
        value={nickname}
        onChange={onNicknameChange}
        maxLength={15}
      />
    </div>
  )
}
