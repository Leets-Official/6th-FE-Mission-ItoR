import { FC } from 'react';
import { PostCard } from '@/components/blog/Post';
import MainPreviewImage from './MainPreviewImage';
import PostDetails from '@/components/blog/Post/PostDetails';

interface BlogPreviewCardProps {
  className?: string;
  title: string;
  content?: string;
  imageSrc?: string;
}

const BlogPreviewCard: FC<BlogPreviewCardProps> = ({ className = '', title = '', content, imageSrc }) => {
  return (
    <div className={`blog-preview-row ${className}`}>
      <div className="flex flex-col">
        <PostCard title={title} content={content} hasImage={Boolean(imageSrc)} />
        <PostDetails />
      </div>
      {imageSrc && <MainPreviewImage src={imageSrc} />}
    </div>
  );
};

export default BlogPreviewCard;
