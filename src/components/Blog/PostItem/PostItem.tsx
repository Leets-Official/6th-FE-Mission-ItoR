import Avatar from "@/components/Avatar/Avatar";
import { Post } from "@/types/post";
import { useNavigate } from "react-router-dom";
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
import { formatPostDate } from "@/utils/dateUtils";

interface PostItemProps {
  post: Post;
  isLast?: boolean;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const navigate = useNavigate();
  const firstTextContent = post.contents.find((c) => c.contentType === "TEXT")?.content;
  const firstImage = post.contents.find((c) => c.contentType === "IMAGE")?.content;

  const handleClick = () => {
    navigate(`/blog/${post.postId}`);
  };

  return (
    <li className={`${listItem} cursor-pointer`} onClick={handleClick}>
      {/* 제목 + 본문 + 이미지 */}
      <div className={upperWrapper}>
        <div className={textSection}>
          <h2 className={postTitle}>{post.title}</h2>
          <p className={postContent}>{firstTextContent}</p>
        </div>

        {firstImage && <img src={firstImage} alt={post.title} className={postImage} />}
      </div>

      {/* 닉네임/날짜/댓글 */}
      <div className={postMeta}>
        <Avatar src={post.profileUrl} size="sm" />
        <span className={postNickName}>{post.nickName}</span>
        <span>· {formatPostDate(post.createdAt)}</span>
        <span>· 댓글 {post.comments.length}</span>
      </div>
    </li>
  );
};

export default PostItem;
