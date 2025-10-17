import type { CreatePostPayload, ContentItem } from '@/types/blog';

/**
 * HTML/마크다운 콘텐츠를 API 요청 형식으로 변환
 *
 * ReactQuill 에디터의 HTML을 파싱하여 TEXT와 IMAGE를 분리하고
 * 백엔드 API 스펙에 맞는 형식으로 변환합니다.
 *
 * @param title - 블로그 제목
 * @param content - ReactQuill HTML 또는 마크다운 콘텐츠
 * @param isMarkdown - 마크다운 여부 (기본값: false)
 * @returns CreatePostPayload - API 요청 형식
 *
 * @example
 * const html = '<p>안녕하세요</p><img src="image.jpg" /><p>반갑습니다</p>';
 * const payload = convertToApiFormat('제목', html);
 * // {
 * //   title: '제목',
 * //   contents: [
 * //     { contentOrder: 1, content: '안녕하세요', contentType: 'TEXT' },
 * //     { contentOrder: 2, content: 'image.jpg', contentType: 'IMAGE' },
 * //     { contentOrder: 3, content: '반갑습니다', contentType: 'TEXT' }
 * //   ]
 * // }
 */
export const convertToApiFormat = (
  title: string,
  content: string,
  isMarkdown: boolean = false
): CreatePostPayload => {
  // 마크다운인 경우 MARKDOWN 타입으로 처리
  if (isMarkdown) {
    return {
      title: title.trim() || '제목 없음',
      contents: [
        {
          contentOrder: 1,
          content: content.trim(),
          contentType: 'MARKDOWN',
        },
      ],
    };
  }

  // HTML 파싱
  const htmlContent = content;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const contents: ContentItem[] = [];
  let order = 1;

  // body의 모든 자식 노드를 순회
  const processNode = (node: Node) => {
    // img 태그 처리
    if (node.nodeName === 'IMG') {
      const img = node as HTMLImageElement;
      if (img.src) {
        contents.push({
          contentOrder: order++,
          content: img.src,
          contentType: 'IMAGE',
        });
      }
      return;
    }

    // 텍스트가 있는 요소 처리
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;

      // img가 포함된 요소는 재귀적으로 처리
      const hasImg = element.querySelector('img');
      if (hasImg) {
        Array.from(element.childNodes).forEach(processNode);
        return;
      }

      // 순수 텍스트 요소 처리
      const text = element.textContent?.trim();
      if (text) {
        contents.push({
          contentOrder: order++,
          content: element.innerHTML, // HTML 태그 포함 (bold, italic 등 유지)
          contentType: 'TEXT',
        });
      }
    }
  };

  // body의 직계 자식들을 순회
  Array.from(doc.body.childNodes).forEach(processNode);

  // contents가 비어있으면 빈 텍스트 하나 추가
  if (contents.length === 0) {
    contents.push({
      contentOrder: 1,
      content: '',
      contentType: 'TEXT',
    });
  }

  return {
    title: title.trim() || '제목 없음',
    contents,
  };
};
