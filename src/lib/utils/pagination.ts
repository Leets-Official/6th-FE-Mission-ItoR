export function makeRange(current: number, total: number, max: number): number[] {
  const safeTotal = Math.max(1, total);
  const safeMax = Math.max(1, Math.min(max, safeTotal));
  const half = Math.floor((safeMax - 1) / 2);

  let start = Math.max(1, current - half);
  const end = Math.min(safeTotal, start + safeMax - 1);

  // 앞쪽이 부족하면 다시 보정
  start = Math.max(1, end - safeMax + 1);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
