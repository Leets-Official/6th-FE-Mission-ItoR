import Sidebar from '@/layout/Sidebar';
import PageHeader from '@/components/common/Pageheader/PageHeader';
import { useSidebar } from '@/hooks/useSidebar';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const { isSidebarOpen, sidebarRef, toggleSidebar } = useSidebar();
  
  // 경로에 따른 PageHeader 타입 결정
  const getPageHeaderType = () => {
    if (location.pathname === '/') return 'main';
    if (location.pathname.includes('/write')) return 'write';
    return 'detail';
  };

  return (
    <div>
      <PageHeader type={getPageHeaderType()} onHamburgerClick={toggleSidebar} />
        <div ref={sidebarRef} className={`sidebar-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Sidebar />
        </div>
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
}
