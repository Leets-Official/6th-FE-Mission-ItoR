import { FC } from 'react';
import profileImage from '@/assets/profile.png';
import PostBody from '@/components/blog/Post/PostBody';
import Spacer from '@/components/common/Spacer/Spacer';
import Icon from '@/components/common/Icon/Icon';
import MoreVertIcon from '@/assets/icons/common/more_vert.svg?react';
import { formatCommentDate } from '@/utils/date';
import { CommentItemProps } from '@/components/blog/Comment/CommentTypes';
import { profileStyles, commentItemStyles } from '@/components/blog/Comment/Comment.styles';

const CommentItem: FC<CommentItemProps> = ({ commentId, content, nickName, profileUrl, createdAt, isOwner }) => {
  const styles = commentItemStyles();
  const profileStyle = profileStyles();

  return (
    <div className={styles.container()}>
      <div className={styles.header()}>
        <div className={styles.headerContent()}>
          <div className={styles.headerLayout()}>
            <div className={profileStyle.profileSection()}>
              <div className={profileStyle.profileImageWrapper()}>
                <img src={profileImage} alt="profile" className={profileStyle.profileImage()} />
              </div>
              <div className={profileStyle.userInfo()}>
                <span className={profileStyle.nickName()}>{nickName}</span>
                <span className={styles.date()}>{formatCommentDate(createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
        {isOwner && (
          <Icon size="md">
            <MoreVertIcon />
          </Icon>
        )}
      </div>
      <div className={styles.contentWrapper()}>
        <PostBody content={content} />
      </div>
      <Spacer height="sm" className="w-full" />
    </div>
  );
};

export default CommentItem;
