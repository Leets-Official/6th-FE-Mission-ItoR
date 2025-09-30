import api from "./index";

export interface PostResponse {
  code: number;
  message: string;
  data: {
    post: Post[];
    pageMax: number;
  };
}

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

export const fetchPosts = async (page: number, size: number = 10) => {
  const res = await api.get<PostResponse>("/posts/all", { params: { page, size } });
  return res.data;
};
