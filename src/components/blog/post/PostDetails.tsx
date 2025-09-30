import { FC } from 'react';
import profileImage from '@/assets/profile.png';
import { cn } from '@/utils/cn';

interface PostDetailsProps {
  className?: string;
}

// 스타일 상수들
const baseTextStyle = 'text-xs leading-[160%]';
const containerStyle = 'flex px-4 py-3 flex-col items-start gap-10 self-stretch';
const profileContainerStyle = 'flex items-start gap-1.5';
const userInfoStyle = 'flex items-center gap-2.5';
const profileImageStyle = 'w-5 h-5 rounded-full self-stretch bg-center bg-cover bg-no-repeat';
const spacerStyle = 'w-3';

// 텍스트 스타일들
const nicknameStyle = cn(baseTextStyle, 'font-regular text-gray-20');
const metaTextStyle = cn(baseTextStyle, 'font-light text-gray-56');

const PostDetails: FC<PostDetailsProps> = ({ className }) => {
  return (
    <div className={cn(containerStyle, className)}>
      <div className={profileContainerStyle}>
        <div className={userInfoStyle}>
          <div 
            className={profileImageStyle}
            style={{
              backgroundImage: `url(${profileImage})`,
              backgroundColor: 'lightgray'
            }}
          />
          <span className={nicknameStyle}>
            닉네임
          </span>
          <div className={spacerStyle} />
          <span className={metaTextStyle}>
            Feb 17.2025.
          </span>
          <div className={spacerStyle} />
          <span className={metaTextStyle}>
            댓글0
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
