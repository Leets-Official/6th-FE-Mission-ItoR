import { FC } from 'react';
import { cn } from '@/utils/cn';
import { Outlet } from 'react-router-dom';
import Spacer from '@/components/common/Spacer/Spacer';
import PostHeader from '@/components/blog/Post/PostHeader';
import MyPageHeader from '@/components/mypage/MyPageHeader';
import { useMyPage } from '@/hooks';
import { MYPAGE_TEXTS } from '@/constants';

interface MyPageProps {
  className?: string;
}

const STYLES = {
  wrapper: 'flex w-full flex-col items-center',
  container: 'flex w-full flex-col items-center justify-center self-stretch border-b border-gray-96 bg-gray-96',
  spacerTop: 'w-full max-w-content max-md:h-spacer-mobile-top',
  spacerTopProfile: 'w-full max-w-content max-md:!h-8',
  spacerBottom: 'w-full max-w-content max-md:h-3',
} as const;

const MyPage: FC<MyPageProps> = ({ className }) => {
  const {
    isMyProfile,
    isEditProfile,
    isProfilePage,
    user,
    isEditMode,
    title,
    subtitle,
    spacerTopHeight,
    handleEditProfile,
  } = useMyPage();

  return (
    <div className={STYLES.wrapper}>
      <div className={cn(STYLES.container, className)}>
        <Spacer height={spacerTopHeight} className={isProfilePage ? STYLES.spacerTopProfile : STYLES.spacerTop} />
        {isProfilePage ? (
          <MyPageHeader
            isEditMode={isEditProfile && isEditMode}
            nickname={user?.nickName || MYPAGE_TEXTS.PROFILE.DEFAULT_USER_NAME}
            bio={user?.bio || MYPAGE_TEXTS.PROFILE.DEFAULT_BIO}
            onEditClick={handleEditProfile}
            showSettingsButton={isMyProfile}
            isEditProfilePage={isEditProfile}
          />
        ) : (
          <PostHeader title={title} subtitle={subtitle} className="w-full px-1" />
        )}
        <Spacer height="sm" className={STYLES.spacerBottom} />
      </div>
      <Outlet />
    </div>
  );
};

export default MyPage;
