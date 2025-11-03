import type { PostBlock } from "@src/api/posts";

export function buildBlocks(text?: string, imageUrl?: string): PostBlock[] {
  const arr: PostBlock[] = [];
  let order = 1;
  if (text && text.trim()) {
    arr.push({ type: "TEXT", order: order++, content: text.trim() });
  }
  if (imageUrl && imageUrl.trim()) {
    arr.push({ type: "IMAGE", order: order++, url: imageUrl.trim() });
  }
  return arr;
}
