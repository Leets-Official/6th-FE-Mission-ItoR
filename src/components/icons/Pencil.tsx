// src/components/icons/Pencil.tsx
type Props = React.SVGProps<SVGSVGElement>;

export default function Pencil({ className, ...rest }: Props) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      {/* 아래 path는 src/assets/icons/pencil.svg의 path d값 그대로 복붙해도 됩니다 */}
      <path
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42L18.37 3.29a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z"
        fill="currentColor"
      />
    </svg>
  );
}
