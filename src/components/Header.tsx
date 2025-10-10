// // import React from "react";
// // import { FaPen } from "react-icons/fa"; // 연필 아이콘
// // import { MdChat, MdMoreVert, MdReorder } from "react-icons/md"; // 채팅, 점 3개, reorder
// // import Button from "./Button";

// // type HeaderVariant = "write" | "detail" | "edit";

// // interface HeaderProps {
// //   variant: HeaderVariant;
// // }

// // const Header: React.FC<HeaderProps> = ({ variant }) => {
// //   return (
// //     <header className="relative w-[1366px] h-[72px] bg-white/90 backdrop-blur-sm">
// //       <div className="absolute inset-0 flex items-center justify-between pl-[12px] pr-[16px]">
// //         <div className="flex items-center gap-4">
// //           {/* 맨 왼쪽 reorder 아이콘 */}
// //           <button type="button" aria-label="menu" className="w-6 h-6">
// //             <MdReorder size={24} color="#333333" />
// //           </button>

// //           {/* 로고 */}
// //           <div className="font-normal" style={{ fontFamily: "Smooch, sans-serif", fontSize: "20px" }}>
// //             GITLOG
// //           </div>
// //         </div>

// //         <div className="flex items-center gap-4">
// //           {variant === "write" && (
// //             <Button
// //               variant="whiteGrayIcon" // border 없음
// //               icon={<FaPen size={16} className="inline-block" />}
// //             >
// //               깃로그 쓰기
// //             </Button>
// //           )}

// //           {variant === "detail" && (
// //             <div className="flex items-center gap-4">
// //               <MdChat size={24} color="#333333" />
// //               <MdMoreVert size={24} color="#333333" />
// //             </div>
// //           )}

// //           {variant === "edit" && (
// //             <div className="flex items-center gap-6">
// //               <button type="button" className="text-[14px] text-[#FF3F3F]">
// //                 삭제하기
// //               </button>
// //               <button type="button" className="text-[14px] text-black">
// //                 게시하기
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;


// import React from "react";
// import { FaPen } from "react-icons/fa";
// import { MdChat, MdMoreVert, MdReorder } from "react-icons/md";
// import Button from "./Button";

// type HeaderVariant = "write" | "detail" | "edit";

// interface HeaderProps {
//   variant: HeaderVariant;
// }

// const Header: React.FC<HeaderProps> = ({ variant }) => {
//   return (
//     <header className="relative w-[1366px] h-[72px] bg-white/90 backdrop-blur-sm">
//       <div className="absolute inset-0 flex items-center justify-between pl-[12px] pr-[16px]">
//         <div className="flex items-center gap-4">
//           <button type="button" aria-label="menu" className="w-6 h-6">
//             <MdReorder size={24} color="#333333" />
//           </button>
//           <div className="font-normal" style={{ fontFamily: "Smooch, sans-serif", fontSize: "20px" }}>
//             GITLOG
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           {variant === "write" && (
//             <Button
//               variant="whiteGrayIcon"
//               icon={<FaPen size={16} className="inline-block" />}
//             >
//               깃로그 쓰기
//             </Button>
//           )}

//           {variant === "detail" && (
//             <div className="flex items-center gap-4">
//               <MdChat size={24} color="#333333" />
//               <MdMoreVert size={24} color="#333333" />
//             </div>
//           )}

//           {variant === "edit" && (
//             <div className="flex items-center gap-6">
//               <button type="button" className="text-[14px] text-[#FF3F3F]">
//                 삭제하기
//               </button>
//               <button type="button" className="text-[14px] text-black">
//                 게시하기
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
