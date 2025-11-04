import api, { ApiResponse } from "./index";

export interface Post {
  postId: string;
  title: string;
  contents: {
    contentOrder: number;
    content: string;
    contentType: "TEXT" | "IMAGE";
  }[];
  isOwner: boolean;
  comments: {
    commentId: number;
    content: string;
    nickName: string;
    isOwner: boolean;
  }[];
  nickName: string;
  profileUrl: string;
  createdAt: string;
}

interface PostData {
  post: Post[];
  pageMax: number;
}

export type PostResponse = ApiResponse<PostData>;

/** ✅ 게시글 목록 조회 */
export const fetchPosts = async (page: number, size: number) => {
  const accessToken = localStorage.getItem("accessToken");
  const endpoint = accessToken ? "/posts/all/token" : "/posts/all";

  const response = await api.get(endpoint, {
    params: { page, size },
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });

  return response.data;
};

/** ✅ 게시글 상세 조회 */
export const fetchPostDetail = async (postId: string) => {
  const accessToken = localStorage.getItem("accessToken");
  const endpoint = accessToken ? "/posts/token" : "/posts";

  const response = await api.get(endpoint, {
    params: { postId },
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });

  return response.data;
};

/** ✅ 게시글 생성 */
export const createPost = async (data: {
  title: string;
  contents: { contentOrder: number; content: string; contentType: "TEXT" | "IMAGE" }[];
}) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await api.post("/posts", data, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });

  return response.data;
};

/** ✅ 게시글 수정 */
export const updatePost = async (
  postId: string,
  data: {
    title: string;
    contents: { contentOrder: number; content: string; contentType: "TEXT" | "IMAGE" }[];
  },
) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await api.patch("/posts", data, {
    params: { postId },
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });

  return response.data;
};

/** ✅ 게시글 삭제 */
export const deletePost = async (postId: string) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await api.delete("/posts", {
    params: { postId },
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });

  return response.data;
};
