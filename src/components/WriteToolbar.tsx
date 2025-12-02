// src/components/WriteToolbar.tsx
import React from 'react';
import AddPhoto from '@/assets/svgs/add_photo_alternate.svg?react';
import { S } from '@/styles/BlogWrite.styles';

interface WriteToolbarProps {
  onAddPhotoClick: () => void;
  isUploading: boolean;
}

const WriteToolbar: React.FC<WriteToolbarProps> = ({ onAddPhotoClick, isUploading }) => {
  return (
    <div className={S.toolbarContainer}>
      <button onClick={onAddPhotoClick} disabled={isUploading} className={S.addPhotoButton}>
        <AddPhoto className={S.addPhotoIcon} />
        <span className={S.addPhotoText}>{isUploading ? '업로드 중...' : '사진 추가하기'}</span>
      </button>
    </div>
  );
};

export default WriteToolbar;
