import { FC } from 'react';

export const WriteTypeHeader: FC = () => (
  <div className="flex items-center gap-2.5">
    <button type="button" className="flex items-center justify-center gap-1 px-3 py-2">
      <span className="text-sm font-regular text-warning">삭제하기</span>
    </button>
    <button type="button" className="flex items-center justify-center gap-1 px-3 py-2">
      <span className="text-sm font-regular text-black">게시하기</span>
    </button>
  </div>
);
