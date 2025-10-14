import type { ProfileImageProps } from './ProfileImage.types'

export default function ProfileImage({ src, label = 'G', size = 'md' }: ProfileImageProps) {
  const sizeConfig = {
    xl: { svg: 90, radius: 45, font: 'text-[50px] leading-[28px]' },
    lg: { svg: 64, radius: 32, font: 'text-[36px] leading-[28px]' },
    md: { svg: 40, radius: 20, font: 'text-[16px] leading-[28px]' },
    sm: { svg: 20, radius: 10, font: 'text-[10px] leading-[12px]' },
  }

  const { svg, radius, font } = sizeConfig[size]

  return (
    <div
      className='relative flex items-center justify-center'
      style={{ width: `${svg}px`, height: `${svg}px` }}
    >
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
        style={{
          top: size === 'xl' ? '29px' : size === 'lg' ? '16px' : size === 'md' ? '6px' : '2px',
          left: size === 'xl' ? '24px' : size === 'lg' ? '17px' : size === 'md' ? '13px' : '4px',
        }}
      >
        {label}
      </span>
    </div>
  )
}
