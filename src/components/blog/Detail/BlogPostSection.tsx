import { FC } from 'react';
import { tv } from 'tailwind-variants';
import Spacer from '@/components/common/Spacer/Spacer';
import PostHeader from '@/components/blog/Post/PostHeader';
import PostDetails from '@/components/blog/Post/PostDetails';
import PostBody from '@/components/blog/Post/PostBody';
import { ContentItem } from '@/types/blog';

interface BlogPostSectionProps {
  title: string;
  contents: ContentItem[];
}

const blogPostSection = tv({
  slots: {
    section: 'flex flex-col items-center self-stretch border-b border-gray-96 bg-white',
    headerWrapper: 'flex w-full max-w-content flex-col items-start py-3',
    imageWrapper: 'flex w-full max-w-content items-center justify-center gap-2.5 rounded bg-white px-4 py-3',
    image: 'h-auto w-full',
  },
});

const BlogPostSection: FC<BlogPostSectionProps> = ({ title, contents }) => {
  const styles = blogPostSection();

  return (
    <>
      <div className={styles.section()}>
        <Spacer height="lg" className="w-full max-w-content max-md:h-8 lg:h-16" />
        <div className={styles.headerWrapper()}>
          <PostHeader title={title} className="w-full" />
          <Spacer height="md" className="w-full max-w-content" />
          <PostDetails />
        </div>
      </div>
      <div className={styles.section()}>
        <Spacer height="md" className="w-full max-w-content" />
        {contents
          .sort((a, b) => a.contentOrder - b.contentOrder)
          .map((item, index) => {
            if (item.contentType === 'TEXT') {
              return <PostBody key={index} content={item.content} isMarkdown={false} />;
            } else if (item.contentType === 'MARKDOWN') {
              return <PostBody key={index} content={item.content} isMarkdown={true} />;
            } else if (item.contentType === 'IMAGE') {
              return (
                <div key={index} className={styles.imageWrapper()}>
                  <img src={item.content} alt={`content-${index}`} className={styles.image()} />
                </div>
              );
            }
            return null;
          })}
        <Spacer height="md" className="w-full max-w-content" />
      </div>
    </>
  );
};

export default BlogPostSection;

