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
    <div className={clsx('flex w-60 h-screen flex-col gap-2.5 bg-gray-96 border-r border-gray-90', className)}>
      <div className="flex flex-1 py-6 flex-col">
        <div className="flex flex-col gap-2.5">
          <div className="px-4">
            <Profile1Icon />
          </div>
          {isLoggedIn ? (
            <div className="flex max-w-[688px] px-5 py-3 flex-col justify-center items-start gap-3 self-stretch">
              <h2 className="text-black text-2xl font-medium leading-[160%] self-stretch">사용자 이름</h2>
              <p className="text-gray-20 text-sm font-light leading-[160%] tracking-[-0.07px] self-stretch">
                한줄 소개 텍스트
              </p>
            </div>
          ) : (
            <div className="px-5 py-3">
              <span className="text-gray-20 text-sm font-light">You can make anything by writing</span>
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
        <div className="flex py-6 flex-col">
          <Spacer />
          <div className="flex px-4 gap-2.5">
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
