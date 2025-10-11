import { FC } from 'react';

interface PostHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PostHeader: FC<PostHeaderProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`flex w-content max-w-content flex-col items-start justify-center gap-3 p-3 ${className}`}>
      <h1 className="self-stretch text-2xl font-medium text-black">{title}</h1>
      {subtitle && <p className="self-stretch text-sm font-light text-gray-dark">{subtitle}</p>}
    </div>
  );
};

export default PostHeader;
