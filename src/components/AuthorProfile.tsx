// src/components/AuthorProfile.tsx
import React from 'react';
import ProfileIcon from '@/assets/svgs/Profile.svg?react';
import { S } from '@/styles/BlogDetail.styles';

interface AuthorProfileProps {
  name: string;
  introduction: string | null | undefined;
  profileUrl: string | null | undefined;
}

const AuthorProfile: React.FC<AuthorProfileProps> = ({ name, introduction, profileUrl }) => {
  return (
    <div className={S.authorProfileContainer}>
      <div className={S.authorProfileInner}>
        {profileUrl ? (
          <img src={profileUrl} alt={`${name} 프로필`} className={S.authorProfileImage} />
        ) : (
          <ProfileIcon className={S.authorProfileImage} />
        )}
        <span className={S.authorProfileName}>{name}</span>
        <span className={S.authorProfileIntro}>{introduction || '한 줄 소개가 없습니다.'}</span>
      </div>
    </div>
  );
};

export default AuthorProfile;
