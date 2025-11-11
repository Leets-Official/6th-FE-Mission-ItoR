import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import TextField from "@/components/Text/TextField";
import Modal from "@/components/Modal/Modal";
import Toast from "@/components/Toast/Toast";
import * as S from "./CommentSection.styled";
import CommentItem from "./CommentItem";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";
import { useComments } from "@/hooks/useComments";

interface CommentSectionProps {
  isLoggedIn: boolean;
  postId: string;
  postAuthorProfile: string;
  postAuthorName: string;
  onLoginClick?: () => void;
  onSubmit?: (comment: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  isLoggedIn,
  postAuthorProfile,
  postId,
}) => {
  const { user } = useUserStore();
  const { comments, addComment, editComment, removeComment } = useComments(postId);

  const [comment, setComment] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    await addComment(comment);
    setComment("");
    setToast({ message: "댓글이 등록되었습니다.", type: "success" });
  };

  const handleDelete = async () => {
    if (!targetCommentId) return;
    await removeComment(targetCommentId);
    setToast({ message: "댓글이 삭제되었습니다.", type: "success" });
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <section className={S.container}>
        <h2 className={S.title}>
          댓글 <span className={S.count}>{comments.length}</span>
        </h2>

        {comments.map((c) => (
          <CommentItem
            key={c.id}
            author={c.author}
            date={c.date}
            content={c.content}
            profileUrl={c.profileUrl}
            isOwner={c.isOwner}
            isLoggedIn={isLoggedIn}
            onDelete={() => {
              setTargetCommentId(c.id);
              setIsDeleteModalOpen(true);
            }}
            onEdit={(newContent) => editComment(c.id, newContent)}
          />
        ))}

        {isLoggedIn ? (
          <div className={S.commentWrapper}>
            <div className={S.commentProfile}>
              <Avatar src={user?.profileUrl ?? postAuthorProfile} size="xs" />
              <p className={S.commentNick}>{user?.nickname ?? "익명"}</p>
            </div>
            <div className={S.commentBox}>
              <TextField
                placeholder="댓글을 입력하세요."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="borderless"
                size="md"
                fullWidth
                multiline
              />
              <Button
                label="등록"
                onClick={handleSubmit}
                disabled={!comment.trim()}
                variant={comment.trim() ? "inverse" : "tertiary"}
                size="sm"
              />
            </div>
          </div>
        ) : (
          <p className={S.subText}>로그인 후 댓글을 작성해보세요!</p>
        )}
      </section>

      <Modal
        title="댓글을 삭제할까요?"
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        confirmText="삭제하기"
        cancelText="취소"
        confirmColor="bg-brand-red text-white hover:opacity-90"
      />

      {toast && (
        <div className="fixed top-[90px] left-1/2 z-[9999] -translate-x-1/2 transform">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </>
  );
};

export default CommentSection;
