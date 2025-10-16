import type { ContentItem, CreatePostPayload, EditorMode } from '@/types/blog';


//HTML을 백엔드 contents 배열로 변환 (간단 버전)
export const htmlToContentsArray = (html: string): ContentItem[] => {
  if (!html.trim()) return [];
  
  // 간단하게 텍스트만 추출 (이미지는 나중에 추가)
  const textContent = html.replace(/<[^>]*>/g, '').trim();
  if (!textContent) return [];
  
  return [{
    contentOrder: 1,
    content: textContent,
    contentType: 'TEXT'
  }];
};

//마크다운을 백엔드 contents 배열로 변환 (간단 버전)
export const markdownToContentsArray = (markdown: string): ContentItem[] => {
  if (!markdown.trim()) return [];
  
  return [{
    contentOrder: 1,
    content: markdown.trim(),
    contentType: 'TEXT'
  }];
};

//게시물 생성 페이로드 빌더
export const buildCreatePayload = (
  title: string, 
  mode: EditorMode,
  content: string
): CreatePostPayload => {
  const contents = mode === 'basic' 
    ? htmlToContentsArray(content)
    : markdownToContentsArray(content);

  return {
    title: title.trim(),
    contents
  };
};
