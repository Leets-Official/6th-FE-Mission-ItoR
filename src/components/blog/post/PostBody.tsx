import { FC } from 'react';

interface PostBodyProps {
  content: string;
  className?: string;
}

const PostBody: FC<PostBodyProps> = ({ content, className = '' }) => {
  return (
    <div className={`flex w-[688px] max-w-[688px] p-3 justify-center items-center gap-2.5 ${className}`}>
      <p className="flex-1 text-gray-dark text-sm font-light leading-[160%] tracking-[-0.07px]">{content}</p>
    </div>
  );
};

export default PostBody;
