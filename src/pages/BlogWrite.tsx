import React from 'react';
import Header from '@/components/Header';
import Toast from '@/components/Toast';
import Editor from '@/components/Editor';
import WriteToolbar from '@/components/WriteToolbar';
import { useBlogWrite } from '@/hooks/useBlogWrite';
import { S } from '@/styles/BlogWrite.styles';

const BlogWrite: React.FC = () => {
  const {
    title,
    setTitle,
    contents,
    toastMessage,
    isComposing,
    setIsComposing,
    isUploading,
    fileInputRef,
    textInputRefs,
    handlePost,
    handleContentChange,
    handleKeyDown,
    handleAddPhotoClick,
    handleImageUpload,
  } = useBlogWrite();

  return (
    <div className={S.container}>
      <Header variant="edit" onPost={handlePost} />
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" hidden />

      <WriteToolbar onAddPhotoClick={handleAddPhotoClick} isUploading={isUploading} />

      {toastMessage && (
        <div className={S.toastWrapper}>
          <Toast
            variant={
              toastMessage.includes('실패') || toastMessage.includes('오류') ? 'warning' : 'success'
            }
            message={toastMessage}
          />
        </div>
      )}

      <Editor
        title={title}
        setTitle={setTitle}
        contents={contents}
        textInputRefs={textInputRefs}
        isComposing={isComposing}
        setIsComposing={setIsComposing}
        handleContentChange={handleContentChange}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default BlogWrite;
