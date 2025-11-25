export const S = {
  pageContainer: "flex flex-col w-full min-h-screen bg-white relative",
  
  titleContainer: "w-full h-[114px] flex flex-col justify-center border-b border-gray-300 bg-gray-50 px-[430px]",
  titleHeader: "text-[32px] font-medium text-gray-900",
  titleSubtext: "text-[14px] text-gray-600 mt-1",

  profileUploadContainer: "relative w-full h-[180px]",
  profileUploadInner: "absolute left-[430px] top-[40px] flex flex-col items-start gap-2",
  profileImage: "w-[88px] h-[88px] rounded-full object-cover",
  profileUploadLabel: "text-[12px] text-gray-600 border border-gray-300 px-3 py-1 rounded-[2px] cursor-pointer hover:bg-gray-50 transition",

  formContainer: "flex flex-col mt-[60px] px-[430px]",
  formInner: "w-[688px] flex flex-col gap-4",
  
  errorText: "text-[#FF3F3F] text-[12px] ml-[16px] mt-[-8px]",
  
  submitButton: "w-full h-[46px] mt-6 border border-blue-400 rounded-full text-blue-500 font-medium hover:bg-blue-50 transition disabled:opacity-50",

  modalOverlay: "absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 z-50",
};
