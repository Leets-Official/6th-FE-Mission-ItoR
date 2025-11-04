import type { ProfileImageProps } from './ProfileImage.types'

export default function ProfileImage({ src, label = 'G', size = 'md' }: ProfileImageProps) {
  const sizeConfig = {
    xl: {
      svg: 90,
      radius: 45,
      font: 'text-[50px] leading-[28px]',
      position: { top: 29, left: 24 },
    },
    lg: {
      svg: 64,
      radius: 32,
      font: 'text-[36px] leading-[28px]',
      position: { top: 16, left: 17 },
    },
    md: {
      svg: 40,
      radius: 20,
      font: 'text-[16px] leading-[28px]',
      position: { top: 6, left: 13 },
    },
    sm: {
      svg: 20,
      radius: 10,
      font: 'text-[10px] leading-[12px]',
      position: { top: 2, left: 4 },
    },
  }

  const { svg, radius, font, position } = sizeConfig[size]

  return (
    <div
      className='relative flex items-center justify-center rounded-full overflow-hidden bg-black text-white'
      style={{ width: `${svg}px`, height: `${svg}px` }}
    >
      {/* src가 있으면 프로필 이미지로 표시 */}
      {src ? (
        <img src={src} alt='프로필 이미지' className='w-full h-full object-cover rounded-full' />
      ) : (
        <>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={svg}
            height={svg}
            viewBox={`0 0 ${svg} ${svg}`}
            className='absolute'
          >
            <circle cx={radius} cy={radius} r={radius} className='fill-black' />
          </svg>
          <span
            className={`text-white font-smooch font-normal absolute ${font}`}
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
          >
            {label}
          </span>
        </>
      )}
    </div>
  )
}
