import { create } from 'zustand';
import type { EditorMode } from '@/types/blog';

interface BlogWriteStore {
  // 상태
  title: string;
  mode: EditorMode;
  basicContent: string;
  markdownContent: string;

  // 액션
  setTitle: (title: string) => void;
  setMode: (mode: EditorMode) => void;
  setBasicContent: (content: string) => void;
  setMarkdownContent: (content: string) => void;

  // 유틸리티
  reset: () => void; // 페이지 이탈 시 초기화
  getCurrentContent: () => string; // content 반환
}

const initialState = {
  title: '',
  mode: 'basic' as EditorMode,
  basicContent: '',
  markdownContent: '',
};

export const useBlogWriteStore = create<BlogWriteStore>((set, get) => ({
  ...initialState,

  setTitle: title => set({ title }),
  setMode: mode => set({ mode }),
  setBasicContent: content => set({ basicContent: content }),
  setMarkdownContent: content => set({ markdownContent: content }),

  reset: () => set(initialState),

  getCurrentContent: () => {
    const { mode, basicContent, markdownContent } = get();
    return mode === 'basic' ? basicContent : markdownContent;
  },
}));
