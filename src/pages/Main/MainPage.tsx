import BlogPreviewCard from '@/components/blog/Main/MainPreviewCard';
import Spacer from '@/components/common/Spacer/Spacer';
import { mockPosts } from '@/_mocks_/posts';

function MainPage() {
  return (
    <div className="min-h-screen mx-auto max-w-6xl px-4 py-8">
      <Spacer height="md" />
      
      {mockPosts.map((post) => (
        <BlogPreviewCard 
          key={post.id}
          title={post.title}
          content={post.content}
          imageSrc={post.image}
        />
      ))}
    </div>
  );
}

export default MainPage;
