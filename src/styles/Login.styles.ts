export const S = {
  pageContainer: "w-full min-h-screen",
  blurOverlay: "fixed inset-0 backdrop-blur-[4px] bg-black/10 z-40",
  popupContainer: "fixed inset-0 flex items-center justify-center z-50",
  popupInner:
    "max-w-[800px] w-full max-h-[90vh] overflow-y-auto bg-black rounded-[9px] flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 px-8 py-12 md:px-[60px] md:py-[80px] relative text-white",
  closeButton: "absolute top-[20px] right-[20px] w-[40px] h-[40px] flex items-center justify-center",
  closeIcon: "w-[24px] h-[24px] text-white",

  graphicContainer: "items-start justify-center flex-1 min-w-0",
  graphicSvg: "w-[344px] h-[160px] -ml-[40px] text-white fill-white",
  graphicText: "text-[#909090] text-[14px] font-light px-4 leading-[160%]",

  formContainer: "flex flex-col items-center justify-center flex-1 min-w-0 w-full",
  input:
    "w-full h-[46px] rounded-md px-[16px] py-[12px] bg-white text-black text-[14px] placeholder-[#B0B0B0] focus:outline-none",
  emailInput: "mb-3",
  passwordInput: "mb-4",
  emailLoginButton:
    "w-full h-[46px] rounded-md bg-[#3B82F6] text-white font-medium mb-4 hover:bg-[#2563EB] transition-colors disabled:opacity-50",
  
  dividerContainer: "flex items-center w-full gap-2 mb-4",
  dividerLine: "flex-1 h-[1px] bg-[#4B4B4B]",
  dividerText: "text-[12px] text-[#B0B0B0]",

  kakaoLoginButton:
    "w-full h-[46px] rounded-md bg-[#FEE500] text-black font-medium flex items-center justify-center gap-2 mb-4 hover:bg-[#FDDD00] transition-colors",
  kakaoIcon: "w-[18px] h-[18px]",
  
  signupLink: "text-[#B0B0B0] text-[12px] cursor-pointer hover:underline",
};
