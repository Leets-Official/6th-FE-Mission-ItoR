import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { validators } from '@/utils/validation';
import { useEditModeStore } from '@/stores/useEditModeStore';

// 닉네임 & 한줄소개 검증 스키마
const profileHeaderSchema = z.object({
  nickname: validators.nickname(),
  bio: validators.bio(),
});

type ProfileHeaderFormData = z.infer<typeof profileHeaderSchema>;

interface UseEditProfileProps {
  nickname?: string;
  bio?: string;
  isEditMode?: boolean;
}

export const useEditProfile = ({ nickname = '', bio = '', isEditMode = false }: UseEditProfileProps = {}) => {
  const { setEditMode } = useEditModeStore();

  const {
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<ProfileHeaderFormData>({
    resolver: zodResolver(profileHeaderSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: nickname || '',
      bio: bio || '',
    },
  });

  // 현재 입력값을 watch로 가져오기
  const watchedNickname = watch('nickname');
  const watchedBio = watch('bio');

  // 리셋
  useEffect(() => {
    if (!isEditMode) {
      reset({
        nickname: nickname || '',
        bio: bio || '',
      });
    }
  }, [isEditMode, nickname, bio, reset]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    // TODO: 저장 로직 구현
    setEditMode(false);
  };

  return {
    // 폼 관련
    register,
    errors,
    watchedNickname,
    watchedBio,
    // 액션 핸들러
    handleEdit,
    handleCancel,
    handleSave,
  };
};
