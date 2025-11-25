// src/pages/Blogfind/components/PostList.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard";
import { PostListItem } from "@api/posts";
import { S } from "@/styles/Blogfind.styles";

interface PostListProps {
  posts: PostListItem[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <div className={S.postListContainer}>
      {posts.length > 0 ? (
        posts.map((post: PostListItem) => {
          const imageBlock = post.contents?.find(
            (c) => c.contentType === "IMAGE"
          );
          const textPreview =
            post.contents
              ?.filter((c) => c.contentType === "TEXT")
              .map((c) => c.content)
              .join(" ")
              .replace(/<[^>]*>?/gm, "") || "내용이 없습니다.";

          return (
            <div
              key={post.postId}
              className={S.postItemWrapper}
              onClick={() => navigate(`/post/${post.postId}`)}
            >
              <PostCard
                post={{
                  id: post.postId,
                  title: post.title,
                  content: textPreview,
                  author: post.nickName,
                  createdAt: post.createdAt,
                  commentsCount: post.commentCount,
                  profileUrl: post.profileUrl,
                  photoUrl: imageBlock?.content,
                }}
              />
            </div>
          );
        })
      ) : (
        <p className={S.noPosts}>게시글이 없습니다.</p>
      )}
    </div>
  );
};

export default PostList;
