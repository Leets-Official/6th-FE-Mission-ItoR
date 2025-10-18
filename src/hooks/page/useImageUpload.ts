import { useCallback } from 'react';
import type ReactQuill from 'react-quill';
import type { EditorMode } from '@/types/blog';

interface UseImageUploadProps {
  mode: EditorMode;
  markdownContent: string;
  setMarkdownContent: (content: string) => void;
  quillRef?: React.RefObject<ReactQuill>;
}

export const useImageUpload = ({ mode, markdownContent, setMarkdownContent, quillRef }: UseImageUploadProps) => {
  // 파일 -> base64 함수
  const fileToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  // ReactQuill 에디터에 이미지 삽입
  const insertImageToQuill = useCallback(
    (imageUrl: string) => {
      const quill = quillRef?.current?.getEditor();

      if (quill) {
        const range = quill.getSelection(true);

        if (range) {
          quill.insertEmbed(range.index, 'image', imageUrl);
          quill.setSelection(range.index + 1, 0);
        } else {
          // selection이 없으면 맨 끝에 삽입
          const length = quill.getLength();
          quill.insertEmbed(length - 1, 'image', imageUrl);
        }
      }
    },
    [quillRef]
  );

  // 마크다운 에디터에 이미지 삽입
  const insertImageToMarkdown = useCallback(
    (imageUrl: string, fileName: string) => {
      const imageMarkdown = `\n![${fileName}](${imageUrl})\n`;
      setMarkdownContent(markdownContent + imageMarkdown);
    },
    [markdownContent, setMarkdownContent]
  );

  // 이미지 업로드 핸들러
  const handleImageUpload = useCallback(
    async (file: File) => {
      try {
        // 이미지 파일인지 확인
        if (!file.type.startsWith('image/')) {
          alert('이미지 파일만 선택해주세요.');
          return;
        }

        // 파일 크기 제한 (5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          alert('이미지 크기는 5MB 이하여야 합니다.');
          return;
        }

        // base64로 변환
        const base64Image = await fileToBase64(file);

        // 모드에 따라 다른 방식으로 이미지 삽입
        if (mode === 'basic') {
          insertImageToQuill(base64Image);
        } else if (mode === 'markdown') {
          insertImageToMarkdown(base64Image, file.name);
        }

        return base64Image;
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
      }
    },
    [mode, fileToBase64, insertImageToQuill, insertImageToMarkdown]
  );

  return {
    handleImageUpload,
  };
};
