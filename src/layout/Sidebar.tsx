import { Profile1Icon } from '@/assets/icons/common';
import { Button, Spacer } from '@/components';
import { useAuthStore } from '@/stores/useAuthStore';
import { useModalStore } from '@/stores/useModalStore';
import { cn } from '@/utils/cn';
import { FC } from 'react';
import { SIDEBAR_TEXTS, MYPAGE_TEXTS } from '@/constants';
import { sidebarStyles } from './Sidebar.styles';
import { useSidebar } from '@/hooks';
import { LoginModal } from '@/components/auth';

interface SidebarProps {
  className?: string;
  isLoggedIn?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ className = '', isLoggedIn = false }) => {
  const user = useAuthStore(state => state.user);
  const { modalType, closeModal } = useModalStore();
  const { handleStartGitlog, handleMyGitlog, handleWriteGitlog, handleSettings, handleLogout } = useSidebar();

  return (
    <>
      <aside
        className={cn(sidebarStyles.container, className)}
        role="complementary"
        aria-label="Sidebar"
      >
      <div className={sidebarStyles.mainContent}>
        <div className={sidebarStyles.profileSection}>
          <div className={sidebarStyles.profileIconWrapper}>
            <Profile1Icon />
          </div>
          {isLoggedIn ? (
            <div className={sidebarStyles.userInfoContainer}>
              <h2 className={sidebarStyles.userName}>{user?.nickName || MYPAGE_TEXTS.PROFILE.DEFAULT_USER_NAME}</h2>
              <p className={sidebarStyles.userBio}>{user?.bio || MYPAGE_TEXTS.PROFILE.DEFAULT_BIO}</p>
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
              <Button intent="primary" className={sidebarStyles.sidebarButton} onClick={handleMyGitlog}>
                {SIDEBAR_TEXTS.LOGGED_IN.MY_GITLOG}
              </Button>
              <Button intent="primary" className={sidebarStyles.sidebarButton} onClick={handleWriteGitlog}>
                {SIDEBAR_TEXTS.LOGGED_IN.WRITE_GITLOG}
              </Button>
            </div>
          ) : (
            <Button intent="primary" onClick={handleStartGitlog}>
              {SIDEBAR_TEXTS.NOT_LOGGED_IN.START_GITLOG}
            </Button>
          )}
        </div>
      </div>

      {isLoggedIn && (
        <div className={sidebarStyles.bottomSection}>
          <Spacer />
          <div className={cn(sidebarStyles.buttonContainer, sidebarStyles.buttonGroup)}>
            <Button intent="gray" className={sidebarStyles.sidebarButton} onClick={handleSettings}>
              {SIDEBAR_TEXTS.LOGGED_IN.SETTINGS}
            </Button>
            <Button intent="gray" className={sidebarStyles.sidebarButton} onClick={handleLogout}>
              {SIDEBAR_TEXTS.LOGGED_IN.LOGOUT}
            </Button>
          </div>
        </div>
      )}
      </aside>

      {modalType === 'login' && <LoginModal isOpen={true} onClose={closeModal} />}
    </>
  );
};

export default Sidebar;
