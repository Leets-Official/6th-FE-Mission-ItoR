import { Profile1Icon } from '@/assets/icons/common';
import { Button, Spacer } from '@/components';
import { LoginModal } from '@/components/auth';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/utils/cn';
import { FC } from 'react';
import { SIDEBAR_TEXTS } from '@/constants/sidebar.constants';
import { sidebarStyles } from './Sidebar.styles';

interface SidebarProps {
  className?: string;
  isLoggedIn?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ className = '', isLoggedIn = false }) => {
  const { isLoginModalOpen, openLoginModal, closeLoginModal } = useSidebar();

  return (
    <div className={cn(sidebarStyles.container, className)}>
      <div className={sidebarStyles.mainContent}>
        <div className={sidebarStyles.profileSection}>
          <div className={sidebarStyles.profileIconWrapper}>
            <Profile1Icon />
          </div>
          {isLoggedIn ? (
            <div className={sidebarStyles.userInfoContainer}>
              <h2 className={sidebarStyles.userName}>사용자 이름</h2>
              <p className={sidebarStyles.userBio}>한줄 소개 텍스트</p>
            </div>
          ) : (
            <div className={sidebarStyles.quoteContainer}>
              <span className={sidebarStyles.quoteText}>{SIDEBAR_TEXTS.NOT_LOGGED_IN.QUOTE}</span>
            </div>
          )}
        </div>
        <Spacer />
        <div className={sidebarStyles.buttonContainer}>
          {isLoggedIn ? (
            <div className={sidebarStyles.buttonGroup}>
              <Button intent="primary" className={sidebarStyles.sidebarButton}>
                {SIDEBAR_TEXTS.LOGGED_IN.MY_GITLOG}
              </Button>
              <Button intent="primary" className={sidebarStyles.sidebarButton}>
                {SIDEBAR_TEXTS.LOGGED_IN.WRITE_GITLOG}
              </Button>
            </div>
          ) : (
            <Button intent="primary" onClick={openLoginModal}>
              {SIDEBAR_TEXTS.NOT_LOGGED_IN.START_GITLOG}
            </Button>
          )}
        </div>
      </div>

      {isLoggedIn && (
        <div className={sidebarStyles.bottomSection}>
          <Spacer />
          <div className={cn(sidebarStyles.buttonContainer, sidebarStyles.buttonGroup)}>
            <Button intent="gray" className={sidebarStyles.sidebarButton}>
              {SIDEBAR_TEXTS.LOGGED_IN.SETTINGS}
            </Button>
            <Button intent="gray" className={sidebarStyles.sidebarButton}>
              {SIDEBAR_TEXTS.LOGGED_IN.LOGOUT}
            </Button>
          </div>
        </div>
      )}

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default Sidebar;
