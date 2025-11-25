import { useState } from 'react'
import TextFieldSet from '@/components/TextFiled/TextFiledSet'
import { useUserSettings } from '@/hooks/useUserSettings'

export default function PasswordEdit() {
  const [password, setPassword] = useState('')
  const { setNewPassword } = useUserSettings()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setNewPassword(e.target.value)
  }

  return (
    <TextFieldSet
      label='비밀번호 변경'
      placeholder='새 비밀번호'
      value={password}
      onChange={handleChange}
      showHelper={false}
    />
  )
}
