import { Profile1Icon } from '@/assets/icons/common';
import Button from '@/components/common/button/Button';
import Spacer from '@/components/common/spacer/Spacer';
import clsx from 'clsx';
import { FC } from 'react';

interface SidebarProps {
  className?: string;
  isLoggedIn?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ className = '', isLoggedIn = false }) => {
  return (
    <div className={clsx('flex h-screen w-60 flex-col gap-2.5 border-r border-gray-90 bg-gray-96', className)}>
      <div className="flex flex-1 flex-col py-6">
        <div className="flex flex-col gap-2.5">
          <div className="px-4">
            <Profile1Icon />
          </div>
          {isLoggedIn ? (
            <div className="flex max-w-[688px] flex-col items-start justify-center gap-3 self-stretch px-5 py-3">
              <h2 className="self-stretch text-2xl font-medium leading-[160%] text-black">사용자 이름</h2>
              <p className="self-stretch text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-20">
                한줄 소개 텍스트
              </p>
            </div>
          ) : (
            <div className="px-5 py-3">
              <span className="text-sm font-light text-gray-20">You can make anything by writing</span>
            </div>
          )}
        </div>
        <Spacer />
        <div className="px-4">
          {isLoggedIn ? (
            <div className="flex gap-2.5">
              <Button intent="primary" className="w-[99px]">
                나의 깃로그
              </Button>
              <Button intent="primary" className="w-[99px]">
                깃로그 쓰기
              </Button>
            </div>
          ) : (
            <Button intent="primary">깃로그 시작하기</Button>
          )}
        </div>
      </div>

      {isLoggedIn && (
        <div className="flex flex-col py-6">
          <Spacer />
          <div className="flex gap-2.5 px-4">
            <Button intent="gray" className="w-[99px]">
              설정
            </Button>
            <Button intent="gray" className="w-[99px]">
              로그아웃
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
