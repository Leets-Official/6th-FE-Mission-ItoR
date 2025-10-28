import { BLOG_STYLES } from '@/constants/blog.constants';

/**
 * 블로그 에디터(ReactQuill, MDEditor)의 스타일을 생성하는 함수
 * @returns 에디터 스타일 문자열
 */
export const getEditorStyles = (): string => `
  /* 마크다운 에디터 */
  .w-md-editor-toolbar {
    height: ${BLOG_STYLES.EDITOR.TOOLBAR_HEIGHT} !important;
    padding: ${BLOG_STYLES.SPACING.TOOLBAR_PADDING} !important;
    border-radius: ${BLOG_STYLES.EDITOR.BORDER_RADIUS} ${BLOG_STYLES.EDITOR.BORDER_RADIUS} 0 0 !important;
  }

  .w-md-editor-toolbar button {
    width: 16px !important;
    height: 16px !important;
    margin: 0 4px !important;
  }

  .w-md-editor-toolbar .w-md-editor-toolbar-divider {
    margin: 0 12px !important;

  }

  .w-md-container {
    height: ${BLOG_STYLES.EDITOR.HEIGHT} !important;
    border-radius: ${BLOG_STYLES.EDITOR.BORDER_RADIUS} !important;
  }

  /* ReactQuill 공통 스타일 */
  .ql-toolbar {
    height: ${BLOG_STYLES.EDITOR.TOOLBAR_HEIGHT} !important;
    border-radius: ${BLOG_STYLES.EDITOR.BORDER_RADIUS} ${BLOG_STYLES.EDITOR.BORDER_RADIUS} 0 0 !important;
  }

  .ql-container {
    height: ${BLOG_STYLES.EDITOR.HEIGHT} !important;
    border-radius: 0 0 ${BLOG_STYLES.EDITOR.BORDER_RADIUS} ${BLOG_STYLES.EDITOR.BORDER_RADIUS} !important;
  }

  .ql-editor {
    height: ${BLOG_STYLES.EDITOR.EDITOR_HEIGHT} !important;
  }

  .ql-editor img {
    max-width: 100% !important;
    height: auto !important;
    display: block !important;
    margin: ${BLOG_STYLES.SPACING.IMAGE_MARGIN} !important;
  }

  .ql-editor.ql-blank::before {
    font-style: normal !important;
  }

  /* 모바일용 ReactQuill */
  .mobile-quill {
    width: 357px !important;
    max-width: 357px !important;
  }

  .mobile-quill .ql-toolbar {
    border: 1px solid ${BLOG_STYLES.COLORS.BORDER} !important;
    border-bottom: none !important;
    border-radius: 4px 4px 0 0 !important;
    background-color: ${BLOG_STYLES.COLORS.TOOLBAR_BG} !important;
    padding: ${BLOG_STYLES.SPACING.TOOLBAR_PADDING} !important;
  }

  .mobile-quill .ql-container {
    width: 100% !important;
    height: auto !important;
    min-height: ${BLOG_STYLES.MOBILE.MIN_HEIGHT} !important;
    border: 1px solid ${BLOG_STYLES.COLORS.BORDER} !important;
    border-radius: 0 0 4px 4px !important;
    background-color: white !important;
  }

  .mobile-quill .ql-editor {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    min-height: ${BLOG_STYLES.MOBILE.MIN_HEIGHT} !important;
    padding: ${BLOG_STYLES.SPACING.EDITOR_PADDING} !important;
    font-family: ${BLOG_STYLES.MOBILE.FONT_FAMILY} !important;
    font-size: ${BLOG_STYLES.MOBILE.FONT_SIZE} !important;
    font-weight: ${BLOG_STYLES.MOBILE.FONT_WEIGHT} !important;
    line-height: ${BLOG_STYLES.MOBILE.LINE_HEIGHT} !important;
    letter-spacing: ${BLOG_STYLES.MOBILE.LETTER_SPACING} !important;
    color: ${BLOG_STYLES.COLORS.TEXT} !important;
    word-wrap: break-word !important;
    word-break: break-word !important;
    overflow-wrap: break-word !important;
    white-space: pre-wrap !important;
  }

  .mobile-quill .ql-editor.ql-blank {
    min-height: ${BLOG_STYLES.MOBILE.MIN_HEIGHT} !important;
  }

  .mobile-quill .ql-editor.ql-blank::before {
    color: ${BLOG_STYLES.COLORS.PLACEHOLDER} !important;
    font-style: normal !important;
    left: ${BLOG_STYLES.SPACING.EDITOR_PADDING} !important;
    font-family: ${BLOG_STYLES.MOBILE.FONT_FAMILY} !important;
    font-size: ${BLOG_STYLES.MOBILE.FONT_SIZE} !important;
    font-weight: ${BLOG_STYLES.MOBILE.FONT_WEIGHT} !important;
  }

  /* 데스크톱 (768px 이상) */
  @media (min-width: 769px) {
    .w-md-editor-toolbar,
    .ql-toolbar {
      min-width: ${BLOG_STYLES.EDITOR.MIN_WIDTH} !important;
    }

    .w-md-container,
    .ql-container {
      min-width: ${BLOG_STYLES.EDITOR.MIN_WIDTH} !important;
    }
  }
`;
