// AppLayout.tsx
import { useState } from "react";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Modal from "@/components/Modal/Modal";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
    setIsSidebarOpen(false);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    // 실제 로그아웃 로직 (예: 쿠키 삭제, 리다이렉트 등)
    console.log("로그아웃 완료");
  };

  return (
    <div className="relative min-h-screen">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)} />
          <aside className="animate-slideIn fixed top-0 left-0 z-50 h-full w-64">
            <Sidebar variant="user" onLogoutClick={handleLogoutClick} />
          </aside>
        </>
      )}

      <main>{children}</main>

      {isLogoutModalOpen && (
        <Modal
          open={isLogoutModalOpen}
          title="로그아웃 하시겠습니까?"
          description="현재 로그인 상태가 종료됩니다."
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleConfirmLogout}
          confirmText="로그아웃"
          cancelText="취소"
          confirmColor="bg-brand-red text-white hover:opacity-90"
        />
      )}
    </div>
  );
}
