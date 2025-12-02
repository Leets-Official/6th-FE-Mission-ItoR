// src/hooks/useBlogWrite.ts
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreatePost, useUpdatePost, useUploadImage } from '@/hooks/usePosts';
import { PostDetailResponse, PostBody, ContentBlock } from '@/api/posts';

// Add a frontend-only ID for stable keys
export type EditorBlock = ContentBlock & { frontendId: string };

export const useBlogWrite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postToEdit = location.state as PostDetailResponse | undefined;

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState<EditorBlock[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false); // For IME handling
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const [nextFocusIndex, setNextFocusIndex] = useState<number | null>(null);

  const { mutate: createMutate } = useCreatePost();
  const { mutate: updateMutate } = useUpdatePost();
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  const createFrontendId = () => `block-${Date.now()}-${Math.random()}`;

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContents(
        postToEdit.contents?.map((block) => ({
          ...block,
          frontendId: createFrontendId(),
        })) || []
      );
    } else {
      setContents([
        {
          contentOrder: 1,
          contentType: 'TEXT',
          content: '',
          frontendId: createFrontendId(),
        },
      ]);
    }
  }, [postToEdit]);

  useEffect(() => {
    if (nextFocusIndex !== null && textInputRefs.current[nextFocusIndex]) {
      const target = textInputRefs.current[nextFocusIndex];
      if (target) {
        target.focus();
        target.setSelectionRange(0, 0);
      }
      setNextFocusIndex(null);
    }
  }, [nextFocusIndex, contents]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleContentChange = (frontendId: string, newText: string) => {
    setContents((prev) =>
      prev.map((block) =>
        block.frontendId === frontendId ? { ...block, content: newText } : block
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => {
    if (isComposing) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const textarea = e.currentTarget;
      const cursorPosition = textarea.selectionStart;
      const contentBeforeCursor = textarea.value.substring(0, cursorPosition);
      const contentAfterCursor = textarea.value.substring(cursorPosition);

      setContents((prevContents) => {
        const currentBlock = prevContents[index];
        const updatedCurrentBlock = { ...currentBlock, content: contentBeforeCursor };
        const newBlock: EditorBlock = {
          contentOrder: 0,
          contentType: 'TEXT',
          content: contentAfterCursor,
          frontendId: createFrontendId(),
        };
        return [
          ...prevContents.slice(0, index),
          updatedCurrentBlock,
          newBlock,
          ...prevContents.slice(index + 1),
        ];
      });
      setNextFocusIndex(index + 1);
    }
  };

  const handleAddPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadImage(file, {
      onSuccess: (url) => {
        const newImageBlock: EditorBlock = {
          contentOrder: 0,
          contentType: 'IMAGE',
          content: url,
          frontendId: createFrontendId(),
        };
        const newTextBlock: EditorBlock = {
          contentOrder: 0,
          contentType: 'TEXT',
          content: '',
          frontendId: createFrontendId(),
        };
        setContents((prev) => [...prev, newImageBlock, newTextBlock]);
        setNextFocusIndex(contents.length + 1);
      },
      onError: () => showToast('이미지 업로드에 실패했습니다.'),
    });
  };

  const handlePost = useCallback(() => {
    const finalContents = contents
      .filter((block) => block.contentType === 'IMAGE' || block.content.trim() !== '')
      .map((block, index) => {
        const { frontendId: _frontendId, ...backendBlock } = block;
        return { ...backendBlock, contentOrder: index + 1 };
      });

    if (!title.trim() || finalContents.length === 0) {
      showToast('제목과 내용을 입력해주세요!');
      return;
    }

    const payload: PostBody = { title, contents: finalContents };
    const options = {
      onSuccess: () => {
        showToast('저장되었습니다.');
        setTimeout(() => navigate('/'), 1500);
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || '저장에 실패했습니다.';
        showToast(errorMessage);
      },
    };

    if (postToEdit) {
      updateMutate({ id: postToEdit.postId, body: payload }, options);
    } else {
      createMutate(payload, options);
    }
  }, [title, contents, postToEdit, createMutate, updateMutate, navigate]);

  return {
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
  };
};
