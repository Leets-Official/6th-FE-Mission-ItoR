// src/styles/BlogWrite.styles.ts

export const S = {
  container: "flex flex-col items-center w-full pb-20",
  
  toolbarContainer: "flex justify-center w-full max-w-[1366px] h-[49px] px-[12px] py-[12px] gap-[32px]",
  addPhotoButton: "flex items-center justify-center w-[103px] h-[25px] px-[8px] py-[2px] gap-[4px] rounded-[2px] cursor-pointer disabled:opacity-50",
  addPhotoIcon: "w-[16px] h-[16px] text-[#909090]",
  addPhotoText: "text-[#909090] text-[12px]",

  toastWrapper: "flex items-center justify-center mt-4 max-w-[688px]",

  editorContainer: "flex flex-col w-full max-w-[688px] mt-4 gap-2",
  titleInput: "w-full h-[46px] px-[16px] py-[12px] rounded-md text-gray-900 placeholder-gray-400 text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500",
  
  editorWrapper: "w-full px-[16px] py-[12px] rounded-md text-[14px] focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500",
  
  textBlock: "w-full bg-transparent text-[#333333] placeholder-[#909090] focus:outline-none resize-none overflow-hidden",
  imageBlock: "w-full rounded-md my-4 object-cover",
};
