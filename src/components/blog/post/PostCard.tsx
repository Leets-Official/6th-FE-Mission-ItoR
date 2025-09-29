import { FC } from 'react';

interface PostCardProps {
  title: string;
  content?: string;
  className?: string;
}

const PostCard: FC<PostCardProps> = ({ title, content, className = '' }) => {
  return (
    <div className={`flex max-w-content px-4 py-3 flex-col justify-center items-start gap-2 self-stretch ${className}`}>
      <h3 className="self-stretch text-base font-medium leading-[160%] tracking-[-0.08px] text-black overflow-hidden text-ellipsis whitespace-nowrap">{title}</h3>
      {content && (
        <p className="h-12 self-stretch overflow-hidden text-ellipsis text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-dark line-clamp-2">
          {content}
        </p>
      )}
    </div>
  );
};

export default PostCard;
