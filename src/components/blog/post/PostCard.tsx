import { FC } from 'react';
import { cn } from '@/utils/cn';
import { postCardVariants, postTitleVariants, postContentVariants } from './PostCardVariants';

interface PostCardProps {
  title: string;
  content?: string;
  className?: string;
  hasImage?: boolean;
}

const PostCard: FC<PostCardProps> = ({ title, content, className, hasImage = false }) => {
  return (
    <div className={cn(postCardVariants({ hasImage }), className)}>
      <h3 className={postTitleVariants()}>{title}</h3>
      {content && <p className={postContentVariants()}>{content}</p>}
    </div>
  );
};

export default PostCard;
