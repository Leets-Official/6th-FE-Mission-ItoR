import { AddPhotoAlternateIcon, FolderOpenIcon } from '@/assets/icons/common';
import Icon from '@/components/common/icon/Icon';
import clsx from 'clsx';
import { FC } from 'react';

interface PageHeaderLegacyProps {
  className?: string;
}

const PageHeaderLegacy: FC<PageHeaderLegacyProps> = ({ className = '' }) => {
  return (
    <div className={clsx('page-header-legacy-container', className)}>
      <div className="flex pt-0.5 px-2 pb-1 justify-center items-center gap-1 rounded-[2px]">
        <Icon size="sm" className="text-gray">
          <AddPhotoAlternateIcon />
        </Icon>
        <span className="text-gray text-xs font-normal leading-[160%]">?�진 추�??�기</span>
      </div>
      <div className="flex pt-0.5 px-2 pb-1 justify-center items-center gap-1 rounded-[2px]">
        <Icon size="sm" className="text-gray">
          <FolderOpenIcon />
        </Icon>
        <span className="text-gray text-xs font-normal leading-[160%]">?�일 추�??�기</span>
      </div>
    </div>
  );
};

export default PageHeaderLegacy;
