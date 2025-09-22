import { ChatIcon, CreateIcon, MoreVertIcon } from '@/assets/icons/common';
import Icon from '@/components/common/icon/Icon';

// 메인 타입 렌더링
export const renderMainType = () => (
  <div className="flex px-3 py-2 justify-center items-center gap-1 rounded-[25px] text-gray text-sm font-normal leading-[160%] tracking-[-0.07px]">
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
    <div className="flex w-[76px] px-3 py-2 justify-center items-start gap-1 flex-shrink-0">
      <span className="text-warning text-sm font-normal leading-[160%] tracking-[-0.07px]">삭제하기</span>
    </div>
    <div className="flex w-[76px] px-3 py-2 justify-center items-start gap-1 flex-shrink-0">
      <span className="text-black text-sm font-normal leading-[160%] tracking-[-0.07px]">게시하기</span>
    </div>
  </div>
);
