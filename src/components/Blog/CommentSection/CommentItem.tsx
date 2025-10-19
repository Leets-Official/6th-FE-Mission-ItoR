import Avatar from "@/components/Avatar/Avatar";
import { MoreVertIcon } from "@/assets/icons";
import * as S from "./CommentSection.styled";
import { CommentItemProps } from "./CommentItem.types";

const CommentItem: React.FC<CommentItemProps> = ({ author, date, content, profileUrl }) => {
  return (
    <div className={S.commentItemWrapper}>
      <Avatar src={profileUrl} size="xs" />
      <div className={S.commentItemContent}>
        <div className={S.commentHeader}>
          <div className={S.commentMeta}>
            <p className={S.commentNick}>{author}</p>
            <span className={S.commentDate}>{date}</span>
          </div>
          <button type="button" className={S.commentMenuButton} aria-label="댓글 메뉴">
            <MoreVertIcon width={18} height={18} />
          </button>
        </div>

        <p className={S.commentText}>{content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
