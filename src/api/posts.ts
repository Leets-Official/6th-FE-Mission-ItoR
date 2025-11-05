import api from "@/api/axiosInstance";

export interface PostBody {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface PostResponse {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}

/** 게시글 생성 */
export const createPost = async (body: PostBody): Promise<PostResponse> => {
  const { data } = await api.post("/posts", body);
  return data.data; // Swagger 구조가 data.data 임
};

/** 게시글 수정 */
export const updatePost = async (id: number, body: PostBody): Promise<PostResponse> => {
  const { data } = await api.patch(`/posts/${id}`, body);
  return data.data;
};

/** 게시글 삭제 */
export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

/** 게시글 전체 조회 */
export const getAllPosts = async (): Promise<PostResponse[]> => {
  const { data } = await api.get("/posts");
  return data.data;
};

/** 게시글 단일 조회 */
export const getPostById = async (id: number): Promise<PostResponse> => {
  const { data } = await api.get(`/posts/${id}`);
  return data.data;
};
