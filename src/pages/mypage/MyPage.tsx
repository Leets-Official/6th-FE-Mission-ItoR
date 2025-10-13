import { FC } from 'react';
import { cn } from '@/utils/cn';
import { Outlet, useLocation } from 'react-router-dom';
import Spacer from '@/components/common/Spacer/Spacer';
import PostHeader from '@/components/blog/Post/PostHeader';
import TextBox from '@/components/common/Textbox/TextBox';
import { useAuthStore } from '@/stores/useAuthStore';
import { MYPAGE_HEADER_CONTENT, MYPAGE_ROUTES, MYPAGE_TEXTS } from '@/constants';
import { SettingsIcon } from '@/assets/icons/common';
import profileImage from '@/assets/profile.png';

interface MyPageProps {
  className?: string;
}

const STYLES = {
  wrapper: 'flex w-full flex-col items-center',
  container: 'flex w-full flex-col items-center justify-center self-stretch border-b border-gray-96 bg-gray-96',
  spacerTop: 'w-full max-w-content max-md:h-spacer-mobile-top',
  spacerTopProfile: 'w-full max-w-content max-md:!h-8',
  spacerBottom: 'w-full max-w-content max-md:h-3',
  profileContent: 'flex flex-col w-full max-w-content py-3 px-4 items-start gap-2.5',
  profileImageWrapper: 'flex w-16 h-16 items-center gap-2.5 aspect-square rounded-sm overflow-hidden',
  profileImage: 'w-full h-full object-cover',
  profileActions: 'flex w-full max-w-content py-3 px-4 items-start gap-2.5',
} as const;

const MyPage: FC<MyPageProps> = ({ className }) => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const { title, subtitle } =
    MYPAGE_HEADER_CONTENT[location.pathname as keyof typeof MYPAGE_HEADER_CONTENT] ||
    MYPAGE_HEADER_CONTENT[MYPAGE_ROUTES.BASE];

  const isMyProfile = location.pathname === MYPAGE_ROUTES.MY_PROFILE;
  const spacerTopHeight = isMyProfile ? 'lg' : 'md';

  return (
    <div className={STYLES.wrapper}>
      <div className={cn(STYLES.container, className)}>
        <Spacer height={spacerTopHeight} className={isMyProfile ? STYLES.spacerTopProfile : STYLES.spacerTop} />
        {isMyProfile ? (
          <>
            <div className={STYLES.profileContent}>
              <div className={STYLES.profileImageWrapper}>
                <img src={profileImage} alt="Profile" className={STYLES.profileImage} />
              </div>
            </div>
            <PostHeader
              title={user?.nickName || MYPAGE_TEXTS.PROFILE.DEFAULT_USER_NAME}
              subtitle={user?.bio || MYPAGE_TEXTS.PROFILE.DEFAULT_BIO}
              className="w-full px-1"
            />
            <div className={STYLES.profileActions}>
              <TextBox showIcon icon={<SettingsIcon />} color="gray-56" borderColor="gray-90">
                {MYPAGE_TEXTS.PROFILE.SETTINGS}
              </TextBox>
            </div>
          </>
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
