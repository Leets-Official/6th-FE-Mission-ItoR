import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { validators } from '@/utils/validation';
import { useEditModeStore } from '@/stores/useEditModeStore';
import { useToast } from '@/contexts/ToastContext';
import { MYPAGE_ROUTES, MYPAGE_TEXTS } from '@/constants';

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
  defaultProfileImage?: string;
}

export const useEditProfile = ({
  nickname = '',
  bio = '',
  isEditMode = false,
  defaultProfileImage = '',
}: UseEditProfileProps = {}) => {
  const { setEditMode } = useEditModeStore();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [previewImage, setPreviewImage] = useState<string>(defaultProfileImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    // TODO: API 호출로 프로필 업데이트
    setEditMode(false);
    showToast(MYPAGE_TEXTS.PROFILE.SAVE_SUCCESS, 'positive');
    navigate(MYPAGE_ROUTES.MY_PROFILE);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  return {
    // 폼 관련
    register,
    errors,
    watchedNickname,
    watchedBio,
    // 이미지 관련
    previewImage,
    fileInputRef,
    handleImageUpload,
    handleProfileImageClick,
    // 액션 핸들러
    handleEdit,
    handleCancel,
    handleSave,
  };
};
