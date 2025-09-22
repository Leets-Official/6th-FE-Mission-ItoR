import React from 'react';

interface PostCardProps {
  title: string;
  content?: string;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, content, className = '' }) => {
  return (
    <div className={`flex w-[688px] max-w-[688px] p-3 flex-col justify-center items-start gap-2 ${className}`}>
      <h3 className="self-stretch text-black text-base font-medium leading-[160%] tracking-[-0.04px]">{title}</h3>
      {content && (
        <p className="self-stretch h-12 text-gray-dark text-sm font-light leading-[160%] tracking-[-0.07px] overflow-hidden text-ellipsis whitespace-nowrap">
          {content}
        </p>
      )}
    </div>
  );
};

export default PostCard;
