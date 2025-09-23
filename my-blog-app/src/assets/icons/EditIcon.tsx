type EditIconProps = {
  color?: string; // 기본값은 파란색
};

export function EditIcon({ color = "#00A1FF" }: EditIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M0 14.46V17.5C0 17.78 0.22 18 0.5 18H3.54C3.67 18 3.8 17.95 3.89 17.85L14.81 6.94L11.06 3.19L0.15 14.1C0.05 14.2 0 14.32 0 14.46ZM17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63L15.37 0.29C14.98 -0.1 14.35 -0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04Z"
        fill={color}
      />
    </svg>
  );
}
