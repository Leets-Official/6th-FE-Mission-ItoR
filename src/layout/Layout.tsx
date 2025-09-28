import Sidebar from '@/layout/Sidebar';
import PageHeader from '@/components/common/Pageheader/PageHeader';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  
  // 경로에 따른 PageHeader 타입 결정
  const getPageHeaderType = () => {
    if (location.pathname === '/') return 'main';
    if (location.pathname.includes('/write')) return 'write';
    return 'detail';
  };

  return (
    <div>
      <PageHeader type={getPageHeaderType()} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
