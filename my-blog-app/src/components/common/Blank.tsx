type BlankProps = {
  size?: 'sm' | 'md' | 'lg' // sm=20px, md=32px, lg=64px
}

export default function Blank({ size = 'sm' }: BlankProps) {
  const height =
    size === 'sm'
      ? 'h-[20px] max-h-[20px]'
      : size === 'md'
        ? 'h-[32px] max-h-[32px]'
        : 'h-[64px] max-h-[64px]'

  return (
    <div
      className={`flex ${height} w-[688px] max-w-[688px] px-[10px] items-start gap-[10px] bg-[#FFF] flex-shrink-0`}
    />
  )
}
