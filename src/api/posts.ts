import api from '@/api/axiosInstance';
import axios from 'axios';

export interface PostBody {
  title: string;
  contents: ContentBlock[];
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
  contentType: 'TEXT' | 'IMAGE';
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
  const { data } = await api.post('/posts', body);
  return data.data;
};

// 게시글 수정
export const updatePost = async (id: string, body: PostBody): Promise<PostDetailResponse> => {
  const { data } = await api.patch('/posts', body, {
    params: { postId: id },
  });
  return data.data;
};

/** 게시글 삭제 */

export const deletePost = async (id: string): Promise<void> => {
  await api.delete('/posts', { params: { postId: id } });
};

export interface PostListResponse {
  posts: PostListItem[];
  pageMax: number;
}

// 게시글 전체 조회
export const getAllPosts = async (page: number): Promise<PostListResponse> => {
  const { data } = await api.get('/posts/all', {
    params: { size: 10, page },
  });
  return data.data;
};

//게시글 단일 조회
export const getPostById = async (postId: string): Promise<PostDetailResponse> => {
  const token = localStorage.getItem('accessToken');
  const isLoggedIn = !!token;

  const endpoint = isLoggedIn ? '/posts/token' : '/posts';
  const config = {
    params: { postId },
  };

  const { data } = await api.get(endpoint, config);
  return data.data;
};

export interface CommentBody {
  content: string;
}

// 댓글 생성
export const createComment = async ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}): Promise<Comment> => {
  const { data } = await api.post(`/comments/${postId}`, { content });
  return data.data;
};

// 댓글 삭제

export const deleteComment = async (commentId: string): Promise<void> => {
  await api.delete(`/comments/${commentId}`);
};

// 내 게시글 조회

export const getMyPosts = async (page: number, size: number): Promise<PostListResponse> => {
  const { data } = await api.get('/posts/all/token', {
    params: { size, page },
  });

  return data.data;
};

// --- Image Upload Functions ---

export const getPreSignedUrl = async (fileName: string): Promise<string> => {
  const response = await api.get('/images/presigned-url', {
    params: { fileName },
  });
  return response.data.data;
};

export const uploadImageToPreSignedUrl = async (
  preSignedUrl: string,
  file: File
): Promise<void> => {
  await axios.put(preSignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};
