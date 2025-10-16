import { useState, useMemo, useEffect, useRef } from 'react';
import type ReactQuill from 'react-quill';
import type { EditorMode } from '@/types/blog';
import { BLOG_TEXTS } from '@/constants/blog.constants';
import { getEditorStyles } from '@/styles/editor.styles';
import { useImageUpload } from './useImageUpload';

export const useBlogWrite = () => {
  // 1. 에디터 상태 관리
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState<EditorMode>('basic');
  const [basicContent, setBasicContent] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');

  // ReactQuill 에디터 ref
  const quillRef = useRef<ReactQuill>(null);

  // 모바일에서 마크다운 모드일 경우 자동으로 기본 모드로 전환
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
  }, [mode]);

  // 2. ReactQuill 모듈 설정
  const modules = useMemo(() => ({
    toolbar: [
      BLOG_TEXTS.WRITE.TOOLBAR.HEADERS,
      BLOG_TEXTS.WRITE.TOOLBAR.TEXT_STYLES,
      BLOG_TEXTS.WRITE.TOOLBAR.LISTS,
      BLOG_TEXTS.WRITE.TOOLBAR.LINKS_IMAGES,
      BLOG_TEXTS.WRITE.TOOLBAR.CLEAN,
    ],
  }), []);

  // 2-1. 모바일용 간단한 툴바 설정 (이미지만)
  const mobileModules = useMemo(() => ({
    toolbar: {
      container: [
        ['image'],
      ],
    },
  }), []);

  // 3. 에디터 스타일
  const editorStyles = getEditorStyles();

  // 4. 모드 토글 버튼 props 생성 함수
  const getButtonProps = (targetMode: 'basic' | 'markdown'): {
    intent: 'primary' | 'secondary';
    variant: 'solid' | 'outline';
    size: 'sm';
  } => ({
    intent: mode === targetMode ? 'primary' : 'secondary',
    variant: mode === targetMode ? 'solid' : 'outline',
    size: 'sm',
  });

  // 5. 이미지 업로드 기능
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
