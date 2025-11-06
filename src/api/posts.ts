import api from "@/api/axiosInstance";

export interface PostBody {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface PostResponse {
  postId: string; // uuid
  title: string;
  contents: {
    contentOrder: number;
    content: string;
    contentType: "TEXT" | "IMAGE";
  }[];
  nickName: string; // author 대신 nickName
  profileUrl?: string;
  profileIntro?: string;
  createdAt: string;
  isOwner: boolean;
  comments: {
    commentId: string;
    content: string;
    author: string;
    createdAt: string;
  }[];
}

/** 게시글 생성 */
export const createPost = async (body: PostBody): Promise<any> => {
  const { data } = await api.post("/posts", body);
  return data.data;
};

/** 게시글 수정 */
export const updatePost = async (
  id: string,
  body: PostBody
): Promise<PostResponse> => {
  const { data } = await api.patch(`/posts/${id}`, body);
  return data.data;
};

/** 게시글 삭제 */
export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

/** 게시글 전체 조회 */
export const getAllPosts = async (): Promise<any[]> => {
  const { data } = await api.get("/posts/all", {
    params: { size: 10, page: 1 },
  });
  return data.data.posts;
};

/** ✅ 게시글 단일 조회 (수정됨) */
export const getPostById = async (postId: string): Promise<PostResponse> => {
  const { data } = await api.get("/posts/token", {
    params: { postId }, // ✅ query parameter로 전달해야 함
  });
  return data.data;
};
