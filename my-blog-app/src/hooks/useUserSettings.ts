import { useState } from 'react'
import { useToast } from '@/context/ToastContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMyInfoAPI,
  updateNicknameAPI,
  updateIntroductionAPI,
  updatePasswordAPI,
  updateProfilePictureAPI,
  updateUserInfoAPI,
} from '@/api/userAPI'

export const useUserSettings = () => {
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  /** 유저 정보 조회 */
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getMyInfoAPI,
  })

  // 개별 변경 상태
  const [newNickname, setNewNickname] = useState<string | null>(null)
  const [newIntroduction, setNewIntroduction] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState<string | null>(null)
  const [newProfile, setNewProfile] = useState<string | null>(null)
  const [newName, setNewName] = useState<string | null>(null)
  const [newBirthDate, setNewBirthDate] = useState<string | null>(null)

  /** Mutation 정의 */
  const nicknameMutation = useMutation({ mutationFn: updateNicknameAPI })
  const introMutation = useMutation({ mutationFn: updateIntroductionAPI })
  const passwordMutation = useMutation({ mutationFn: updatePasswordAPI })
  const profileMutation = useMutation({ mutationFn: updateProfilePictureAPI })
  const infoMutation = useMutation({ mutationFn: updateUserInfoAPI })

  /** 저장하기 */
  const handleSaveAll = async () => {
    try {
      if (newNickname) await nicknameMutation.mutateAsync(newNickname)
      if (newIntroduction) await introMutation.mutateAsync(newIntroduction)
      if (newPassword) await passwordMutation.mutateAsync(newPassword)
      if (newProfile) await profileMutation.mutateAsync(newProfile)
      if (newName || newBirthDate) {
        await infoMutation.mutateAsync({
          name: newName ?? user.name,
          birthDate: newBirthDate ?? user.birthDate,
        })
      }

      showToast('변경사항이 저장되었습니다!', 'positive')

      // user refetch
      queryClient.invalidateQueries({ queryKey: ['user'] })
    } catch (e) {
      console.error(e)
      showToast('변경 저장 실패', 'negative')
    }
  }

  return {
    user,
    isLoading,
    handleSaveAll,
    setNewNickname,
    setNewIntroduction,
    setNewPassword,
    setNewProfile,
    setNewName,
    setNewBirthDate,
  }
}
