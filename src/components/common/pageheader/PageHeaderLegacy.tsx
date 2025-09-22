import { AddPhotoAlternateIcon, FolderOpenIcon } from '@/assets/icons/common';
import Icon from '@/components/common/icon/Icon';
import React from 'react';

interface PageHeaderLegacyProps {
  className?: string;
}

const PageHeaderLegacy: React.FC<PageHeaderLegacyProps> = ({ className = '' }) => {
  return (
    <div className={`flex w-[1366px] max-w-[1366px] p-3 justify-center items-center gap-8 ${className}`}>
      <div className="flex pt-0.5 px-2 pb-1 justify-center items-center gap-1 rounded-[2px]">
        <Icon size="sm" className="text-gray">
          <AddPhotoAlternateIcon />
        </Icon>
        <span className="text-gray text-xs font-normal leading-[160%]">사진 추가하기</span>
      </div>
      <div className="flex pt-0.5 px-2 pb-1 justify-center items-center gap-1 rounded-[2px]">
        <Icon size="sm" className="text-gray">
          <FolderOpenIcon />
        </Icon>
        <span className="text-gray text-xs font-normal leading-[160%]">파일 추가하기</span>
      </div>
    </div>
  );
};

export default PageHeaderLegacy;
