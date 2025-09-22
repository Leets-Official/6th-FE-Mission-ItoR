import React from 'react';
import { renderDetailType, renderMainType, renderWriteType } from './PageHeaderRightRenderers';

interface PageHeaderRightProps {
  type: 'main' | 'detail' | 'write';
}

const PageHeaderRight: React.FC<PageHeaderRightProps> = ({ type }) => {
  switch (type) {
    case 'main':
      return renderMainType();
    case 'detail':
      return renderDetailType();
    case 'write':
      return renderWriteType();
    default:
      return null;
  }
};

export default PageHeaderRight;
