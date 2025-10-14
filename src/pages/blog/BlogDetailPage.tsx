import { useParams } from 'react-router-dom';
import BlogPostSection from '@/components/blog/Detail/BlogPostSection';
import BlogCommentSection from '@/components/blog/Detail/BlogCommentSection';
import BlogAuthorSection from '@/components/blog/Detail/BlogAuthorSection';
import { mockPostDetail, mockPostDetailNoComments, mockPostDetailWithMyComments } from '@/_mocks_/mockPostDetail';
import Spacer from '@/components/common/Spacer/Spacer';
import { useAuthStore } from '@/stores/useAuthStore';

const BlogDetailPage = () => {
  const { id } = useParams();
  const { isLoggedIn, user } = useAuthStore();
  const postData = id === '998' ? mockPostDetailNoComments : id === '997' ? mockPostDetailWithMyComments : mockPostDetail;

  return (
    <>
      <BlogPostSection title={postData.title} contents={postData.contents} />
      <BlogCommentSection
        comments={postData.comments}
        isLoggedIn={isLoggedIn}
        currentUserNickName={user?.nickName || 'User'}
      />
      <BlogAuthorSection nickName={postData.nickName} introduction={postData.introduction} />
      <Spacer height="custom" />
    </>
  );
};

export default BlogDetailPage;
