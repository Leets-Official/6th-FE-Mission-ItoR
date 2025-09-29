import { FC } from 'react';
import profileImage from '@/assets/profile.png';
import { cn } from '@/utils/cn';

interface MainPreviewImageProps {
  className?: string;
  src?: string;
}

const MainPreviewImage: FC<MainPreviewImageProps> = ({ 
  className, 
  src
}) => {
  const imageUrl = src || profileImage;
  
  return (
    <div 
      className={cn('flex w-[124px] h-[116px] px-4 py-3 items-center gap-2 bg-white', className)}
    >
      <div
        className="flex-1 self-stretch rounded-sm bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundColor: 'lightgray'
        }}
      />
    </div>
  );
};

export default MainPreviewImage;
