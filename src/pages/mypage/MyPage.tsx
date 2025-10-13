import { FC } from 'react';
import { cn } from '@/utils/cn';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Spacer from '@/components/common/Spacer/Spacer';
import PostHeader from '@/components/blog/Post/PostHeader';
import MyPageHeader from '@/components/mypage/MyPageHeader';
import { useAuthStore } from '@/stores/useAuthStore';
import { MYPAGE_HEADER_CONTENT, MYPAGE_ROUTES, MYPAGE_TEXTS } from '@/constants';

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
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);

  const { title, subtitle } =
    MYPAGE_HEADER_CONTENT[location.pathname as keyof typeof MYPAGE_HEADER_CONTENT] ||
    MYPAGE_HEADER_CONTENT[MYPAGE_ROUTES.BASE];

  const isMyProfile = location.pathname === MYPAGE_ROUTES.MY_PROFILE;
  const isEditProfile = location.pathname === MYPAGE_ROUTES.EDIT_PROFILE;
  const isProfilePage = isMyProfile || isEditProfile;
  const spacerTopHeight = isProfilePage ? 'lg' : 'md';

  const handleEditProfile = () => {
    navigate(MYPAGE_ROUTES.EDIT_PROFILE);
  };

  return (
    <div className={STYLES.wrapper}>
      <div className={cn(STYLES.container, className)}>
        <Spacer height={spacerTopHeight} className={isProfilePage ? STYLES.spacerTopProfile : STYLES.spacerTop} />
        {isProfilePage ? (
          <MyPageHeader
            isEditMode={isEditProfile}
            nickname={user?.nickName || MYPAGE_TEXTS.PROFILE.DEFAULT_USER_NAME}
            bio={user?.bio || MYPAGE_TEXTS.PROFILE.DEFAULT_BIO}
            onEditClick={handleEditProfile}
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
