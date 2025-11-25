import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "@/components/Pagination/Pagination";
import PostItem from "@/components/Blog/PostItem/PostItem";
import SmallButton from "@/components/SmallButton/SmallButton";
import PageLayout from "@/layouts/PageLayout";
import * as S from "./MyPage.styled";
import { ApiPost } from "@/types/post";
import { SettingsIcon } from "@/assets/icons";
import Avatar from "@/components/Avatar/Avatar";
import { useUserStore } from "@/store/useUserStore";
import { fetchPosts } from "@/api/postApi";
import { fetchMyInfo } from "@/api/userApi";
import { useToast } from "@/contexts/ToastContext";

export default function MyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [pageMax, setPageMax] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUserStore();
  const { showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchMyInfo();
        if (res.code === 200 && res.data) {
          setUser({
            ...res.data,
            loginType: user?.loginType ?? res.data.loginType ?? "email",
          });
        }
      } catch {
        showToast("사용자 정보를 불러오지 못했습니다.", "error");
      }
    };
    load();
  }, [setUser, showToast, user?.loginType]);

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
    <PageLayout headerVariant="write" onWriteClick={() => navigate("/write")}>
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
    </PageLayout>
  );
}
