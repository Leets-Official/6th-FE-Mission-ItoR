import { FC } from 'react';
import { PageHeaderRenderers } from '@/components/common/Pageheader/PageHeaderRightRenderers';
import { PageHeaderRightProps } from '@/types/pageheader';

const PageHeaderRight: FC<PageHeaderRightProps> = ({ type, onEdit, onCancel, onSave, isOwner }) => {
  return PageHeaderRenderers[type]({ onEdit, onCancel, onSave, isOwner });
};

export default PageHeaderRight;
