import { ReorderIcon } from '@/assets/icons/common';
import { FC } from 'react';

const PageHeaderLeft: FC = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="flex items-center gap-2.5">
        <ReorderIcon />
        <div
          className="flex px-1.5 py-1.5 justify-center items-center text-black text-xl font-normal leading-[140%]"
          style={{ fontFamily: 'Smooch, cursive' }}
        >
          Gitlog
        </div>
      </div>
    </div>
  );
};

export default PageHeaderLeft;
