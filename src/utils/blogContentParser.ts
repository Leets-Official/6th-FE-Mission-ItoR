import type { CreatePostPayload, ContentItem } from '@/types/blog';

export const convertToApiFormat = (title: string, content: string, isMarkdown = false): CreatePostPayload => {
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

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const contents: ContentItem[] = [];
  let order = 1;

  const processNode = (node: Node) => {
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

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const hasImg = element.querySelector('img');
      if (hasImg) {
        Array.from(element.childNodes).forEach(processNode);
        return;
      }

      const text = element.textContent?.trim();
      if (text) {
        contents.push({
          contentOrder: order++,
          content: element.innerHTML,
          contentType: 'TEXT',
        });
      }
    }
  };

  Array.from(doc.body.childNodes).forEach(processNode);

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
