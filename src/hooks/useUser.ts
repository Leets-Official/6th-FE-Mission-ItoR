// src/hooks/useUser.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMyInfo,
  updateUser,
  updateUserPicture,
  updateUserPassword,
  updateUserNickname,
  type MyInfo,
  type UpdateUserBody,
  type UpdatePictureBody,
  type UpdatePasswordBody,
  type UpdateNicknameBody,
  type ApiEnvelope,
} from "@src/api/user";

const MY_INFO_KEY = ["myInfo"] as const;

/** 1) 내 정보 조회 훅 */
export function useMyInfo() {
  return useQuery<ApiEnvelope<MyInfo>>({
    queryKey: MY_INFO_KEY,
    queryFn: fetchMyInfo,
  });
}

/** 2) 내 정보 수정 훅 (비밀번호 제외) */
export function useUpdateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateUserBody) => updateUser(body),
    onSuccess: () => {
      // 수정 후 내 정보 다시 불러오기
      qc.invalidateQueries({ queryKey: MY_INFO_KEY });
    },
  });
}

/** 3) 프로필 사진 변경 훅 */
export function useUpdateUserPicture() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdatePictureBody) => updateUserPicture(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MY_INFO_KEY });
    },
  });
}

/** 4) 비밀번호 변경 훅 (필요하면 나중에 별도 페이지에서 사용) */
export function useUpdateUserPassword() {
  return useMutation({
    mutationFn: (body: UpdatePasswordBody) => updateUserPassword(body),
  });
}

/** 5) 닉네임 변경 훅  */
export function useUpdateUserNickname() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateNicknameBody) => updateUserNickname(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MY_INFO_KEY });
    },
  });
}
