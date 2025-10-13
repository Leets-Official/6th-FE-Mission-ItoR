import Sidebar from '@/layout/Sidebar';
import PageHeader from '@/components/common/Pageheader/PageHeader';
import { useSidebar } from '@/hooks';
import { useAuthStore } from '@/stores/useAuthStore';
import { Outlet, useLocation } from 'react-router-dom';
import { MYPAGE_ROUTES } from '@/constants';

export default function Layout() {
  const location = useLocation();
  const { isSidebarOpen, sidebarRef, toggleSidebar } = useSidebar();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  // 경로에 따른 PageHeader
  const getPageHeaderType = () => {
    if (location.pathname === '/') {
      return 'main';
    }
    if (location.pathname.includes('/write')) {
      return 'write';
    }
    if (location.pathname === MYPAGE_ROUTES.MY_PROFILE) {
      return 'main';
    }
    if (location.pathname.startsWith('/mypage')) {
      return 'mypage';
    }
    return 'detail';
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
    </div>
  );
}
