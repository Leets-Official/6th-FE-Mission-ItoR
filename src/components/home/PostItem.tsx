import React from "react";
import { Link } from "react-router-dom";
import type { Post } from "../../types/post";

function TinyAvatar({ initial = "N" }: { initial?: string }) {
  return (
    <div className="w-5 h-5 rounded-full bg-gray-7 flex items-center justify-center text-white text-[10px] leading-[10px]">
      {initial}
    </div>
  );
}

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <li className="py-5 md:py-6">
      <Link to={`/post/${post.id}`} className="grid grid-cols-[1fr_auto] gap-4 group">
        <div className="min-w-0">
          <div className="flex items-start gap-4 py-2">
            <h3 className="text-[16px] md:text-[18px] leading-[1.6] font-medium tracking-[-0.04px] text-black group-hover:underline">
              {post.title}
            </h3>
          </div>
          <p className="h-12 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[#555]">
            {post.excerpt}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <TinyAvatar initial={post.author.avatarInitial} />
            <span className="text-[12px] leading-[19.2px] text-gray-20">{post.author.name}</span>
            <span className="text-[12px] leading-[19.2px] text-gray-56">· {post.date}</span>
            <span className="text-[12px] leading-[19.2px] text-gray-56">· 댓글0</span>
          </div>
        </div>

        {post.thumbnailUrl && (
          <img
            src={post.thumbnailUrl}
            alt=""
            className="w-[124px] h-[116px] rounded-[2px] object-cover flex-shrink-0"
            loading="lazy"
          />
        )}
      </Link>
    </li>
  );
};

export default PostItem;
