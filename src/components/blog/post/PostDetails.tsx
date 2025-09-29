import { FC } from 'react';
import profileImage from '@/assets/profile.png';
import { cn } from '@/utils/cn';

interface PostDetailsProps {
  className?: string;
}

// 공통 스타일 베이스
const baseTextStyle = 'text-xs leading-[160%]';
const spacerStyle = 'w-3';

const PostDetails: FC<PostDetailsProps> = ({ className }) => {
  return (
    <div className={cn('flex px-4 py-3 flex-col items-start gap-10 self-stretch', className)}>
      <div className="flex items-start gap-1.5">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-5 h-5 rounded-full self-stretch bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${profileImage})`,
              backgroundColor: 'lightgray'
            }}
          />
          <span className={cn(baseTextStyle, 'font-regular text-gray-20')}>
            닉네임
          </span>
          <div className={spacerStyle} />
          <span className={cn(baseTextStyle, 'font-light text-gray-56')}>
            Feb 17.2025
          </span>
          <div className={spacerStyle} />
          <span className={cn(baseTextStyle, 'font-light text-gray-56')}>
            댓글0
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
