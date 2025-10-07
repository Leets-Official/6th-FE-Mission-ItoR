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

export const fetchPosts = async (page: number, size: number = 10) => {
  const res = await api.get<PostResponse>("/posts/all", { params: { page, size } });
  return res.data;
};
