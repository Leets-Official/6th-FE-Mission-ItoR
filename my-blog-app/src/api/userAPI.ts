import axiosInstance from './axiosInstance'

// 기존 개별 API들
export const getMyInfoAPI = async () => {
  const res = await axiosInstance.get('/users/me')
  return res.data.data
}

export const updateNicknameAPI = async (nickname: string) => {
  const res = await axiosInstance.patch('/users/nickname', { nickname })
  return res.data
}

export const updateIntroductionAPI = async (introduction: string) => {
  const res = await axiosInstance.patch('/users/introduction', { introduction })
  return res.data
}

export const updatePasswordAPI = async (password: string) => {
  const res = await axiosInstance.patch('/users/password', { password })
  return res.data
}

export const updateProfilePictureAPI = async (profilePicture: string) => {
  const res = await axiosInstance.patch('/users/picture', { profilePicture })
  return res.data
}

export const updateUserInfoAPI = async (info: { name: string; birthDate: string }) => {
  const res = await axiosInstance.patch('/users/info', info)
  return res.data
}

export interface UpdateUserPayload {
  nickname?: string
  introduction?: string
  password?: string
  profilePicture?: string
  name?: string
  birthDate?: string
}

export const updateUserAPI = async (payload: UpdateUserPayload) => {
  const results: any = {}

  if (payload.nickname) {
    results.nickname = await updateNicknameAPI(payload.nickname)
  }
  if (payload.introduction) {
    results.introduction = await updateIntroductionAPI(payload.introduction)
  }
  if (payload.password) {
    results.password = await updatePasswordAPI(payload.password)
  }
  if (payload.profilePicture) {
    results.profilePicture = await updateProfilePictureAPI(payload.profilePicture)
  }
  if (payload.name || payload.birthDate) {
    results.info = await updateUserInfoAPI({
      name: payload.name!,
      birthDate: payload.birthDate!,
    })
  }

  return results
}
