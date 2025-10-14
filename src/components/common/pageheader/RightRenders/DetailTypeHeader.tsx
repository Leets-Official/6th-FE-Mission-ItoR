import { FC } from 'react';
import { ChatIcon, MoreVertIcon } from '@/assets/icons/common';
import Icon from '@/components/common/Icon/Icon';
import { useAuthStore } from '@/stores/useAuthStore';

export const DetailTypeHeader: FC = () => {
  const { isLoggedIn } = useAuthStore();

  const handleChatClick = () => {
    // 댓글 섹션으로 스크롤
    const commentSection = document.querySelector('[data-comment-section]');
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMoreVertClick = () => {
    if (!isLoggedIn) {
      return; // 로그인 전에는 아무 동작 안함
    }
    // TODO: 로그인 후 더보기 메뉴 기능 구현
  };

  return (
    <div className="flex items-center gap-2">
      <Icon size="lg" clickable onClick={handleChatClick}>
        <ChatIcon />
      </Icon>
      <Icon 
        size="lg" 
        clickable={isLoggedIn} 
        onClick={handleMoreVertClick}
        className={!isLoggedIn ? 'opacity-100 cursor-not-allowed' : ''}
      >
        <MoreVertIcon />
      </Icon>
    </div>
  );
};
