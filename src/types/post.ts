export type ContentType = "TEXT" | "IMAGE";

export interface PostContent {
  contentOrder: number;
  content: string;
  contentType: ContentType;
}

export interface Comment {
  commentId: number;
  content: string;
  nickName: string;
  profileUrl?: string; // ✅ 상세 조회 시 포함
  createdAt?: string; // ✅ 상세 조회 시 포함
  isOwner: boolean;
}

/** ✅ 게시글 목록 (/posts/all, /posts/all/token) 응답 구조 */
export interface ApiPost {
  postId: string;
  title: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  commentCount: number;
}

/** ✅ 게시글 상세 (/posts, /posts/token) 응답 구조 */
export interface Post extends ApiPost {
  contents: PostContent[];
  comments: Comment[];
  isOwner: boolean;
  introduction?: string; // ✅ 상세 조회 시 제공됨
}
