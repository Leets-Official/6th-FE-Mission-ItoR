import { useEffect, useState } from "react";
import { fetchPostDetail } from "@/api/postApi";
import { Post } from "@/types/post";

interface PostResponse {
  code: number;
  message: string;
  data: Post;
}

export const usePostDetail = (postId: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const res: PostResponse = await fetchPostDetail(postId);

        if ((res.code === 200 || res.code === 0) && res.data) {
          setPost(res.data);
        } else {
          console.error("게시글 조회 실패:", res.message);
        }
      } catch (err) {
        console.error("게시글 상세 조회 에러:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  return { post, loading };
};
