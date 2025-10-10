import { FC } from 'react';
import { cn } from '@/utils/cn';
import { Outlet } from 'react-router-dom';
import Spacer from '@/components/common/Spacer/Spacer';

interface MyPageProps {
  className?: string;
}

const STYLES = {
  wrapper: 'flex w-full flex-col items-center',
  container: 'flex w-full flex-col items-center justify-center self-stretch border-b border-gray-96 bg-gray-96',
  content: 'flex w-full max-w-content flex-col items-start justify-center gap-3 px-4 py-3',
  title: 'self-stretch text-2xl font-medium leading-[160%] text-black',
  spacerTop: 'w-full max-w-content max-md:h-spacer-mobile-top',
  spacerBottom: 'w-full max-w-content max-md:h-3',
} as const;

const MyPage: FC<MyPageProps> = ({ className }) => {
  return (
    <div className={STYLES.wrapper}>
      <div className={cn(STYLES.container, className)}>
        <Spacer height="md" className={STYLES.spacerTop} />
        <div className={STYLES.content}>
          <span className={STYLES.title}>회원가입</span>
        </div>
        <Spacer height="sm" className={STYLES.spacerBottom} />
      </div>
      <Outlet />
    </div>
  );
};

export default MyPage;
