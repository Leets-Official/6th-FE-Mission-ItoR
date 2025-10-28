import Avatar from "@/components/Avatar/Avatar";
import { Post } from "@/types/post";
import { formatPostDate } from "@/utils/dateUtils";
import {
  listItem,
  upperWrapper,
  textSection,
  postTitle,
  postContent,
  postMeta,
  postNickName,
  postImage,
} from "./PostItem.styled";

interface PostItemProps {
  post: Post;
  isLast?: boolean;
  onClick?: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onClick }) => {
  const firstTextContent = post.contents.find((c) => c.contentType === "TEXT")?.content;
  const firstImage = post.contents.find((c) => c.contentType === "IMAGE")?.content;

  return (
    <li className={`${listItem} cursor-pointer`} onClick={onClick}>
      <div className={upperWrapper}>
        <div className={textSection}>
          <h2 className={postTitle}>{post.title}</h2>
          <p className={postContent}>{firstTextContent}</p>
        </div>
        {firstImage && <img src={firstImage} alt={post.title} className={postImage} />}
      </div>

      <div className={postMeta}>
        <Avatar src={post.profileUrl} size="xs" />
        <span className={postNickName}>{post.nickName}</span>
        <span>· {formatPostDate(post.createdAt)}</span>
        <span>· 댓글 {post.comments.length}</span>
      </div>
    </li>
  );
};

export default PostItem;
