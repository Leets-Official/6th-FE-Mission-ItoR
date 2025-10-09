import { ChatIcon, CreateIcon, MoreVertIcon } from '@/assets/icons/common';
import Icon from '@/components/common/Icon/Icon';

// 메인 타입 렌더링
export const renderMainType = () => (
  <div className="flex items-center justify-center gap-1 rounded-[25px] px-3 py-2 text-sm font-normal leading-[160%] tracking-[-0.07px] text-gray">
    <Icon size="lg">
      <CreateIcon />
    </Icon>
    <span>깃로그 쓰기</span>
  </div>
);

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
    <div className="flex w-[76px] flex-shrink-0 items-start justify-center gap-1 px-3 py-2">
      <span className="text-sm font-normal leading-[160%] tracking-[-0.07px] text-warning">삭제하기</span>
    </div>
    <div className="flex w-[76px] flex-shrink-0 items-start justify-center gap-1 px-3 py-2">
      <span className="text-sm font-normal leading-[160%] tracking-[-0.07px] text-black">게시하기</span>
    </div>
  </div>
);

// 마이페이지 타입 렌더링 (빈 렌더링)
export const renderMypageType = () => null;
