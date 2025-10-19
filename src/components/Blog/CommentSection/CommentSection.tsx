import { useState } from "react";
import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import * as S from "./CommentSection.styled";
import { CommentSectionProps } from "./CommentSection.types";

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

  const isDisabled = !isLoggedIn || !comment.trim();

  return (
    <>
      <section className={S.container}>
        <h2 className={S.title}>
          댓글 <span className={S.count}>{commentCount}</span>
        </h2>

        {!isLoggedIn ? (
          <div className={S.emptyBox}>
            <p className={S.emptyText}>작성된 댓글이 없습니다.</p>
            <p className={S.subText}>응원의 첫 번째 댓글을 달아주세요.</p>
            <div className={S.loginPrompt}>로그인을 하고 댓글을 달아보세요!</div>
          </div>
        ) : (
          <div className={S.commentWrapper}>
            <Avatar src="https://i.pravatar.cc/40?img=15" size="sm" />
            <div className={S.commentBox}>
              <p className={S.commentNick}>{postAuthorName}</p>

              {/* ✅ 넓은 textarea */}
              <textarea
                placeholder="댓글을 입력하세요."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={S.commentInput}
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
            <p className={S.footerNick}>%{postAuthorName}</p>
            <p className={S.footerIntro}>%{`(한 줄 소개)`}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentSection;
