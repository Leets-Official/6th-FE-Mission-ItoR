import { FC } from 'react';
import { tv } from 'tailwind-variants';
import profileImage from '@/assets/profile.png';

interface CommentInputProps {
  nickName: string;
  onSubmit?: (content: string) => void;
}

const commentInput = tv({
  slots: {
    container: 'flex w-full max-w-content flex-col items-start',
    profileSection: 'flex items-start gap-1.5',
    profileImageWrapper: 'flex aspect-square h-5 w-5 items-center gap-2.5 overflow-hidden rounded-full',
    profileImage: 'h-full w-full object-cover',
    userInfo: 'flex flex-col items-start justify-center',
    nickName: 'text-sm font-regular text-gray-20',
  },
});

const CommentInput: FC<CommentInputProps> = ({ nickName, onSubmit }) => {
  const styles = commentInput();

  return (
    <div className={styles.container()}>
      <div className={styles.profileSection()}>
        <div className={styles.profileImageWrapper()}>
          <img src={profileImage} alt="profile" className={styles.profileImage()} />
        </div>
        <div className={styles.userInfo()}>
          <span className={styles.nickName()}>{nickName}</span>
        </div>
      </div>
      {/* 입력창 영역 */}
    </div>
  );
};

export default CommentInput;

