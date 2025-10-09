import { FC } from 'react';
import PageHeaderLeft from '@/components/common/Pageheader/PageHeaderLeft';
import PageHeaderRight from '@/components/common/Pageheader/PageHeaderRight';

interface PageHeaderProps {
  className?: string;
  type: 'main' | 'detail' | 'write' | 'mypage';
  onHamburgerClick?: () => void;
}

const PageHeader: FC<PageHeaderProps> = ({ className = '', type, onHamburgerClick }) => {
  return (
    <header className={`page-header-container ${className}`}>
      <PageHeaderLeft onHamburgerClick={onHamburgerClick} />
      <PageHeaderRight type={type} />
    </header>
  );
};

export default PageHeader;
