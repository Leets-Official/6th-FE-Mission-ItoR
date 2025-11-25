// src/components/CommentForm.tsx
import React from "react";
import Button from "./Button";
import ProfileIcon from "@/assets/svgs/Profile.svg?react";
import LineEnd from "@/assets/svgs/LineEnd.svg?react";
import { S } from "@/styles/BlogDetail.styles";

interface CommentFormProps {
  isLoggedIn: boolean;
  commentText: string;
  setCommentText: (text: string) => void;
  isSubmitDisabled: boolean;
  onSubmit: () => void;
  loggedInUser: {
    nickname: string | null;
    profilePicture: string | null;
  };
}

const CommentForm: React.FC<CommentFormProps> = ({
  isLoggedIn,
  commentText,
  setCommentText,
  isSubmitDisabled,
  onSubmit,
  loggedInUser,
}) => {
  return (
    <div className={S.commentFormContainer}>
      {isLoggedIn ? (
        <>
          <div className={S.commentFormHeader}>
            {loggedInUser.profilePicture ? (
              <img
                src={loggedInUser.profilePicture}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <ProfileIcon className="w-8 h-8" />
            )}
            <span className={S.commentFormAuthor}>{loggedInUser.nickname}</span>
          </div>
          <textarea
            placeholder="댓글을 입력하세요."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className={S.commentFormTextarea}
          />
          <LineEnd />
          <div className={S.commentFormFooter}>
            <Button
              variant={isSubmitDisabled ? "grayBorder" : "blackWhite"}
              onClick={onSubmit}
              disabled={isSubmitDisabled}
            >
              등록
            </Button>
          </div>
        </>
      ) : (
        <div className={S.commentFormLoginPrompt}>
          로그인 후 댓글을 작성할 수 있습니다.
        </div>
      )}
    </div>
  );
};

export default CommentForm;
