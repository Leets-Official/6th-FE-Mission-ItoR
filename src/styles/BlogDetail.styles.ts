// src/styles/BlogDetail.styles.ts

export const S = {
  loadingOrError: "flex justify-center items-center min-h-screen",
  container: "flex flex-col items-center w-full relative",
  
  toastContainer: "fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center",
  toastInner: "flex items-center gap-2 px-4 py-2 rounded-full border bg-white shadow-lg",
  toastSuccess: "border-success text-success",
  toastWarning: "border-danger text-danger",
  toastIcon: "text-success",
  toastText: "text-[14px]",

  postHeader: "w-[688px] border-b border-gray-300 py-8",
  postTitle: "font-medium text-[18px] text-gray-900",
  postMeta: "flex flex-row items-center text-sm text-gray-500 gap-2 mt-8",
  postMetaAuthor: "font-medium text-gray-900",
  postMetaSeparator: "text-gray-300",
  
  postBody: "w-[688px] p-4 text-gray-800 text-[14px] leading-[160%] mt-4 whitespace-pre-line",
  postImageWrapper: "w-[688px] mt-6 mb-6",
  postImage: "rounded-md w-full object-cover",

  commentSectionContainer: "w-[688px] mt-8",
  commentCount: "font-medium text-gray-900 text-[16px]",
  commentCountNumber: "text-info",

  commentListContainer: "mb-4",
  commentItemWrapper: "rounded-md p-3 mb-2 last:mb-0 relative",
  commentItemHeader: "flex items-center gap-2 mb-1",
  commentItemAuthor: "font-medium text-sm",
  commentItemDate: "text-xs text-gray-500",
  commentItemContent: "text-gray-800 text-sm ml-9",
  commentItemMenu: "absolute top-2 right-2",
  commentItemMenuIcon: "w-5 h-5 text-gray-700 cursor-pointer",

  commentFormContainer: "border border-gray-300 rounded-md mt-3 p-4",
  commentFormHeader: "flex items-center gap-2 mb-3",
  commentFormAuthor: "font-medium text-sm",
  commentFormTextarea: "w-full h-[100px] rounded-md px-3 py-2 text-[14px] leading-[160%] placeholder:text-gray-400 focus:outline-none resize-none border border-gray-300",
  commentFormFooter: "flex justify-end mt-2",
  commentFormLoginPrompt: "text-center text-gray-500 py-10",

  authorProfileContainer: "w-full h-[354px] border-b border-gray-300 bg-gray-200 flex justify-center items-start pt-4",
  authorProfileInner: "flex flex-col items-start w-[688px] py-4",
  authorProfileImage: "w-[64px] h-[64px] object-cover rounded-full mb-4 mt-10",
  authorProfileName: "text-[24px] font-medium text-gray-900",
  authorProfileIntro: "text-[14px] text-gray-700 mt-2",
};
