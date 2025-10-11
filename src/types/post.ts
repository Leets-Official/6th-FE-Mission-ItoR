// src/types/post.ts

export type PostAuthor = {
  name: string;
  avatarInitial?: string;
  avatarSrc?: string;
  /** 상세 페이지에서만 쓰는 간단 소개 */
  bio?: string;
  /** 상세에서 쓰는 이니셜 */
  initial?: string;
};

export type Post = {
  id: number | string;
  title: string;
  excerpt?: string;
  date: string;
  author: PostAuthor;
  thumbnailUrl?: string;
  /** 상세 본문 */
  detail?: string;
  /** 댓글 수*/
  commentCount?: number;
};
