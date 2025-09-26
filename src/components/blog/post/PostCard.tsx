import { FC } from 'react';

interface PostCardProps {
  title: string;
  content?: string;
  className?: string;
}

const PostCard: FC<PostCardProps> = ({ title, content, className = '' }) => {
  return (
    <div className={`flex w-[688px] max-w-[688px] flex-col items-start justify-center gap-2 p-3 ${className}`}>
      <h3 className="self-stretch text-base font-medium leading-[160%] tracking-[-0.04px] text-black">{title}</h3>
      {content && (
        <p className="h-12 self-stretch overflow-hidden text-ellipsis whitespace-nowrap text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-dark">
          {content}
        </p>
      )}
    </div>
  );
};

export default PostCard;
