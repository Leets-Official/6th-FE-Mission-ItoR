import { useState, ReactNode } from "react";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Modal from "@/components/Modal/Modal";
import { useLogout } from "@/hooks/useLogout";
import { useUserStore } from "@/store/useUserStore";

export type HeaderVariant = "plain" | "write" | "edit" | "saveCancel" | "action" | "chatMenu";

interface PageLayoutProps {
  children: ReactNode;
  headerVariant: HeaderVariant;
  onWriteClick?: () => void;
  onEditClick?: () => void;
  onSaveClick?: () => void;
  onCancelClick?: () => void;
  onDeleteClick?: () => void;
  onPublishClick?: () => void;
  onChatClick?: () => void;
  onMoreClick?: () => void;
  showMoreIcon?: boolean;
  headerTitle?: string;
}

export default function PageLayout({
  children,
  headerVariant,
  onWriteClick,
  onEditClick,
  onSaveClick,
  onCancelClick,
  onDeleteClick,
  onPublishClick,
  onChatClick,
  onMoreClick,
  showMoreIcon,
  headerTitle = "GITLOG",
}: PageLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUserStore();
  const { isLogoutModalOpen, handleLogoutClick, handleConfirmLogout, handleCloseLogoutModal } =
    useLogout();

  const isLogin = !!user;

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 z-50 w-full">
        <Header
          title={headerTitle}
          variant={headerVariant}
          onMenuClick={() => setIsSidebarOpen(true)}
          onWriteClick={onWriteClick}
          onEditClick={onEditClick}
          onSaveClick={onSaveClick}
          onCancelClick={onCancelClick}
          onDeleteClick={onDeleteClick}
          onPublishClick={onPublishClick}
          onChatClick={onChatClick}
          onMoreClick={onMoreClick}
          showMoreIcon={showMoreIcon}
        />
      </div>

      <div className="h-[70px]" />

      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)} />
          <aside className="animate-slideIn fixed top-0 left-0 z-50 h-full w-64">
            <Sidebar
              variant={isLogin ? "user" : "guest"}
              onLogoutClick={handleLogoutClick}
              onLoginClick={() => setIsSidebarOpen(false)}
            />
          </aside>
        </>
      )}

      {children}

      <Modal
        open={isLogoutModalOpen}
        title="로그아웃을 진행할게요."
        onClose={handleCloseLogoutModal}
        onConfirm={handleConfirmLogout}
        confirmText="로그아웃"
        cancelText="취소"
        confirmColor="bg-brand-blue text-white hover:opacity-90"
      />
    </div>
  );
}
