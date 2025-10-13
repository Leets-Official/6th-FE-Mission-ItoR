import { useParams } from 'react-router-dom';
import BlogPostSection from '@/components/blog/Detail/BlogPostSection';
import BlogCommentSection from '@/components/blog/Detail/BlogCommentSection';
import BlogAuthorSection from '@/components/blog/Detail/BlogAuthorSection';
import { mockPostDetail, mockPostDetailNoComments } from '@/_mocks_/mockPostDetail';

const BlogDetailPage = () => {
  const { id } = useParams();
  const postData = id === '998' ? mockPostDetailNoComments : mockPostDetail;

  return (
    <>
      <BlogPostSection title={postData.title} contents={postData.contents} />
      <BlogCommentSection comments={postData.comments} />
      <BlogAuthorSection nickName={postData.nickName} introduction={postData.introduction} />
    </>
  );
};

export default BlogDetailPage;
