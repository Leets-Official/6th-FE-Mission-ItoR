import Sidebar from '@/layout/Sidebar';
import PageHeader from '@/components/common/Pageheader/PageHeader';
import Modal from '@/components/common/Modal/Modal';
import { LoginModal } from '@/components/auth';
import { useSidebar } from '@/hooks';
import { useModalStore } from '@/stores/useModalStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const { isSidebarOpen, sidebarRef, toggleSidebar } = useSidebar();
  const { modalType, modalMessage, confirmButtonText, onModalConfirm, closeModal } = useModalStore();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  // 경로에 따른 PageHeader
  const getPageHeaderType = () => {
    if (location.pathname === '/') {
      return 'main';
    }
    if (location.pathname.includes('/write')) {
      return 'write';
    }
    if (location.pathname.startsWith('/mypage')) {
      return 'mypage';
    }
    return 'detail';
  };

  const handleModalConfirm = () => {
    closeModal(); // 먼저 현재 모달 닫기
    if (onModalConfirm) {
      // 약간의 지연을 두고 다음 모달 열기 (cleanup 시간 확보)
      setTimeout(() => {
        onModalConfirm();
      }, 0);
    }
  };

  return (
    <div className="w-full">
      <PageHeader type={getPageHeaderType()} onHamburgerClick={toggleSidebar} />
      <div ref={sidebarRef} className={`sidebar-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isLoggedIn={isLoggedIn} />
      </div>
      <div className="flex w-full flex-col items-center pt-16">
        <Outlet />
      </div>

      {/* 메시지 모달 */}
      <Modal
        isOpen={modalType === 'message'}
        onClose={closeModal}
        onDelete={handleModalConfirm}
        cancelButtonText="취소"
        confirmButtonText={confirmButtonText || '확인'}
        confirmButtonVariant="primary"
      >
        <p className="text-center text-sm">{modalMessage}</p>
      </Modal>

      {/* 로그인 모달 */}
      <LoginModal isOpen={modalType === 'login'} onClose={closeModal} />
    </div>
  );
}
