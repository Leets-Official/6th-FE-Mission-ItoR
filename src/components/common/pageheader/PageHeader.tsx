import { FC } from 'react';
import PageHeaderLeft from '@/components/common/Pageheader/PageHeaderLeft';
import PageHeaderRight from '@/components/common/Pageheader/PageHeaderRight';

interface PageHeaderProps {
  className?: string;
  type: 'main' | 'detail' | 'write' | 'mypage' | 'editprofile';
  onHamburgerClick?: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}

const PageHeader: FC<PageHeaderProps> = ({ className = '', type, onHamburgerClick, onEdit, onCancel, onSave }) => {
  return (
    <header className={`page-header-container ${className}`}>
      <PageHeaderLeft onHamburgerClick={onHamburgerClick} />
      <PageHeaderRight type={type} onEdit={onEdit} onCancel={onCancel} onSave={onSave} />
    </header>
  );
};

export default PageHeader;
