import React from "react";
import Avatar from "@/components/Avatar/Avatar";
import { Post } from "@/types/post";
import {
  listItem,
  postTitle,
  postContent,
  postMeta,
  postNickName,
  postImage,
} from "./PostItem.styled";

interface PostItemProps {
  post: Post;
  isLast?: boolean;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const firstTextContent = post.contents.find((c) => c.contentType === "TEXT")?.content;
  const firstImage = post.contents.find((c) => c.contentType === "IMAGE")?.content;

  return (
    <li className={listItem}>
      <div className="flex flex-1 flex-col">
        <h2 className={postTitle}>{post.title}</h2>
        <p className={postContent}>{firstTextContent}</p>
        <div className={postMeta}>
          <Avatar src={post.profileUrl} size="sm" />
          <span className={postNickName}>{post.nickName}</span>
          <span>
            ·{" "}
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>· 댓글 {post.comments.length}</span>
        </div>
      </div>

      {firstImage && <img src={firstImage} alt={post.title} className={postImage} />}
    </li>
  );
};

export default PostItem;
