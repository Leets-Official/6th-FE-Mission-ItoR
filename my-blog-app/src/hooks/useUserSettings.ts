import { useState } from 'react'
import { useToast } from '@/context/ToastContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as userAPI from '@/api/userAPI'

export const useUserSettings = () => {
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: userAPI.getMyInfoAPI,
  })

  const [newNickname, setNewNickname] = useState<string | null>(null)
  const [newIntroduction, setNewIntroduction] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState<string | null>(null)
  const [newProfilePicture, setNewProfilePicture] = useState<string | null>(null)
  const [newName, setNewName] = useState<string | null>(null)
  const [newBirthDate, setNewBirthDate] = useState<string | null>(null)

  /** 통합 Mutation */
  const updateAllMutation = useMutation({
    mutationFn: (payload: userAPI.UpdateUserPayload) => userAPI.updateUserAPI(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      showToast('변경사항이 저장되었습니다!', 'positive')
    },
    onError: () => {
      showToast('변경 저장 실패', 'negative')
    },
  })

  const handleSaveAll = () => {
    if (!user) return

    const payload: userAPI.UpdateUserPayload = {}

    if (newNickname) payload.nickname = newNickname
    if (newIntroduction) payload.introduction = newIntroduction
    if (newPassword) payload.password = newPassword
    if (newProfilePicture) payload.profilePicture = newProfilePicture

    if (newName || newBirthDate) {
      payload.name = newName ?? user.name
      payload.birthDate = newBirthDate ?? user.birthDate
    }

    updateAllMutation.mutate(payload)
  }

  return {
    user,
    isLoading,
    handleSaveAll,
    setNewNickname,
    setNewIntroduction,
    setNewPassword,
    setNewProfile: setNewProfilePicture,
    setNewName,
    setNewBirthDate,
  }
}
