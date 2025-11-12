export const formatShortDate = (iso: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const m = d.toLocaleString("en-US", { month: "short" });
  return `${m} ${d.getDate()}, ${d.getFullYear()}.`;
};
