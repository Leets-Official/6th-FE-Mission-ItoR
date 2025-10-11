import { FC } from 'react';
import { cn } from '@/utils/cn';
import { Outlet, useLocation } from 'react-router-dom';
import Spacer from '@/components/common/Spacer/Spacer';
import PostHeader from '@/components/blog/Post/PostHeader';
import { MYPAGE_HEADER_CONTENT } from '@/constants';

interface MyPageProps {
  className?: string;
}

const STYLES = {
  wrapper: 'flex w-full flex-col items-center',
  container: 'flex w-full flex-col items-center justify-center self-stretch border-b border-gray-96 bg-gray-96',
  spacerTop: 'w-full max-w-content max-md:h-spacer-mobile-top',
  spacerBottom: 'w-full max-w-content max-md:h-3',
} as const;

const MyPage: FC<MyPageProps> = ({ className }) => {
  const location = useLocation();

  const { title, subtitle } =
    MYPAGE_HEADER_CONTENT[location.pathname as keyof typeof MYPAGE_HEADER_CONTENT] ||
    MYPAGE_HEADER_CONTENT['/mypage'];

  return (
    <div className={STYLES.wrapper}>
      <div className={cn(STYLES.container, className)}>
        <Spacer height="md" className={STYLES.spacerTop} />
        <PostHeader title={title} subtitle={subtitle} className="w-full px-1" />
        <Spacer height="sm" className={STYLES.spacerBottom} />
      </div>
      <Outlet />
    </div>
  );
};

export default MyPage;
