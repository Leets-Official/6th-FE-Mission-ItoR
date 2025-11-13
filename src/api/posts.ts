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

// 게시글 생성
export const createPost = async (body: PostBody): Promise<any> => {
  const { data } = await api.post("/posts", body);
  return data.data;
};

// 게시글 수정
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

export interface PostListResponse {
  posts: PostResponse[];
  pageMax: number;
}

// 게시글 전체 조회
export const getAllPosts = async (page: number): Promise<PostListResponse> => {
  const { data } = await api.get("/posts/all", {
    params: { size: 10, page },
  });
  return data.data;  // posts만이 아니라 { posts, pageMax } 전체 반환
};

//게시글 단일 조회
export const getPostById = async (postId: string): Promise<PostResponse> => {
  const token = localStorage.getItem("accessToken");

  // 토큰이 있으면 /posts/token 사용 (로그인 유저)
  if (token) {
    const { data } = await api.get("/posts/token", {
      params: { postId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  }

  // 토큰이 없으면 /posts 사용 (비회원 유저)
  const { data } = await api.get("/posts", {
    params: { postId },
  });
  return data.data;
};