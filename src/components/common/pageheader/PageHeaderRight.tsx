import { FC } from 'react';
import { PageHeaderRenderers, PageHeaderType, RenderProps } from '@/components/common/Pageheader/PageHeaderRightRenderers';

interface PageHeaderRightProps extends RenderProps {
  type: PageHeaderType;
}

const PageHeaderRight: FC<PageHeaderRightProps> = ({ type, onEdit, onCancel, onSave }) => {
  return PageHeaderRenderers[type]({ onEdit, onCancel, onSave });
};

export default PageHeaderRight;
