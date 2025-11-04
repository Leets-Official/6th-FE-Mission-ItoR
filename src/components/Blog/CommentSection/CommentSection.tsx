import { useState, useEffect } from "react";
import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import TextField from "@/components/Text/TextField";
import Modal from "@/components/Modal/Modal";
import Toast from "@/components/Toast/Toast";
import * as S from "./CommentSection.styled";
import CommentItem from "./CommentItem";
import { CommentSectionProps } from "./CommentSection.types";
import { createComment, deleteComment, updateComment } from "@/api/commentApi";
import { useUserStore } from "@/store/useUserStore";
import api from "@/api/index";

interface CommentResponse {
  commentId: number;
  content: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  isOwner: boolean;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  profileUrl: string;
  isOwner: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  isLoggedIn,
  postAuthorProfile,
  postId,
}) => {
  const { user } = useUserStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const currentUserName = user?.nickname ?? "익명";

  const fetchComments = async (postId: string) => {
    try {
      const res = await api.get<{
        code: number;
        data: { comments: CommentResponse[] };
        message?: string;
      }>("/posts/token", { params: { postId } });

      if (res.data.code === 0 || res.data.code === 200) {
        const list: Comment[] =
          res.data.data.comments?.map((c) => ({
            id: c.commentId,
            author: c.nickName,
            content: c.content,
            date: new Date(c.createdAt).toLocaleDateString("ko-KR"),
            profileUrl: c.profileUrl ?? "",
            isOwner: c.isOwner,
          })) ?? [];
        setComments(list);
      } else {
        console.error("댓글 불러오기 실패:", res.data.message);
      }
    } catch (err) {
      console.error("댓글 조회 에러:", err);
    }
  };

  useEffect(() => {
    if (postId) fetchComments(postId);
  }, [postId]);

  const handleSubmit = async () => {
    if (!comment.trim() || !postId) return;
    try {
      const res = await createComment(postId, comment);
      if (res.code === 201) {
        setToast({ message: "댓글이 등록되었습니다.", type: "success" });
        setComment("");
        fetchComments(postId);
      } else {
        setToast({ message: res.message || "댓글 등록 실패", type: "error" });
      }
    } catch (error) {
      console.error("댓글 등록 오류:", error);
      setToast({ message: "댓글 등록 중 오류가 발생했습니다.", type: "error" });
    }
  };

  const handleDelete = async (commentId: number) => {
    try {
      const res = await deleteComment(commentId);
      if (res.code === 201) {
        setToast({ message: "댓글이 삭제되었습니다.", type: "success" });
        fetchComments(postId);
      } else {
        setToast({ message: res.message || "삭제 실패", type: "error" });
      }
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
      setToast({ message: "댓글 삭제 중 오류가 발생했습니다.", type: "error" });
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleEdit = async (commentId: number, newContent: string) => {
    try {
      const res = await updateComment(commentId, newContent);
      if (res.code === 201) {
        setToast({ message: "댓글이 수정되었습니다.", type: "success" });
        fetchComments(postId);
      } else {
        setToast({ message: res.message || "수정 실패", type: "error" });
      }
    } catch (error) {
      console.error("댓글 수정 오류:", error);
      setToast({ message: "댓글 수정 중 오류가 발생했습니다.", type: "error" });
    }
  };

  const isEmpty = !comment.trim();
  const isDisabled = !isLoggedIn || isEmpty;

  return (
    <>
      <section className={S.container}>
        <h2 className={S.title}>
          댓글 <span className={S.count}>{comments.length}</span>
        </h2>

        {comments.length > 0 && (
          <div className={S.commentList}>
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
                onEdit={(newContent) => handleEdit(c.id, newContent)}
              />
            ))}
          </div>
        )}

        {isLoggedIn ? (
          <div className={S.commentWrapper}>
            <div className={S.commentProfile}>
              <Avatar src={user?.profileUrl ?? postAuthorProfile} size="xs" />
              <p className={S.commentNick}>{currentUserName}</p>
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
                className={S.commentInput}
              />
              <div className={S.buttonWrapper}>
                <Button
                  label="등록"
                  onClick={handleSubmit}
                  disabled={isDisabled}
                  variant={isEmpty ? "tertiary" : "inverse"}
                  size="sm"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={S.emptyBox}>
            <p className={S.subText}>로그인 후 댓글을 작성해보세요!</p>
          </div>
        )}
      </section>

      <Modal
        title="댓글을 삭제할까요?"
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => targetCommentId && handleDelete(targetCommentId)}
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
