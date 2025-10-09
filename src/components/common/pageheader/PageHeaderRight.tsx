import { FC } from 'react';
import { renderDetailType, renderMainType, renderWriteType, renderMypageType } from './PageHeaderRightRenderers';

interface PageHeaderRightProps {
  type: 'main' | 'detail' | 'write' | 'mypage';
}

const PageHeaderRight: FC<PageHeaderRightProps> = ({ type }) => {
  switch (type) {
    case 'main':
      return renderMainType();
    case 'detail':
      return renderDetailType();
    case 'write':
      return renderWriteType();
    case 'mypage':
      return renderMypageType();
    default:
      return null;
  }
};

export default PageHeaderRight;
