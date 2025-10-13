import Sidebar from '@/layout/Sidebar';
import PageHeader from '@/components/common/Pageheader/PageHeader';
import { useSidebar, usePageHeaderType, useEditProfile } from '@/hooks';
import { useAuthStore } from '@/stores/useAuthStore';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const { isSidebarOpen, sidebarRef, toggleSidebar } = useSidebar();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const pageHeaderType = usePageHeaderType();
  const { handleEdit, handleCancel, handleSave } = useEditProfile();

  return (
    <div className="w-full">
      <PageHeader
        type={pageHeaderType}
        onHamburgerClick={toggleSidebar}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />
      <div ref={sidebarRef} className={`sidebar-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isLoggedIn={isLoggedIn} />
      </div>
      <div className="flex w-full flex-col items-center pt-16">
        <Outlet />
      </div>
    </div>
  );
}
