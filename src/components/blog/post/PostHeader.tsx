import { FC } from 'react';

interface PostHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PostHeader: FC<PostHeaderProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`flex w-[688px] max-w-[688px] p-3 flex-col justify-center items-start gap-3 ${className}`}>
      <h1 className="self-stretch text-black text-2xl font-medium leading-[160%]">{title}</h1>
      {subtitle && (
        <p className="self-stretch text-gray-dark text-sm font-light leading-[160%] tracking-[-0.07px]">{subtitle}</p>
      )}
    </div>
  );
};

export default PostHeader;
