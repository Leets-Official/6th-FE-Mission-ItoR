import { FC } from 'react';
import profileImage from '@/assets/profile.png';

interface MainPreviewImageProps {
  className?: string;
  src?: string;
  alt?: string;
}

const MainPreviewImage: FC<MainPreviewImageProps> = ({ 
  className = '', 
  src,
  alt = 'Preview image' 
}) => {
  const imageUrl = src || profileImage;
  
  return (
    <div 
      className={`flex w-[124px] h-[116px] items-center ${className}`}
      style={{
        padding: '12px 16px',
        gap: '8px',
        background: 'var(--fake-white, #FFF)'
      }}
    >
      <div
        style={{
          flex: '1 0 0',
          alignSelf: 'stretch',
          borderRadius: '2px',
          background: `url(${imageUrl}) lightgray 50% / cover no-repeat`
        }}
      />
    </div>
  );
};

export default MainPreviewImage;
