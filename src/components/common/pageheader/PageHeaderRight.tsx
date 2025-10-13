import { FC } from 'react';
import { PageHeaderRenderers } from '@/components/common/Pageheader/PageHeaderRightRenderers';
import { PageHeaderRightProps } from '@/types/pageheader';

const PageHeaderRight: FC<PageHeaderRightProps> = ({ type, onEdit, onCancel, onSave }) => {
  return PageHeaderRenderers[type]({ onEdit, onCancel, onSave });
};

export default PageHeaderRight;
