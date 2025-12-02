import React from 'react';
import ProfileIcon from '@/assets/svgs/Profile.svg?react';
import SettingIcon from '@/assets/svgs/settings.svg?react';
import { S } from '@/styles/ProfileDetail.styles';

interface ProfileHeaderProps {
  loggedInUser: {
    nickname: string;
    introduction: string;
    profilePicture: string | null;
  };
  isUploading: boolean;
  onProfileClick: () => void;
  onSettingsClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  loggedInUser,
  isUploading,
  onProfileClick,
  onSettingsClick,
}) => {
  return (
    <div className={S.profileHeaderContainer}>
      <button onClick={onProfileClick} className={S.profileImageButton} disabled={isUploading}>
        {loggedInUser.profilePicture ? (
          <img src={loggedInUser.profilePicture} alt="profile" className={S.profileImage} />
        ) : (
          <ProfileIcon className={S.profileImage} />
        )}
      </button>
      {isUploading && <p className={S.uploadingText}>업로드 중...</p>}
      <h1 className={S.nickname}>{loggedInUser.nickname}</h1>
      <p className={S.introduction}>{loggedInUser.introduction}</p>
      <button onClick={onSettingsClick} className={S.settingsButton}>
        <SettingIcon /> 내 프로필 설정
      </button>
    </div>
  );
};

export default ProfileHeader;
