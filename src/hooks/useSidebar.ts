import { useState, useRef, useEffect } from 'react';
import { useModalStore } from '@/stores/useModalStore';

export const useSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { modalType, openModal, closeModal } = useModalStore();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openLoginModal = () => {
    openModal('login');
    setIsSidebarOpen(false);
    window.dispatchEvent(new CustomEvent('sidebar:close'));
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isSidebarOpen]);

  // 전역 사이드바 닫기 이벤트
  useEffect(() => {
    const handleGlobalSidebarClose = () => closeSidebar();
    window.addEventListener('sidebar:close', handleGlobalSidebarClose as EventListener);
    return () => {
      window.removeEventListener('sidebar:close', handleGlobalSidebarClose as EventListener);
    };
  }, []);

  return {
    isSidebarOpen,
    sidebarRef,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    isLoginModalOpen: modalType === 'login',
    openLoginModal,
    closeLoginModal: closeModal,
  };
};
