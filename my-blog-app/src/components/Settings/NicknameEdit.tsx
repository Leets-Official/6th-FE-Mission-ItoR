import { useState } from 'react'
import TextFieldSet from '@/components/TextFiled/TextFiledSet'
import { useUserSettings } from '@/hooks/useUserSettings'

export default function NicknameEdit({ initialValue }: { initialValue: string }) {
  const [nickname, setNickname] = useState(initialValue)
  const { setNewNickname } = useUserSettings()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    setNewNickname(e.target.value)
  }

  return (
    <TextFieldSet
      label='닉네임'
      placeholder='닉네임'
      value={nickname}
      onChange={handleChange}
      showHelper={false}
    />
  )
}
