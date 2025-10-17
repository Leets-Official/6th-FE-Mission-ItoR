import pictureframe from '@/assets/images/pictureframe.png'

type PictureFrameProps = {
  src?: string
  alt?: string
}

export default function PictureFrame({ src, alt = '게시글 이미지' }: PictureFrameProps) {
  // src가 없으면 기본 프로필 이미지(profileimage.png) 사용
  const backgroundUrl = src ? src : PictureFrame

  return (
    <div
      className='flex w-[124px] h-[116px] rounded-[2px] bg-fake-white bg-cover bg-center flex-shrink-0'
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      role='img'
      aria-label={alt}
    />
  )
}
