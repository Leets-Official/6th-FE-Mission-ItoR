export interface CommentItemProps {
  commentId: number;
  content: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  isOwner: boolean;
}

export interface CommentInputProps {
  nickName: string;
  onSubmit?: (content: string) => void;
}
