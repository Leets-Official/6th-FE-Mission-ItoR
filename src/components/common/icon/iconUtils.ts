export type IconSize = 'sm' | 'md' | 'lg';

export const getIconContainerClasses = (size: IconSize): string => {
  const sizes = {
    sm: 'flex w-3.5 h-3.5 justify-center items-center aspect-square',
    md: 'flex w-6 h-6 justify-center items-center aspect-square',
    lg: 'flex w-10 h-10 p-2 justify-center items-center flex-shrink-0 aspect-square',
  };
  return sizes[size];
};

export const getIconClasses = (size: IconSize): string => {
  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-6 h-6',
    lg: 'w-6 h-6',
  };
  return sizes[size];
};

export const getClickableIconClasses = (): string => {
  return 'cursor-pointer hover:bg-[#E6E6E6] hover:rounded-[4px] transition-all duration-200';
};

export const getSvgScaleClasses = (): string => {
  return '[&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current';
};
