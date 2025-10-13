import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/stores/useModalStore';
import { MYPAGE_ROUTES } from '@/constants';

export const useSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const openModal = useModalStore(state => state.openModal);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
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

  const dispatchClose = () => window.dispatchEvent(new CustomEvent('sidebar:close'));

  // 네비게이션
  const handleStartGitlog = () => {
    openModal('login');
  };

  const handleMyGitlog = () => {
    navigate(MYPAGE_ROUTES.MY_PROFILE);
    dispatchClose();
  };

  const handleWriteGitlog = () => {
    // TODO: 글쓰기 페이지 라우팅
    dispatchClose();
  };

  const handleSettings = () => {
    // TODO: 설정 페이지 라우팅
    dispatchClose();
  };

  const handleLogout = () => {
    // TODO: 로그아웃 처리
    dispatchClose();
  };

  return {
    isSidebarOpen,
    sidebarRef,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    handleStartGitlog,
    handleMyGitlog,
    handleWriteGitlog,
    handleSettings,
    handleLogout,
  };
};
