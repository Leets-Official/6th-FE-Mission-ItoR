import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Pagination from "@/components/Pagination/Pagination";
import PostItem from "@/components/Blog/PostItem/PostItem";
import SmallButton from "@/components/SmallButton/SmallButton";
import * as S from "./MyPage.styled";
import { ApiPost } from "@/types/post";
import { SettingsIcon } from "@/assets/icons";
import Avatar from "@/components/Avatar/Avatar";
import Modal from "@/components/Modal/Modal";
import { useLogout } from "@/hooks/useLogout";
import { useUserStore } from "@/store/useUserStore";
import { fetchPosts } from "@/api/postApi";
import { fetchMyInfo } from "@/api/userApi";
import { useToast } from "@/contexts/ToastContext";

export default function MyPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [pageMax, setPageMax] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUserStore();
  const { showToast } = useToast();

  const { isLogoutModalOpen, handleLogoutClick, handleConfirmLogout, handleCloseLogoutModal } =
    useLogout();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchMyInfo();
        if (res.code === 200 && res.data) {
          setUser(res.data);
        }
      } catch {
        showToast("", "error");
      }
    };
    load();
  }, [setUser, showToast]);

  useEffect(() => {
    if (location.state?.toastMessage) {
      showToast(location.state.toastMessage, "success");
      window.history.replaceState({}, document.title);
    }
  }, [location.state, showToast]);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const res = await fetchPosts(currentPage, 5);
        if (res.code === 200 && res.data?.posts) {
          setPosts(res.data.posts);
          setPageMax(res.data.pageMax);
        }
      } catch {
        showToast("게시글을 불러오지 못했습니다.", "error");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [currentPage, showToast]);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 z-50 w-full">
        <Header
          title="GITLOG"
          variant="write"
          onMenuClick={() => setIsSidebarOpen(true)}
          onWriteClick={() => navigate("/write")}
        />
      </div>
      <div className="h-[60px]" />

      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)} />
          <aside className="animate-slideIn fixed top-0 left-0 z-50 h-full w-64">
            <Sidebar variant="user" onLogoutClick={handleLogoutClick} />
          </aside>
        </>
      )}

      <section className={S.profileSection}>
        <div className={S.profileSectionInner}>
          <div className={S.profileInner}>
            <Avatar src={user?.profilePicture} alt="프로필 이미지" size="lg" />
            <h2 className={S.nickname}>{user?.nickname}</h2>
            <p className={S.intro}>{user?.introduction}</p>

            <SmallButton
              label="내 프로필 설정"
              variant="secondaryOutline"
              leftIcon={<SettingsIcon width={16} height={16} />}
              className={S.editProfileButton}
              onClick={() => navigate("/mypage/setting")}
            />
          </div>
        </div>
      </section>

      <main className={S.mainWrapper}>
        {loading ? (
          <div className="py-8 text-center text-gray-500">로딩 중...</div>
        ) : posts.length === 0 ? (
          <div className="py-8 text-center text-gray-500">작성한 게시글이 없습니다.</div>
        ) : (
          <>
            <ul className={S.listWrapper}>
              {posts.map((post) => (
                <PostItem
                  key={post.postId}
                  post={post}
                  onClick={() => navigate(`/blog/${post.postId}`)}
                />
              ))}
            </ul>

            <div className={S.paginationWrapper}>
              <Pagination
                currentPage={currentPage}
                totalPages={pageMax}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </main>

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
