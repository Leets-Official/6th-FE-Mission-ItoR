export interface ContentItem {
  contentOrder: number;
  content: string;
  contentType: 'TEXT' | 'IMAGE' | 'MARKDOWN';
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

// 게시물 생성
export interface CreatePostPayload {
  title: string;
  contents: ContentItem[];
}

// 에디터 모드 타입
export type EditorMode = 'basic' | 'markdown';

// 에디터 데이터 타입
export interface EditableBlock {
  id: string;
  type: 'text' | 'image';
  content: string;
  order: number;
}
