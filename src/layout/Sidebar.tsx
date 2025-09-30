import { Profile1Icon } from '@/assets/icons/common';
import { Button, Spacer } from '@/components';
import { cn } from '@/utils/cn';
import { FC } from 'react';
import { SIDEBAR_TEXTS } from '@/constants/sidebar.Constants';

interface SidebarProps {
  className?: string;
  isLoggedIn?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ className = '', isLoggedIn = false }) => {
  return (
    <div className={cn('flex h-screen w-sidebar flex-col gap-2.5 border-r border-gray-90 bg-gray-96', className)}>
      <div className="flex flex-1 flex-col py-6">
        <div className="flex flex-col gap-2.5">
          <div className="px-4">
            <Profile1Icon />
          </div>
          {isLoggedIn ? (
            <div className="flex max-w-sidebar-content flex-col items-start justify-center gap-3 self-stretch px-5 py-3">
              <h2 className="self-stretch text-2xl font-medium leading-[160%] text-black">사용자 이름</h2>
              <p className="self-stretch text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-20">
                한줄 소개 텍스트
              </p>
            </div>
          ) : (
            <div className="px-5 py-3">
              <span className="text-sm font-light text-gray-20">{SIDEBAR_TEXTS.NOT_LOGGED_IN.QUOTE}</span>
            </div>
          )}
        </div>
        <Spacer />
        <div className="px-4">
          {isLoggedIn ? (
            <div className="flex gap-2.5">
              <Button intent="primary" className="w-sidebar-button">
                {SIDEBAR_TEXTS.LOGGED_IN.MY_GITLOG}
              </Button>
              <Button intent="primary" className="w-sidebar-button">
                {SIDEBAR_TEXTS.LOGGED_IN.WRITE_GITLOG}
              </Button>
            </div>
          ) : (
            <Button intent="primary">{SIDEBAR_TEXTS.NOT_LOGGED_IN.START_GITLOG}</Button>
          )}
        </div>
      </div>

      {isLoggedIn && (
        <div className="flex flex-col py-6">
          <Spacer />
          <div className="flex gap-2.5 px-4">
            <Button intent="gray" className="w-sidebar-button">
              {SIDEBAR_TEXTS.LOGGED_IN.SETTINGS}
            </Button>
            <Button intent="gray" className="w-sidebar-button">
              {SIDEBAR_TEXTS.LOGGED_IN.LOGOUT}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;