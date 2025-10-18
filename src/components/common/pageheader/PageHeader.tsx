import { FC } from 'react';
import { PageHeaderLeft, PageHeaderRight } from '@/components';
import { PageHeaderProps } from '@/types/pageheader';

const PageHeader: FC<PageHeaderProps> = ({ className = '', type, onHamburgerClick, onEdit, onCancel, onSave, isOwner }) => {
  return (
    <header className={`page-header-container ${className}`}>
      <PageHeaderLeft onHamburgerClick={onHamburgerClick} />
      <PageHeaderRight type={type} onEdit={onEdit} onCancel={onCancel} onSave={onSave} isOwner={isOwner} />
    </header>
  );
};

export default PageHeader;
