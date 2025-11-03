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
  isOwner: boolean;
}

export interface ApiPost {
  postId: string;
  title: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  commentCount: number;
}

export interface Post extends ApiPost {
  contents?: PostContent[]; // optional
  comments?: Comment[]; // optional
  isOwner?: boolean;
}
