// src/pages/PostWritePage/PostWritePage.tsx
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import HeaderLegacy from "@/components/Header/HeaderLegacy";
import TextField from "@/components/Text/TextField";
import ImagePreview from "@/components/ImagePreview/ImagePreview";
import Modal from "@/components/Modal/Modal";
import * as S from "./PostWritePage.styled";
import { useLogout } from "@/hooks/useLogout";
import { useState, useRef } from "react";
import { usePostForm } from "./usePostForm";
import { useImageUpload } from "@/hooks/useImageUpload";

const PostWritePage: React.FC = () => {
  const {
    title,
    content,
    images,
    setTitle,
    setContent,
    setImages,
    handlePublish,
    handleDeleteImage,
  } = usePostForm();

  const { uploadImage, uploading } = useImageUpload();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isLogoutModalOpen, handleLogoutClick, handleConfirmLogout, handleCloseLogoutModal } =
    useLogout();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCancel = () => {
    if (confirm("작성 중인 내용을 취소하시겠습니까?")) {
      window.location.href = "/blog";
    }
  };

  /** ✅ Presigned URL 업로드 처리 */
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const uploadedUrl = await uploadImage(file);
      setImages((prev: string[]) => [...prev, uploadedUrl]);
    } catch {
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
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

        {/* ✅ 이미지 업로드 버튼 */}
        <div className="my-3">
          <button
            className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? "업로드 중..." : "이미지 추가"}
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

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
