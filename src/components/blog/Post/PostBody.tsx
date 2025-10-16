import { FC } from 'react';

interface PostBodyProps {
  content: string;
  placeholder?: string;
  className?: string;
}

const PostBody: FC<PostBodyProps> = ({ content, placeholder = '', className = '' }) => {
  const isEmpty = !content || content.trim().length === 0;
  return (
    <div className={`flex w-full max-w-[688px] items-center justify-center gap-2.5 p-3 ${className}`}>
      <p className={`flex-1 text-sm font-light leading-[160%] tracking-[-0.07px] ${isEmpty ? 'text-gray-56' : 'text-gray-dark'}`}>
        {isEmpty ? placeholder : content}
      </p>
    </div>
  );
};

export default PostBody;
