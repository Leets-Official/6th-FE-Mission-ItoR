import { FC } from 'react';
import { tv } from 'tailwind-variants';
import { Spacer, PostHeader, PostDetails, PostBody } from '@/components';
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

  const contentRenderers = {
    TEXT: (content: string, index: number) => <PostBody key={index} content={content} isMarkdown={false} />,
    MARKDOWN: (content: string, index: number) => <PostBody key={index} content={content} isMarkdown={true} />,
    IMAGE: (content: string, index: number) => (
      <div key={index} className={styles.imageWrapper()}>
        <img src={content} alt={`content-${index}`} className={styles.image()} />
      </div>
    ),
  };

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
            const renderer = contentRenderers[item.contentType];
            return renderer ? renderer(item.content, index) : null;
          })}
        <Spacer height="md" className="w-full max-w-content" />
      </div>
    </>
  );
};

export default BlogPostSection;
