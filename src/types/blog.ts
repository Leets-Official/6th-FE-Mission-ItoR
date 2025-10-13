export interface ContentItem {
  contentOrder: number;
  content: string;
  contentType: 'TEXT' | 'IMAGE';
}

export interface Comment {
  commentId: number;
  content: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  isOwner: boolean;
}

export interface PostDetail {
  postId: number;
  title: string;
  contents: ContentItem[];
  isOwner: boolean;
  comments: Comment[];
  nickName: string;
  profileUrl: string;
  introduction: string;
  createdAt: string;
}

