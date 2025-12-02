import React from 'react';
import Header from '@/components/Header';
import Pagination from '@/components/Pagination';
import ProfileHeader from '@/components/ProfileHeader';
import UserPostList from '@/components/UserPostList';
import { useProfileDetail } from '@/hooks/useProfileDetail';
import { S } from '@/styles/ProfileDetail.styles';

const ProfileDetail: React.FC = () => {
  const {
    page,
    setPage,
    fileInputRef,
    isLoading,
    isError,
    isUploading,
    loggedInUser,
    userPosts,
    totalPages,
    handleProfileClick,
    handleFileChange,
    navigate,
  } = useProfileDetail();

  return (
    <div className={S.pageContainer}>
      <Header variant="write" />
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" hidden />

      <ProfileHeader
        loggedInUser={loggedInUser}
        isUploading={isUploading}
        onProfileClick={handleProfileClick}
        onSettingsClick={() => navigate('/profilefind')}
      />

      <div className={S.contentContainer}>
        {isLoading ? (
          <p>{S.loadingText}</p>
        ) : isError ? (
          <p className={S.errorText}>게시글을 불러오는 데 실패했습니다.</p>
        ) : (
          <UserPostList posts={userPosts} />
        )}

        <div className={S.paginationContainer}>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
