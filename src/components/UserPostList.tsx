import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '@/assets/svgs/Profile.svg?react';
import { PostListItem } from '@/api/posts';
import { S } from '@/styles/ProfileDetail.styles';

interface UserPostListProps {
  posts: PostListItem[];
}

const UserPostList: React.FC<UserPostListProps> = ({ posts }) => {
  const navigate = useNavigate();

  if (posts.length === 0) {
    return <p className={S.noPostsText}>작성한 게시글이 없습니다.</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.postId}
          onClick={() => navigate(`/post/${post.postId}`)}
          className={S.postItemContainer}
        >
          <div className={S.postItemTextWrapper}>
            <h2 className={S.postItemTitle}>{post.title}</h2>
            <p className={S.postItemContent}>{post.contents?.[0]?.content || ''}</p>
            <div className={S.postItemMeta}>
              {post.profileUrl ? (
                <img src={post.profileUrl} alt={post.nickName} className={S.postItemProfileIcon} />
              ) : (
                <ProfileIcon className={S.postItemProfileIcon} />
              )}
              <span>{post.nickName}</span>
              <span>· {new Date(post.createdAt).toLocaleDateString()}</span>
              <span>· 댓글 {post.commentCount}</span>
            </div>
          </div>
          {post.contents?.find((c) => c.contentType === 'IMAGE')?.content && (
            <img
              src={post.contents.find((c) => c.contentType === 'IMAGE')?.content}
              alt="thumbnail"
              className={S.postItemThumbnail}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default UserPostList;
