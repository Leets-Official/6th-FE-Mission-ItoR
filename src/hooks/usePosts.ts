import { useEffect, useState } from "react";
import { fetchPosts } from "@/api/postApi";
import { Post } from "@/types/post";

interface PostsResponse {
  code: number;
  message: string;
  data: {
    posts: Post[];
    pageMax: number;
  };
}

export const usePosts = (page: number, size: number) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageMax, setPageMax] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const res: PostsResponse = await fetchPosts(page, size);
        console.log("📦 서버 응답:", res);

        if (res.code === 200 && res.data?.posts) {
          setPosts(res.data.posts);
          setPageMax(res.data.pageMax);
        } else {
          console.error("게시글 불러오기 실패:", res.message);
        }
      } catch (err) {
        console.error("게시글 조회 에러:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page, size]);

  return { posts, pageMax, loading };
};
