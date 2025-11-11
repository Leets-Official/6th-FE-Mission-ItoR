import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header/Header";
import Avatar from "@/components/Avatar/Avatar";
import CommentSection from "@/components/Blog/CommentSection/CommentSection";
import * as S from "./PostDetail.styled";
import Sidebar from "@/components/Sidebar/Sidebar";
import LoginModal from "@/components/Blog/LoginModal/LoginModal";
import DropdownMenuList from "@/components/DropdownMenu/DropdownMenuList";
import Modal from "@/components/Modal/Modal";
import { useUserStore } from "@/store/useUserStore";
import { useLogout } from "@/hooks/useLogout";
import { fetchPostDetail, deletePost } from "@/api/postApi";
import { Post } from "@/types/post";
import { useToast } from "@/contexts/ToastContext";

export default function PostDetail() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isLogoutModalOpen, handleLogoutClick, handleConfirmLogout, handleCloseLogoutModal } =
    useLogout();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const commentRef = useRef<HTMLDivElement>(null);
  const { postId } = useParams<{ postId: string }>();

  const isLogin = !!user;
  const isOwner = post?.isOwner ?? false;

  useEffect(() => {
    const loadPost = async () => {
      if (!postId) return;
      setLoading(true);
      try {
        const res = await fetchPostDetail(postId);

        if ((res.code === 200 || res.code === 0) && res.data) {
          setPost(res.data);
          setCommentCount(res.data.comments?.length ?? 0);
        } else {
          console.error("게시글 불러오기 실패:", res.message);
          showToast("게시글을 불러오지 못했습니다.", "error");
        }
      } catch (err) {
        console.error("게시글 상세 조회 에러:", err);
        showToast("서버 오류가 발생했습니다.", "error");
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [postId, showToast]);

  if (loading) return <div className="p-6 text-center">게시글 불러오는 중...</div>;
  if (!post) return <div className="p-6 text-center">게시글을 찾을 수 없습니다.</div>;

  const handleScrollToComments = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeletePost = async () => {
    if (!postId) return;
    try {
      const res = await deletePost(postId);
      if (res.code === 200 || res.code === 0) {
        setIsDeleteModalOpen(false);
        showToast("게시글이 삭제되었습니다.", "success");
        setTimeout(() => {
          navigate("/blog", { replace: true });
        }, 1000);
      } else {
        showToast(res.message || "삭제 실패", "error");
      }
    } catch (err) {
      console.error("게시글 삭제 에러:", err);
      showToast("삭제 중 오류가 발생했습니다.", "error");
    }
  };

  const menuItems = [
    { label: "수정하기", onClick: () => navigate(`/edit/${postId}`) },
    { label: "삭제하기", onClick: () => setIsDeleteModalOpen(true) },
  ];

  return (
    <div className={S.page}>
      <div className="fixed top-0 left-0 z-50 w-full">
        <Header
          title="GITLOG"
          variant="chatMenu"
          onChatClick={handleScrollToComments}
          onMenuClick={() => setIsSidebarOpen(true)}
          onMoreClick={() => setIsMenuOpen((prev) => !prev)}
          showMoreIcon={isOwner}
        />
        {isOwner && isMenuOpen && (
          <div className="absolute top-[55px] right-6 z-50">
            <DropdownMenuList
              items={menuItems}
              onItemClick={(item) => {
                item.onClick?.();
                setIsMenuOpen(false);
              }}
              position="right"
            />
          </div>
        )}
      </div>

      <div className="h-[70px]" />

      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)} />
          <aside className="animate-slideIn fixed top-0 left-0 z-50 h-full w-64">
            <Sidebar
              variant={isLogin ? "user" : "guest"}
              onLogoutClick={handleLogoutClick}
              onLoginClick={() => setIsLoginOpen(true)}
            />
          </aside>
        </>
      )}

      <main className={S.container}>
        <section className={S.group}>
          <h1 className={S.title}>{post.title}</h1>

          <div className={S.meta}>
            <Avatar src={post.profileUrl} size="xs" />
            <span className={S.nick}>{post.nickName}</span>
            <span className={S.date}>
              {new Date(post.createdAt).toLocaleDateString()} 댓글 {commentCount}
            </span>
          </div>
        </section>

        <div className={S.divider} />

        <section className={S.group}>
          {post.contents?.map((c) =>
            c.contentType === "TEXT" ? (
              <p key={c.contentOrder} className={S.content}>
                {c.content}
              </p>
            ) : (
              <img
                key={c.contentOrder}
                src={c.content}
                alt="게시글 이미지"
                className="mt-4 rounded-xl"
              />
            ),
          )}
        </section>

        <div className={S.divider} />

        <section className={S.group} ref={commentRef}>
          <CommentSection
            isLoggedIn={isLogin}
            postId={postId!}
            postAuthorProfile={post.profileUrl}
            postAuthorName={post.nickName}
            onLoginClick={() => setIsLoginOpen(true)}
            onSubmit={(comment: string) => {
              showToast(`댓글 등록: ${comment}`, "success");
              setCommentCount((prev) => prev + 1);
            }}
          />
        </section>
      </main>

      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <Modal
        title="해당 블로그를 삭제하시겠어요?"
        description="삭제된 블로그는 다시 확인할 수 없어요."
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePost}
        confirmText="삭제하기"
        cancelText="취소"
        confirmColor="bg-brand-red text-white hover:opacity-90"
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
    </div>
  );
}
