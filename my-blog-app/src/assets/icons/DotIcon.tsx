export function DotIcon({ color = '#E6E6E6', size = 12 }: { color?: string; size?: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={(size * 20) / 12} // 비율 맞춤: 12x20 기준
      viewBox='0 0 12 20'
      fill='none'
    >
      <circle cx='6' cy='10' r='1' fill={color} />
    </svg>
  )
}
