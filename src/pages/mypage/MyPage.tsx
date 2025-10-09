import { FC } from 'react';
import { cn } from '@/utils/cn';

interface MyPageProps {
  className?: string;
}

const MyPage: FC<MyPageProps> = ({ className }) => {
  return (
    <div className={cn('', className)}>
      {/* MyPage Content */}
    </div>
  );
};

export default MyPage;
