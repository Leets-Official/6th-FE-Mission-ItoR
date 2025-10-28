import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

type PictureFrameProps = {
  src: string
  className?: string
} & VariantProps<typeof frameVariants>

const frameVariants = cva(
  // 공통 스타일 정의 (모든 타입 공통)
  'flex justify-center items-center bg-white self-stretch max-w-[688px] py-3 px-4 gap-2 aspect-[656/137]',
  {
    variants: {
      type: {
        small: 'h-[137.172px] rounded-[2px]',
        large: 'h-[656.984px] rounded-[4px]',
      },
    },
    defaultVariants: {
      type: 'small',
    },
  },
)

export default function PictureFrame({ src, type, className }: PictureFrameProps) {
  return (
    <div className={clsx(frameVariants({ type }), className)}>
      <img src={src} alt='게시물 이미지' className='rounded-[4px]' />
    </div>
  )
}
