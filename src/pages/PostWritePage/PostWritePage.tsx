import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import HeaderLegacy from "@/components/Header/HeaderLegacy";
import TextField from "@/components/Text/TextField";
import ImagePreview from "@/components/ImagePreview/ImagePreview";
import Modal from "@/components/Modal/Modal";
import * as S from "./PostWritePage.styled";
import { useLogout } from "@/hooks/useLogout";
import { createPost, updatePost, fetchPostDetail, type Post } from "@/api/postApi";
import { useToast } from "@/contexts/ToastContext";

const PostWritePage: React.FC = () => {
  const { postId } = useParams<{ postId?: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast(); // ✅

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isLogoutModalOpen, handleLogoutClick, handleConfirmLogout, handleCloseLogoutModal } =
    useLogout();

  const isEditMode = Boolean(postId);

  useEffect(() => {
    const loadPostForEdit = async () => {
      if (!isEditMode || !postId) return;
      try {
        const res = await fetchPostDetail(postId);
        const post: Post | undefined = res?.data;

        if (res.code === 0 || res.code === 200) {
          if (post) {
            setTitle(post.title);

            const textContents = post.contents
              .filter((c) => c.contentType === "TEXT")
              .map((c) => c.content)
              .join("\n");
            setContent(textContents);

            const imageUrls = post.contents
              .filter((c) => c.contentType === "IMAGE")
              .map((c) => c.content);
            setImages(imageUrls);

            showToast("게시글 데이터를 불러왔습니다.", "success");
          }
        } else {
          showToast("게시글 불러오기 실패", "error");
        }
      } catch (error) {
        console.error("게시글 불러오기 오류:", error);
        showToast("게시글 불러오는 중 오류가 발생했습니다.", "error");
      }
    };

    loadPostForEdit();
  }, [isEditMode, postId, showToast]);

  const handleCancel = () => {
    if (confirm("작성 중인 내용을 취소하시겠습니까?")) {
      navigate("/blog", { replace: true });
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      showToast("내용을 입력해주세요", "error");
      return;
    }

    const payload: Pick<Post, "title" | "contents"> = {
      title,
      contents: [
        { contentOrder: 1, content, contentType: "TEXT" },
        ...images.map((url, idx) => ({
          contentOrder: idx + 2,
          content: url,
          contentType: "IMAGE" as const,
        })),
      ],
    };

    try {
      const res = isEditMode ? await updatePost(postId!, payload) : await createPost(payload);

      if (res.code === 200 || res.code === 201) {
        showToast(isEditMode ? "게시글이 수정되었습니다!" : "게시글이 등록되었습니다!", "success");
        setTimeout(() => {
          navigate("/blog", { replace: true });
        }, 1000);
      } else {
        showToast(res.message || "요청 실패", "error");
      }
    } catch (error) {
      console.error("게시글 저장 오류:", error);
      showToast("서버 오류가 발생했습니다.", "error");
    }
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
        onConfirm={() => navigate("/blog", { replace: true })}
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
