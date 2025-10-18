/**
 * 마크다운 문법을 제거하여 순수 텍스트로 변환합니다.
 * 미리보기 카드 등에서 사용됩니다.
 *
 * @param text - 마크다운 문법이 포함된 텍스트
 * @returns 마크다운 문법이 제거된 순수 텍스트
 *
 * @example
 * const markdown = '## 제목\n**굵은 글씨** 와 *기울임*';
 * const plain = stripMarkdownSyntax(markdown);
 * // '제목 굵은 글씨 와 기울임'
 */
export const stripMarkdownSyntax = (text: string): string => {
  return text
    .replace(/#{1,6}\s/g, '') // 제목 (#, ##, ###)
    .replace(/\*\*([^*]+)\*\*/g, '$1') // 볼드
    .replace(/\*([^*]+)\*/g, '$1') // 이탤릭
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 링크
    .replace(/`([^`]+)`/g, '$1') // 인라인 코드
    .replace(/```[\s\S]*?```/g, '') // 코드블록
    .trim();
};
