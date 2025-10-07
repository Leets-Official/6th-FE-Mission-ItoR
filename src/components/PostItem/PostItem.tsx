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
import { formatPostDate } from "@/utils/dateUtils"; // ✅ 추가

interface PostItemProps {
  post: Post;
  isLast?: boolean;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const firstTextContent = post.contents.find((c) => c.contentType === "TEXT")?.content;
  const firstImage = post.contents.find((c) => c.contentType === "IMAGE")?.content;

  return (
    <li className={listItem}>
      <div className="flex h-[166px] flex-1 flex-col justify-start">
        <div>
          <h2 className={postTitle}>{post.title}</h2>
          <p className={postContent}>{firstTextContent}</p>
        </div>

        <div className={`${postMeta} mt-auto mb-2`}>
          <Avatar src={post.profileUrl} size="sm" />
          <span className={postNickName}>{post.nickName}</span>
          <span>· {formatPostDate(post.createdAt)}</span> {/* ✅ 수정 */}
          <span>· 댓글 {post.comments.length}</span>
        </div>
      </div>

      {firstImage && (
        <img src={firstImage} alt={post.title} className={`${postImage} self-start`} />
      )}
    </li>
  );
};

export default PostItem;
