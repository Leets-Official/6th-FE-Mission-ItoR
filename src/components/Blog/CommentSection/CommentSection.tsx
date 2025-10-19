import { useState } from "react";
import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import TextField from "@/components/Text/TextField";
import Modal from "@/components/Modal/Modal";
import * as S from "./CommentSection.styled";
import { CommentSectionProps } from "./CommentSection.types";
import CommentItem from "./CommentItem";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  profileUrl: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  isLoggedIn,
  onSubmit,
  postAuthorProfile,
  postAuthorName,
}) => {
  const [comment, setComment] = useState("");
  const currentUserName = "내닉네임";

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "닉네임",
      content: "이 글 정말 좋네요! 다음 글도 기대할게요 😊",
      date: "Feb 17. 2025.",
      profileUrl: "https://i.pravatar.cc/40?img=3",
    },
    {
      id: 2,
      author: currentUserName,
      content: "감사합니다! 다음엔 더 좋은 글로 찾아뵐게요 🙏",
      date: "Feb 17. 2025.",
      profileUrl: postAuthorProfile,
    },
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: comments.length + 1,
      author: currentUserName,
      content: comment,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      profileUrl: postAuthorProfile,
    };

    setComments((prev) => [...prev, newComment]);
    onSubmit(comment);
    setComment("");
  };

  const handleDeleteComment = (id: number) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
    setIsDeleteModalOpen(false);
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
                isOwner={c.author === currentUserName}
                isLoggedIn={isLoggedIn}
                onDelete={() => {
                  setTargetCommentId(c.id);
                  setIsDeleteModalOpen(true);
                }}
              />
            ))}
          </div>
        )}

        <div className={S.commentInputSection}>
          {!isLoggedIn ? (
            <div className={S.emptyBox}>
              <p className={S.subText}>작성된 댓글이 없습니다.</p>
              <p className={S.subText}>응원의 첫 번째 댓글을 달아주세요.</p>
              <div className={S.emptyTextarea}>로그인을 하고 댓글을 달아보세요!</div>
            </div>
          ) : (
            <div className={S.commentWrapper}>
              <div className={S.commentProfile}>
                <Avatar src={postAuthorProfile} size="xs" />
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
          )}
        </div>
      </section>

      <Modal
        title="댓글을 삭제할까요?"
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => targetCommentId && handleDeleteComment(targetCommentId)}
        confirmText="삭제하기"
        cancelText="취소"
        confirmColor="bg-brand-red text-white hover:opacity-90"
      ></Modal>

      <div className={S.footerWrapper}>
        <div className={S.footerProfile}>
          <Avatar src={postAuthorProfile} size="md" />
          <div className="flex flex-col items-center">
            <p className={S.footerNick}>{postAuthorName}</p>
            <p className={S.footerIntro}>(한 줄 소개)</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentSection;
