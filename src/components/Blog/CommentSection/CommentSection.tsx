import { useState } from "react";
import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import TextField from "@/components/Text/TextField";
import * as S from "./CommentSection.styled";
import { CommentSectionProps } from "./CommentSection.types";
import { subText } from "./CommentSection.styled";

const CommentSection: React.FC<CommentSectionProps> = ({
  isLoggedIn,
  onSubmit,
  postAuthorProfile,
  postAuthorName,
}) => {
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(0);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit(comment);
    setComment("");
    setCommentCount((prev) => prev + 1);
  };

  const isEmpty = !comment.trim();
  const isDisabled = !isLoggedIn || isEmpty;

  return (
    <>
      <section className={S.container}>
        <h2 className={S.title}>
          댓글 <span className={S.count}>{commentCount}</span>
        </h2>

        {!isLoggedIn ? (
          <div className={S.emptyBox}>
            <p className={S.subText}>작성된 댓글이 없습니다.</p>
            <p className={S.subText}>응원의 첫 번째 댓글을 달아주세요.</p>
            <div className={S.emptyTextarea}>로그인을 하고 댓글을 달아보세요!</div>
          </div>
        ) : (
          <div className={S.commentWrapper}>
            <Avatar src={postAuthorProfile} size="sm" />
            <div className={S.commentBox}>
              <p className={S.commentNick}>{postAuthorName}</p>

              <TextField
                placeholder="댓글을 입력하세요."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="default"
                size="md"
                fullWidth
                multiline
                className={`${S.commentInput} ${isEmpty ? "bg-brand-bgGray" : "bg-white"}`}
              />

              <div className="flex justify-end">
                <Button
                  label="등록"
                  onClick={handleSubmit}
                  disabled={isDisabled}
                  className={`h-[40px] w-[64px] rounded-md text-sm font-medium transition-colors ${
                    !isDisabled
                      ? "bg-brand-black text-white"
                      : "bg-brand-lightGray text-brand-gray cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        <div className={S.divider} />
      </section>

      <div className={S.footerWrapper}>
        <div className={S.footerProfile}>
          <Avatar src={postAuthorProfile} size="lg" />
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
