import { useState } from 'react'
import axiosInstance from '@/api/axiosInstance'
import { useToast } from '@/context/ToastContext'

export const useUserSettings = () => {
  const { showToast } = useToast()

  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // 개별 업데이트 상태
  const [newNickname, setNewNickname] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState<string | null>(null)
  const [newProfile, setNewProfile] = useState<string | null>(null)

  /** 유저 정보 조회 */
  const fetchUser = async () => {
    try {
      setIsLoading(true)
      const res = await axiosInstance.get('/users/me')
      setUser(res.data.data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  /** 저장 버튼 클릭 시 */
  const handleSaveAll = async () => {
    try {
      if (newNickname) await axiosInstance.patch('/users/nickname', { nickname: newNickname })

      if (newPassword) await axiosInstance.patch('/users/password', { password: newPassword })

      if (newProfile) await axiosInstance.patch('/users/picture', { profilePicture: newProfile })

      showToast('변경사항이 저장되었습니다!', 'positive')
      fetchUser()
    } catch (e) {
      console.error(e)
      showToast('변경 저장 실패', 'negative')
    }
  }

  return {
    user,
    isLoading,
    fetchUser,
    handleSaveAll,
    setNewNickname,
    setNewPassword,
    setNewProfile,
  }
}
