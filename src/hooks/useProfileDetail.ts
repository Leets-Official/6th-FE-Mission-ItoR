import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyPosts, useUploadImage } from '@/hooks/usePosts';
import { useUpdateProfilePicture } from '@/hooks/auth/useAuth';

export const useProfileDetail = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError } = useMyPosts(page);
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();
  const { mutate: updatePicture } = useUpdateProfilePicture();

  const loggedInUser = {
    nickname: localStorage.getItem('nickname') || '사용자',
    introduction: localStorage.getItem('introduction') || '한 줄 소개가 없습니다.',
    profilePicture: localStorage.getItem('profilePicture'),
  };

  const handleProfileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadImage(file, {
      onSuccess: (url) => {
        updatePicture(
          { profilePicture: url },
          {
            onSuccess: () => {
              window.location.reload();
            },
            onError: () => {
              alert('프로필 사진 업데이트에 실패했습니다.');
            },
          }
        );
      },
      onError: () => {
        alert('이미지 업로드에 실패했습니다.');
      },
    });
  };

  const userPosts = data?.posts.filter((post) => post.nickName === loggedInUser.nickname) || [];
  const pageSize = 10;
  const apiTotalPages = data?.pageMax || 1;
  const isLastPageOfUserPosts = userPosts.length < pageSize;
  const probingTotalPages = isLastPageOfUserPosts ? page : page + 1;
  const totalPages = Math.min(probingTotalPages, apiTotalPages);

  return {
    page,
    setPage,
    fileInputRef,
    data,
    isLoading,
    isError,
    isUploading,
    loggedInUser,
    userPosts,
    totalPages,
    handleProfileClick,
    handleFileChange,
    navigate,
  };
};
