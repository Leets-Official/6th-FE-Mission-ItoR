export type IconSize = 'sm' | 'md' | 'lg';

export const getIconContainerSizeClass = (size: IconSize): string => {
  const sizeMap: Record<IconSize, string> = {
    sm: 'w-3.5 h-3.5', // 14px 컨테이너
    md: 'w-5 h-5', // 20px 컨테이너
    lg: 'w-10 h-10', // 40px 컨테이너
  };

  return sizeMap[size];
};

export const getIconInnerSizeClass = (size: IconSize): string => {
  const sizeMap: Record<IconSize, string> = {
    sm: 'w-3.5 h-3.5', // 14px 아이콘
    md: 'w-5 h-5', // 20px 아이콘
    lg: 'w-6 h-6', // 24px 아이콘 (40px 컨테이너 안에)
  };

  return sizeMap[size];
};

export const getIconContainerClass = (size: IconSize): string => {
  const baseClass = 'flex justify-center items-center aspect-square flex-shrink-0';
  const sizeClass = getIconContainerSizeClass(size);

  return `${baseClass} ${sizeClass}`;
};

export const getIconContainerWithPaddingClass = (size: IconSize): string => {
  if (size === 'lg') {
    return 'flex w-10 h-10 p-2 justify-center items-center flex-shrink-0 aspect-square';
  }
  return getIconContainerClass(size);
};

export const getIconSizePx = (size: IconSize): number => {
  const sizeMap: Record<IconSize, number> = {
    sm: 14,
    md: 20,
    lg: 40,
  };

  return sizeMap[size];
};

export const getIconHoverClasses = (): string => {
  return 'cursor-pointer hover:bg-[#E6E6E6] hover:rounded-[4px] transition-all duration-200';
};
