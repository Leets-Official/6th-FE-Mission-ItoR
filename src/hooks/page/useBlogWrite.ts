import { useMemo, useEffect, useRef, useCallback } from 'react';
import type ReactQuill from 'react-quill';
import { BLOG_TEXTS } from '@/constants/blog.constants';
import { getEditorStyles } from '@/styles/editor.styles';
import { useImageUpload } from './useImageUpload';
import { useBlogWriteStore } from '@/stores/useBlogWriteStore';

export const useBlogWrite = () => {
  // 에디터 상태 관리
  const { title, setTitle, mode, setMode, basicContent, setBasicContent, markdownContent, setMarkdownContent } =
    useBlogWriteStore();

  // ReactQuill 에디터 ref
  const quillRef = useRef<ReactQuill>(null);

  // 모바일 기본 모드로 전환
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && mode === 'markdown') {
        setMode('basic');
      }
    };

    // 초기 체크
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mode, setMode]);

  // ReactQuill 모듈 설정
  const modules = useMemo(
    () => ({
      toolbar: [
        BLOG_TEXTS.WRITE.TOOLBAR.HEADERS,
        BLOG_TEXTS.WRITE.TOOLBAR.TEXT_STYLES,
        BLOG_TEXTS.WRITE.TOOLBAR.LISTS,
        BLOG_TEXTS.WRITE.TOOLBAR.LINKS_IMAGES,
        BLOG_TEXTS.WRITE.TOOLBAR.CLEAN,
      ],
    }),
    []
  );

  // 모바일용 툴바 설정
  const mobileModules = useMemo(
    () => ({
      toolbar: {
        container: [['image']],
      },
    }),
    []
  );

  // 에디터 스타일
  const editorStyles = getEditorStyles();

  // 메모이제이션
  const getButtonProps = useCallback(
    (
      targetMode: 'basic' | 'markdown'
    ): {
      intent: 'primary' | 'secondary';
      variant: 'solid' | 'outline';
      size: 'sm';
    } => ({
      intent: mode === targetMode ? 'primary' : 'secondary',
      variant: mode === targetMode ? 'solid' : 'outline',
      size: 'sm',
    }),
    [mode]
  );

  // 이미지 업로드
  const { handleImageUpload } = useImageUpload({
    mode,
    markdownContent,
    setMarkdownContent,
    quillRef,
  });

  return {
    // 상태
    title,
    setTitle,
    mode,
    setMode,
    basicContent,
    setBasicContent,
    markdownContent,
    setMarkdownContent,

    // Refs
    quillRef,

    // 설정
    modules,
    mobileModules,
    editorStyles,

    // 헬퍼 함수
    getButtonProps,
    handleImageUpload,
  };
};
