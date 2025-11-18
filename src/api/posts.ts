import api from "@/api/axiosInstance";

export interface PostBody {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface Comment {
  commentId: string;
  content: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  isOwner: boolean;
}

export interface ContentBlock {
  contentOrder: number;
  content: string;
  contentType: "TEXT" | "IMAGE";
}

export interface PostDetailResponse {
  postId: string;
  title: string;
  contents: ContentBlock[];
  nickName: string;
  profileUrl?: string;
  introduction?: string;
  createdAt: string;
  isOwner: boolean;
  comments: Comment[];
}

export interface PostListItem {
  postId: string;
  title: string;
  nickName: string;
  profileUrl?: string;
  createdAt: string;
  commentCount: number;
  contents?: ContentBlock[];
}

// 게시글 생성
export const createPost = async (body: PostBody): Promise<PostDetailResponse> => {
  const { data } = await api.post("/posts", body);
  return data.data;
};

// 게시글 수정
export const updatePost = async (
  id: string,
  body: PostBody
): Promise<PostDetailResponse> => {
  const { data } = await api.patch(`/posts/${id}`, body);
  return data.data;
};

/** 게시글 삭제 */
export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

export interface PostListResponse {
  posts: PostListItem[];
  pageMax: number;
}

// 게시글 전체 조회
export const getAllPosts = async (page: number): Promise<PostListResponse> => {
  const { data } = await api.get("/posts/all", {
    params: { size: 10, page },
  });
  return data.data;
};

//게시글 단일 조회
export const getPostById = async (postId: string): Promise<PostDetailResponse> => {
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = !!token;

  const endpoint = isLoggedIn ? "/posts/token" : "/posts";
  const config = {
    params: { postId },
  };

  const { data } = await api.get(endpoint, config);
  return data.data;
};