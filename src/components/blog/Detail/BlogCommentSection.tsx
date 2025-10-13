import { FC } from 'react';
import { tv } from 'tailwind-variants';
import Spacer from '@/components/common/Spacer/Spacer';
import CommentItem from '@/components/blog/Comment/CommentItem';
import { BLOG_TEXTS } from '@/constants';
import { Comment } from '@/types/blog';

interface BlogCommentSectionProps {
  comments: Comment[];
}

const blogCommentSection = tv({
  slots: {
    container: 'flex flex-col items-center self-stretch pb-14',
    header: 'flex w-full max-w-content items-start gap-10 bg-white px-4 pb-3 pt-4',
    headerInner: 'flex flex-1 flex-col items-start gap-10',
    titleWrapper: 'flex items-start gap-2',
    title: 'text-base font-medium text-black',
    count: 'text-base font-regular text-primary',
    noCommentsWrapper: 'flex w-full max-w-content items-center justify-center px-3 py-3',
    noCommentsText: 'flex-1 text-center text-sm font-light text-gray-78',
    commentsList: 'flex flex-col items-start gap-2.5',
    loginPromptWrapper: 'flex w-full max-w-content flex-col items-center justify-center gap-2.5 px-4 py-3',
    loginPromptInner: 'flex flex-col items-start gap-2.5 self-stretch rounded border border-gray-90 py-2',
    loginPromptTextWrapper: 'flex w-full items-center justify-center p-3',
    loginPromptText: 'flex h-[66px] flex-1 text-sm font-light text-gray-dark',
  },
});

const BlogCommentSection: FC<BlogCommentSectionProps> = ({ comments }) => {
  const styles = blogCommentSection();

  return (
    <div className={styles.container()}>
      <div className={styles.header()}>
        <div className={styles.headerInner()}>
          <div className={styles.titleWrapper()}>
            <span className={styles.title()}>{BLOG_TEXTS.COMMENTS.TITLE}</span>
            <span className={styles.count()}>{comments.length}</span>
          </div>
        </div>
      </div>
      <Spacer height="sm" className="w-full max-w-content" />
      {comments.length === 0 ? (
        <div className={styles.noCommentsWrapper()}>
          <p className={styles.noCommentsText()}>
            {BLOG_TEXTS.COMMENTS.NO_COMMENTS_LINE1}
            <br />
            {BLOG_TEXTS.COMMENTS.NO_COMMENTS_LINE2}
          </p>
        </div>
      ) : (
        <div className={styles.commentsList()}>
          {comments.map(comment => (
            <CommentItem
              key={comment.commentId}
              commentId={comment.commentId}
              content={comment.content}
              nickName={comment.nickName}
              profileUrl={comment.profileUrl}
              createdAt={comment.createdAt}
              isOwner={comment.isOwner}
            />
          ))}
        </div>
      )}
      <Spacer height="sm" className="w-full max-w-content" />
      <div className={styles.loginPromptWrapper()}>
        <div className={styles.loginPromptInner()}>
          <div className={styles.loginPromptTextWrapper()}>
            <p className={styles.loginPromptText()}>{BLOG_TEXTS.COMMENTS.LOGIN_PROMPT}</p>
          </div>
        </div>
      </div>
      <Spacer height="lg" className="w-full max-w-content" />
    </div>
  );
};

export default BlogCommentSection;

