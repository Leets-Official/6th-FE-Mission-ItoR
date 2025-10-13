import BlogPreviewCard from '@/components/blog/Main/MainPreviewCard';
import Spacer from '@/components/common/Spacer/Spacer';
import { mockPosts } from '@/_mocks_/mockposts';
import { mockPostDetail } from '@/_mocks_/mockPostDetail';

const MainPage = () => {
  // mockPostDetail에서 첫 번째 TEXT와 IMAGE 추출
  const firstText = mockPostDetail.contents.find(c => c.contentType === 'TEXT')?.content || '';
  const firstImage = mockPostDetail.contents.find(c => c.contentType === 'IMAGE')?.content || '';
  
  return (
    <div>
      <Spacer height="md" />
      
      {/* 테스트용 고정 포스트 */}
      <BlogPreviewCard 
        key={mockPostDetail.postId} 
        id={mockPostDetail.postId}
        title={mockPostDetail.title} 
        content={firstText.substring(0, 100) + '...'} 
        imageSrc={firstImage} 
      />
      
      {/* 랜덤 생성 포스트들 */}
      {mockPosts.map(post => (
        <BlogPreviewCard 
          key={post.id} 
          id={post.id}
          title={post.title} 
          content={post.content} 
          imageSrc={post.image} 
        />
      ))}
    </div>
  );
};

export default MainPage;
