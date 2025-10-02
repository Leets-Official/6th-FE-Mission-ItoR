import BlogPreviewCard from '@/components/blog/Main/MainPreviewCard';
import Spacer from '@/components/common/Spacer/Spacer';
import { mockPosts } from '@/_mocks_/mockposts';

function MainPage() {
  return (
    <div>
      <Spacer height="md" />
      {mockPosts.map(post => (
        <BlogPreviewCard key={post.id} title={post.title} content={post.content} imageSrc={post.image} />
      ))}
    </div>
  );
}

export default MainPage;
