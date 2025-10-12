import { ChatIcon, CreateIcon, MoreVertIcon } from '@/assets/icons/common';
import Icon from '@/components/common/Icon/Icon';
import { useAuthStore } from '@/stores/useAuthStore';
import { useModalStore } from '@/stores/useModalStore';

// 메인 타입 렌더링
export const renderMainType = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const openModal = useModalStore(state => state.openModal);

  const handleClick = () => {
    if (!isLoggedIn) {
      openModal(
        'message',
        '로그인이 필요합니다',
        () => {
          openModal('login');
        },
        '로그인 하러 가기'
      );
      return;
    }
    // TODO: 로그인 상태일 때 글쓰기 페이지로 이동
  };

  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-center justify-center gap-1 rounded-[25px] px-3 py-2 text-sm font-normal leading-[160%] tracking-[-0.07px] text-gray hover:bg-gray-10"
    >
      <Icon size="lg">
        <CreateIcon />
      </Icon>
      <span>깃로그 쓰기</span>
    </div>
  );
};

// 상세 타입 렌더링
export const renderDetailType = () => (
  <div className="flex items-center gap-2">
    <Icon size="lg" clickable>
      <ChatIcon />
    </Icon>
    <Icon size="lg" clickable>
      <MoreVertIcon />
    </Icon>
  </div>
);

// 작성 타입 렌더링
export const renderWriteType = () => (
  <div className="flex items-center gap-2.5">
    <button type="button" className="flex items-center justify-center gap-1 px-3 py-2">
      <span className="text-sm font-regular text-warning">삭제하기</span>
    </button>
    <button type="button" className="flex items-center justify-center gap-1 px-3 py-2">
      <span className="text-sm font-regular text-black">게시하기</span>
    </button>
  </div>
);

// 마이페이지 타입 렌더링 (빈 렌더링)
export const renderMypageType = () => null;
