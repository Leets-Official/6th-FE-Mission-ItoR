import { FC } from 'react';

interface PostBodyProps {
  content: string;
  className?: string;
}

const PostBody: FC<PostBodyProps> = ({ content, className = '' }) => {
  return (
    <div className={`flex w-full max-w-[688px] items-center justify-center gap-2.5 p-3 ${className}`}>
      <p className="flex-1 text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-dark">{content}</p>
    </div>
  );
};

export default PostBody;
