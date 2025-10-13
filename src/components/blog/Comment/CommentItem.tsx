import { FC } from 'react';
import { tv } from 'tailwind-variants';
import profileImage from '@/assets/profile.png';
import PostBody from '@/components/blog/Post/PostBody';
import Spacer from '@/components/common/Spacer/Spacer';

interface CommentItemProps {
  commentId: number;
  content: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  isOwner: boolean;
}

const commentItem = tv({
  slots: {
    container: 'flex w-full max-w-content flex-col items-start',
    header: 'flex items-center self-stretch',
    headerContent: 'flex w-full flex-col items-start gap-10 px-4 py-3',
    profileSection: 'flex items-start gap-1.5',
    profileImageWrapper: 'flex aspect-square h-5 w-5 items-center gap-2.5 overflow-hidden rounded-full',
    profileImage: 'h-full w-full object-cover',
    userInfo: 'flex flex-col items-start justify-center',
    nickName: 'text-sm font-regular text-gray-20',
    date: 'text-xs font-light text-gray-56',
    contentWrapper: 'flex flex-col items-start self-stretch pl-[26px]',
  },
});

const CommentItem: FC<CommentItemProps> = ({ commentId, content, nickName, profileUrl, createdAt, isOwner }) => {
  const styles = commentItem();

  return (
    <div className={styles.container()}>
      <div className={styles.header()}>
        <div className={styles.headerContent()}>
          <div className={styles.profileSection()}>
            <div className={styles.profileImageWrapper()}>
              <img src={profileImage} alt="profile" className={styles.profileImage()} />
            </div>
            <div className={styles.userInfo()}>
              <span className={styles.nickName()}>{nickName}</span>
              <span className={styles.date()}>{createdAt}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contentWrapper()}>
        <PostBody content={content} />
      </div>
      <Spacer height="sm" className="w-full" />
    </div>
  );
};

export default CommentItem;
