import { useState, useRef, useEffect } from 'react';

export const useSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

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
    setIsLoginModalOpen(true);
    // 모달이 열릴 때 사이드바는 닫힘
    setIsSidebarOpen(false);
    // 다른 훅 인스턴스에도 닫기 신호 브로드캐스트
    window.dispatchEvent(new CustomEvent('sidebar:close'));
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
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

  // 전역 사이드바 닫기 이벤트 구독
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
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
  };
};
