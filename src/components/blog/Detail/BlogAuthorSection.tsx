import { FC } from 'react';
import { tv } from 'tailwind-variants';
import { Spacer, MyPageHeader } from '@/components';
import { MYPAGE_TEXTS } from '@/constants';

interface BlogAuthorSectionProps {
  nickName: string;
  introduction?: string;
}

const blogAuthorSection = tv({
  slots: {
    container: 'flex flex-col items-center self-stretch border-b border-gray-96 bg-gray-96 pb-[42px]',
  },
});

const BlogAuthorSection: FC<BlogAuthorSectionProps> = ({ nickName, introduction }) => {
  const styles = blogAuthorSection();

  return (
    <div className={styles.container()}>
      <Spacer height="lg" className="w-full max-w-content max-md:h-8 lg:h-16" />
      <MyPageHeader
        isEditMode={false}
        nickname={nickName}
        bio={introduction || MYPAGE_TEXTS.PROFILE.DEFAULT_BIO}
        onEditClick={() => {}}
        showSettingsButton={false}
        isEditProfilePage={false}
      />
      <Spacer height="lg" className="w-full max-w-content max-md:h-8 lg:h-16" />
    </div>
  );
};

export default BlogAuthorSection;
