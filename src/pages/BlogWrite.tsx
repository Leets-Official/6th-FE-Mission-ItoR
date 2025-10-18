import React, { useState } from "react";
import Header from "@/components/Header";
import AddPhoto from "@/assets/svgs/add_photo_alternate.svg?react";
import LineEnd from "@/assets/svgs/LineEnd.svg?react";
import Toast from "@/components/Toast"; // Toast 컴포넌트 import

const BlogWrite: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "warning" | null>(null);

  // 게시하기 버튼 클릭 핸들러
  const handlePost = () => {
    if (!title || !content) {
      setToastVariant("warning");
    } else {
      setToastVariant("success");
      // 실제 API 연결 시 여기에 post 요청
    }

    // 3초 후 Toast 자동 제거
    setTimeout(() => setToastVariant(null), 5000);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Header
        variant="edit"
        onPost={handlePost} // Header에서 게시하기 버튼 클릭 시 호출
      />

      <div className="flex justify-center w-full max-w-[1366px] h-[49px] px-[12px] py-[12px] gap-[32px] opacity-100">
        <div className="flex items-center justify-center w-[103px] h-[25px] px-[8px] py-[2px] gap-[4px] rounded-[2px] cursor-pointer">
          <AddPhoto className="w-[16px] h-[16px] text-[#909090]" />
          <span className="text-[#909090] text-[12px] leading-[19px] whitespace-nowrap">
            사진 추가하기
          </span>
        </div>
      </div>

      {toastVariant && (
        <div className="felx items-center justify-center mt-4 max-w-[688px]">
          <Toast variant={toastVariant} />
        </div>
      )}

      <div className="flex flex-col w-full max-w-[688px] mt-4 gap-2">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full max-w-[688px] h-[46px] px-[16px] py-[12px] rounded-md text-gray-900 placeholder-gray-400 text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-2 mb-2">
          <LineEnd />
        </div>
        <textarea
          placeholder="어떠한 것을 깨달았나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full max-w-[688px] min-h-[500px] px-[16px] py-[12px] rounded-md text-[#333333] placeholder-[#909090] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
      </div>
    </div>
  );
};

export default BlogWrite;