type PictureFrameProps = {
  src: string
  type?: 'small' | 'large'
}

export default function PictureFrame({ src, type = 'small' }: PictureFrameProps) {
  const base = 'flex justify-center items-center bg-white self-stretch'
  const styles =
    type === 'small'
      ? 'max-w-[688px] h-[137.172px] gap-[8px] py-3 px-4 rounded-[2px] aspect-[656/137]'
      : 'max-w-[688px] h-[656.984px] py-3 px-4 gap-[8px] rounded-[4px] aspect-[656/137]'

  return (
    <div className={`${base} ${styles}`}>
      <img src={src} alt='게시물 이미지' className='rounded-[4px]' />
    </div>
  )
}
