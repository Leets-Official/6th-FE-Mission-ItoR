import React from 'react';
import ProfileIcon from '@/assets/svgs/Profile.svg?react';
import SettingIcon from '@/assets/svgs/settings.svg?react';

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
    <div className="w-full bg-gray-200 border-b border-gray-300">
      <div className="w-[688px] mx-auto flex flex-col">
        {/* Profile Picture Section */}
        <div className="h-[88px] flex items-center gap-[10px] py-3 px-4">
          <button onClick={onProfileClick} className="rounded-full" disabled={isUploading}>
            {loggedInUser.profilePicture ? (
              <img
                src={loggedInUser.profilePicture}
                alt="profile"
                className="w-[64px] h-[64px] rounded-full object-cover"
              />
            ) : (
              <ProfileIcon className="w-[64px] h-[64px]" />
            )}
          </button>
          {isUploading && <p className="text-sm text-gray-500">업로드 중...</p>}
        </div>

        {/* Nickname and Introduction Section */}
        <div className="h-[96px] flex flex-col justify-center gap-3 py-3 px-4">
          <h1 className="text-[24px] font-semibold">{loggedInUser.nickname}</h1>
          <p className="text-gray-700 text-[14px]">{loggedInUser.introduction}</p>
        </div>

        {/* Settings Button Section */}
        <div className="h-[49px] flex items-center gap-[10px] py-3 px-4">
          <button
            onClick={onSettingsClick}
            className="flex items-center gap-1 text-[12px] text-gray-600 border border-gray-300 rounded-sm px-3 py-1 hover:bg-gray-100 transition w-fit"
          >
            <SettingIcon /> 내 프로필 설정
          </button>
        </div>

        {/* Bottom Spacer */}
        <div className="h-[20px]"></div>
      </div>
    </div>
  );
};

export default ProfileHeader;
