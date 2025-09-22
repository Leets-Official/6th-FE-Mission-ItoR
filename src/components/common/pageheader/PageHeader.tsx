import React from 'react';
import PageHeaderLeft from './PageHeaderLeft';
import PageHeaderRight from './PageHeaderRight';

interface PageHeaderProps {
  className?: string;
  type: 'main' | 'detail' | 'write';
}

const PageHeader: React.FC<PageHeaderProps> = ({ className = '', type }) => {
  return (
    <header className={`page-header-container ${className}`}>
      <PageHeaderLeft />
      <PageHeaderRight type={type} />
    </header>
  );
};

export default PageHeader;
