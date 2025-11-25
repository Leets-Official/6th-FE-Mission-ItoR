import axiosInstance from './axiosInstance'

// 유저 정보 조회
export const getMyInfoAPI = async () => {
  const res = await axiosInstance.get('/users/me')
  return res.data.data
}

// 닉네임 변경
export const updateNicknameAPI = async (nickname: string) => {
  const res = await axiosInstance.patch('/users/nickname', { nickname })
  return res.data
}

// 한 줄 소개 변경
export const updateIntroductionAPI = async (introduction: string) => {
  const res = await axiosInstance.patch('/users/introduction', { introduction })
  return res.data
}

// 비밀번호 변경
export const updatePasswordAPI = async (password: string) => {
  const res = await axiosInstance.patch('/users/password', { password })
  return res.data
}

// 프로필 사진 변경
export const updateProfilePictureAPI = async (profilePicture: string) => {
  const res = await axiosInstance.patch('/users/picture', { profilePicture })
  return res.data
}

// 이름 + 생년월일 변경
export const updateUserInfoAPI = async (info: { name: string; birthDate: string }) => {
  const res = await axiosInstance.patch('/users/info', info)
  return res.data
}
