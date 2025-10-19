import { useState } from "react";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import HeaderLegacy from "@/components/Header/HeaderLegacy";
import TextField from "@/components/Text/TextField";
import ImagePreview from "@/components/ImagePreview/ImagePreview";
import Toast from "@/components/Toast/Toast";
import Modal from "@/components/Modal/Modal";
import * as S from "./PostWritePage.styled";

const PostWritePage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([
    "https://picsum.photos/600/300",
    "https://picsum.photos/700/250",
  ]);

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCancel = () => {
    const confirmCancel = confirm("작성 중인 내용을 취소하시겠습니까?");
    if (confirmCancel) {
      setTitle("");
      setContent("");
      setImages([]);
    }
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      setToast({ message: "내용을 입력해주세요", type: "error" });
      return;
    }
    setToast({ message: "저장되었습니다!", type: "success" });
  };

  const handleDeleteClick = () => setIsDeleteModalOpen(true);

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    setToast({ message: "삭제되었습니다.", type: "success" });
  };

  const handleDeleteImage = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  return (
    <main className={S.layout}>
      <div className={S.fixedHeader}>
        <Header
          title="GITLOG"
          variant="action"
          onMenuClick={() => setIsSidebarOpen(true)}
          onDeleteClick={handleDeleteClick}
          onPublishClick={handlePublish}
          onCancelClick={handleCancel}
        />
      </div>

      {isSidebarOpen && (
        <>
          <div className={S.sidebarOverlay} onClick={() => setIsSidebarOpen(false)} />
          <aside className={S.sidebar}>
            <Sidebar
              variant="user"
              onLogoutClick={() => console.log("로그아웃")}
              onSettingClick={() => console.log("설정")}
              onMyPageClick={() => console.log("마이페이지 이동")}
            />
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

      {toast && (
        <div className={S.toastWrapper}>
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}

      <Modal
        open={isDeleteModalOpen}
        title="정말 삭제하시겠습니까?"
        description="입력중이던 내용은 저장되지 않아요."
        onClose={() => setIsDeleteModalOpen(false)}
        confirmText="삭제하기"
        cancelText="취소"
        confirmColor="bg-brand-red text-white hover:opacity-90"
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
};

export default PostWritePage;
