import { Profile1Icon } from '@/assets/icons/common';
import { Button, Spacer } from '@/components';
import { useAuthStore } from '@/stores/useAuthStore';
import { cn } from '@/utils/cn';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIDEBAR_TEXTS } from '@/constants';
import { sidebarStyles } from './Sidebar.styles';
import { LoginModal } from '@/components/auth';

interface SidebarProps {
  className?: string;
  isLoggedIn?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ className = '', isLoggedIn = false }) => {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleStartGitlog = () => {
    setIsLoginModalOpen(true);
  };

  const handleMyGitlog = () => {
    navigate('/mypage/myprofile');
    window.dispatchEvent(new CustomEvent('sidebar:close'));
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

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
              <h2 className={sidebarStyles.userName}>{user?.nickName || '사용자'}</h2>
              <p className={sidebarStyles.userBio}>{user?.bio || '한줄 소개를 입력해주세요'}</p>
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
              <Button intent="primary" className={sidebarStyles.sidebarButton}>
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
            <Button intent="gray" className={sidebarStyles.sidebarButton}>
              {SIDEBAR_TEXTS.LOGGED_IN.SETTINGS}
            </Button>
            <Button intent="gray" className={sidebarStyles.sidebarButton}>
              {SIDEBAR_TEXTS.LOGGED_IN.LOGOUT}
            </Button>
          </div>
        </div>
      )}
      </aside>

      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </>
  );
};

export default Sidebar;
