import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import HeaderLegacy from "@/components/Header/HeaderLegacy";
import TextField from "@/components/Text/TextField";
import ImagePreview from "@/components/ImagePreview/ImagePreview";
import Modal from "@/components/Modal/Modal";
import * as S from "./PostWritePage.styled";
import { useLogout } from "@/hooks/useLogout";
import { useState } from "react";
import { usePostForm } from "./usePostForm"; // ✅ 훅 분리

const PostWritePage: React.FC = () => {
  const {
    title,
    content,
    images,
    setTitle,
    setContent,
    handlePublish,
    handleDeleteImage,
    isEditMode,
  } = usePostForm();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isLogoutModalOpen, handleLogoutClick, handleConfirmLogout, handleCloseLogoutModal } =
    useLogout();

  const handleCancel = () => {
    if (confirm("작성 중인 내용을 취소하시겠습니까?")) {
      window.location.href = "/blog";
    }
  };

  return (
    <main className={S.layout}>
      <div className={S.fixedHeader}>
        <Header
          title="GITLOG"
          variant="action"
          onMenuClick={() => setIsSidebarOpen(true)}
          onDeleteClick={() => setIsDeleteModalOpen(true)}
          onPublishClick={handlePublish}
          onCancelClick={handleCancel}
        />
      </div>

      {isSidebarOpen && (
        <>
          <div className={S.sidebarOverlay} onClick={() => setIsSidebarOpen(false)} />
          <aside className={S.sidebar}>
            <Sidebar variant="user" onLogoutClick={handleLogoutClick} />
          </aside>
        </>
      )}

      <section className={S.form}>
        <div className={S.spacer} />
        <HeaderLegacy showPhotoButton={true} showFileButton={false} />

        <TextField
          variant="borderless"
          placeholder="제목"
          value={title}
          className={S.title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className={S.divider} />

        <TextField
          variant="borderless"
          multiline
          fullWidth
          placeholder="어떠한 것을 깨달았나요?"
          value={content}
          className={S.content}
          onChange={(e) => setContent(e.target.value)}
        />

        {images.length > 0 && (
          <div className={S.imageList}>
            {images.map((src, idx) => (
              <ImagePreview
                key={idx}
                src={src}
                alt={`첨부 이미지 ${idx + 1}`}
                onDelete={() => handleDeleteImage(idx)}
              />
            ))}
          </div>
        )}
      </section>

      <Modal
        open={isDeleteModalOpen}
        title="정말 삭제하시겠습니까?"
        description="입력 중이던 내용은 저장되지 않아요."
        onClose={() => setIsDeleteModalOpen(false)}
        confirmText="삭제하기"
        cancelText="취소"
        confirmColor="bg-brand-red text-white hover:opacity-90"
        onConfirm={() => (window.location.href = "/blog")}
      />

      <Modal
        open={isLogoutModalOpen}
        title="로그아웃을 진행할게요."
        onClose={handleCloseLogoutModal}
        onConfirm={handleConfirmLogout}
        confirmText="로그아웃"
        cancelText="취소"
        confirmColor="bg-brand-blue text-white hover:opacity-90"
      />
    </main>
  );
};

export default PostWritePage;
