import { FC } from 'react';
import { tv } from 'tailwind-variants';
import Spacer from '@/components/common/Spacer/Spacer';
import MyPageHeader from '@/components/mypage/MyPageHeader';
import { MYPAGE_TEXTS } from '@/constants';

interface BlogAuthorSectionProps {
  nickName: string;
  introduction?: string;
}

const blogAuthorSection = tv({
  slots: {
    container: 'flex h-[354px] flex-col items-center self-stretch border-b border-gray-96 bg-gray-96',
  },
});

const BlogAuthorSection: FC<BlogAuthorSectionProps> = ({ nickName, introduction }) => {
  const styles = blogAuthorSection();

  return (
    <div className={styles.container()}>
      <Spacer height="lg" className="w-full max-w-content" />
      <MyPageHeader
        isEditMode={false}
        nickname={nickName}
        bio={introduction || MYPAGE_TEXTS.PROFILE.DEFAULT_BIO}
        onEditClick={() => {}}
        showSettingsButton={false}
        isEditProfilePage={false}
      />
      <Spacer height="lg" className="w-full max-w-content" />
    </div>
  );
};

export default BlogAuthorSection;

