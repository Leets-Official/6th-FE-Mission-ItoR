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
export const createPost = async (body: PostBody): Promise<any> => {
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

  // 토큰이 유효한 경우에만 /posts/token 사용 (로그인 유저)
  if (token && token !== "undefined") {
    const { data } = await api.get("/posts/token", {
      params: { postId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  }

  // 토큰이 없거나 유효하지 않으면 /posts 사용 (비회원 유저)
  const { data } = await api.get("/posts", {
    params: { postId },
  });
  return data.data;
};