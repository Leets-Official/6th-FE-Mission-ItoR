import React, { useState, useEffect, useRef } from 'react';
import { useUserProfile, useUpdateUserProfile } from '@/hooks/auth/useAuth';
import { useUploadImage } from '@/hooks/usePosts';
import { UpdateUserProfilePayload } from '@/api/auth';

export const useProfileFind = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: userProfile, isLoading, isError } = useUserProfile();
  const { mutate: updateUser } = useUpdateUserProfile();
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthDate: '',
    nickname: '',
    introduction: '',
    profilePicture: '',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isKakaoUser = !!userProfile?.profilePicture?.includes('kakaocdn.net');

  useEffect(() => {
    if (userProfile) {
      setForm({
        email: userProfile.email || '',
        password: '',
        confirmPassword: '',
        name: userProfile.name || '',
        birthDate: userProfile.birthDate || '',
        nickname: userProfile.nickname || '',
        introduction: userProfile.introduction || '',
        profilePicture: userProfile.profilePicture || '',
      });
    }
  }, [userProfile]);

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    if (userProfile) {
      setForm({
        ...form,
        name: userProfile.name || '',
        birthDate: userProfile.birthDate || '',
        nickname: userProfile.nickname || '',
        introduction: userProfile.introduction || '',
        profilePicture: userProfile.profilePicture || '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  const handleSaveClick = () => {
    const payload: UpdateUserProfilePayload = {
      email: form.email,
      name: form.name,
      nickname: form.nickname,
      birthDate: form.birthDate,
      introduction: form.introduction,
      profilePicture: form.profilePicture,
    };

    updateUser(payload, {
      onSuccess: () => {
        localStorage.setItem('nickname', form.nickname);
        localStorage.setItem('introduction', form.introduction);
        localStorage.setItem('profilePicture', form.profilePicture);

        setToastMessage('저장되었습니다.');
        setTimeout(() => {
          window.location.href = '/profiledetail';
        }, 1500);
      },
      onError: (error: any) => {
        alert(error.message || '프로필 업데이트에 실패했습니다.');
      },
    });
  };

  const handleProfileClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadImage(file, {
      onSuccess: (url) => {
        setForm((prev) => ({ ...prev, profilePicture: url }));
      },
      onError: () => {
        alert('이미지 업로드에 실패했습니다.');
      },
    });
  };

  const allFields = [
    { key: 'email', label: '메일', placeholder: '이메일', type: 'email' },
    { key: 'password', label: '비밀번호', placeholder: '••••••••', type: 'password' },
    { key: 'confirmPassword', label: '비밀번호 확인', placeholder: '••••••••', type: 'password' },
    { key: 'name', label: '이름', placeholder: '이름', type: 'text' },
    { key: 'birthDate', label: '생년월일', placeholder: 'YYYY.MM.DD', type: 'text' },
  ] as const;

  const fields = isKakaoUser
    ? allFields.filter((f) => f.key !== 'password' && f.key !== 'confirmPassword')
    : allFields;

  return {
    fileInputRef,
    isLoading,
    isError,
    isUploading,
    isEditing,
    form,
    setForm,
    toastMessage,
    isKakaoUser,
    fields,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleProfileClick,
    handleFileChange,
  };
};
