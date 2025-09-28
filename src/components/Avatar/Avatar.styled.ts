export const containerStyle = (size: number): string => `
  flex items-center justify-center
  shrink-0
  rounded-full
  overflow-hidden
  border-2 border-brand-borderGray
  bg-brand-bgGray
  w-[${size}px] h-[${size}px]
`;

export const imageStyle = `
  w-full h-full object-cover
`;
