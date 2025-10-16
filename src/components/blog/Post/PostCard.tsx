import { FC, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { postCardVariants, postTitleVariants, postContentVariants } from './PostCardVariants';

interface PostCardProps {
  title: string;
  content?: string;
  className?: string;
  hasImage?: boolean;
  renderTitle?: ReactNode;
}

const PostCard: FC<PostCardProps> = ({ title, content, className, hasImage = false, renderTitle }) => {
  return (
    <div className={cn(postCardVariants({ hasImage }), className)}>
      {renderTitle ? renderTitle : <h3 className={postTitleVariants()}>{title}</h3>}
      {content && <p className={postContentVariants()}>{content}</p>}
    </div>
  );
};

export default PostCard;
