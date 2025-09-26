import { FC } from 'react';
import PageHeaderLeft from '@/components/common/PageHeader/PageHeaderLeft';
import PageHeaderRight from '@/components/common/PageHeader/PageHeaderRight';

interface PageHeaderProps {
  className?: string;
  type: 'main' | 'detail' | 'write';
}

const PageHeader: FC<PageHeaderProps> = ({ className = '', type }) => {
  return (
    <header className={`page-header-container ${className}`}>
      <PageHeaderLeft />
      <PageHeaderRight type={type} />
    </header>
  );
};

export default PageHeader;
