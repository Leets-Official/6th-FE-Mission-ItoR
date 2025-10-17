import { useState, useEffect } from 'react';
import BlogPreviewCard from '@/components/blog/Main/MainPreviewCard';
import Spacer from '@/components/common/Spacer/Spacer';
import { mockPosts } from '@/_mocks_/mockposts';
import { mockPostDetail, mockPostDetailNoComments } from '@/_mocks_/mockPostDetail';
import type { PostDetail } from '@/types/blog';
import { stripMarkdownSyntax } from '@/utils/textFormatter';

const MainPage = () => {
  const [savedPosts, setSavedPosts] = useState<PostDetail[]>([]);

  // TODO: API 연결 시 삭제예정 - localStorage에서 저장된 블로그 가져오기
  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

    // TODO: API 연결 시 삭제예정 - 기존 데이터의 ID를 순차적으로 재정렬 (1부터 시작)
    const reindexedPosts = posts.map((post: PostDetail, index: number) => ({
      ...post,
      postId: index + 1,
    }));

    // TODO: API 연결 시 삭제예정 - 재정렬된 데이터를 다시 저장
    if (reindexedPosts.length > 0 && JSON.stringify(posts) !== JSON.stringify(reindexedPosts)) {
      localStorage.setItem('blogPosts', JSON.stringify(reindexedPosts));
    }

    setSavedPosts(reindexedPosts);
  }, []);

  // mockPostDetail에서 첫 번째 TEXT와 IMAGE 추출
  const firstText = mockPostDetail.contents.find(c => c.contentType === 'TEXT')?.content || '';
  const firstImage = mockPostDetail.contents.find(c => c.contentType === 'IMAGE')?.content || '';

  // mockPostDetailNoComments에서 첫 번째 TEXT와 IMAGE 추출
  const firstTextNoComments = mockPostDetailNoComments.contents.find(c => c.contentType === 'TEXT')?.content || '';
  const firstImageNoComments = mockPostDetailNoComments.contents.find(c => c.contentType === 'IMAGE')?.content || '';
  
  return (
    <div>
      <Spacer height="md" />

      {/* TODO: API 연결 시 삭제예정 - localStorage에 저장된 블로그들 (최신순) */}
      {savedPosts.reverse().map(post => {
        // TEXT 또는 MARKDOWN 타입의 첫 번째 콘텐츠 찾기
        const firstText = post.contents.find(c => c.contentType === 'TEXT' || c.contentType === 'MARKDOWN')?.content || '';
        const firstImage = post.contents.find(c => c.contentType === 'IMAGE')?.content || '';

        // 마크다운 문법 제거
        const plainText = stripMarkdownSyntax(firstText);

        return (
          <BlogPreviewCard
            key={post.postId}
            id={post.postId}
            title={post.title}
            content={plainText.substring(0, 100) + (plainText.length > 100 ? '...' : '')}
            imageSrc={firstImage}
          />
        );
      })}

      {/* 테스트용 고정 포스트 (댓글 있음) */}
      <BlogPreviewCard
        key={mockPostDetail.postId}
        id={mockPostDetail.postId}
        title={mockPostDetail.title}
        content={firstText.substring(0, 100) + '...'}
        imageSrc={firstImage}
      />

      {/* 테스트용 고정 포스트 (댓글 없음) */}
      <BlogPreviewCard
        key={mockPostDetailNoComments.postId}
        id={mockPostDetailNoComments.postId}
        title={mockPostDetailNoComments.title}
        content={firstTextNoComments.substring(0, 100) + '...'}
        imageSrc={firstImageNoComments}
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
