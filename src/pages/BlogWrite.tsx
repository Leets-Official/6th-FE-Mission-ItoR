import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import AddPhoto from "@/assets/svgs/add_photo_alternate.svg?react";
import LineEnd from "@/assets/svgs/LineEnd.svg?react";
import Toast from "@/components/Toast";
import { type Post } from "@/api/Dummy";

const BlogWrite: React.FC = () => {
  const location = useLocation();
  const post = location.state as Post | undefined; // 수정 대상 post (optional)

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "warning" | null>(null);

  const timerRef = useRef<number | null>(null);

  // 기존 post 내용이 있으면 초기값으로 설정
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  // 타이머 정리 (언마운트 시)
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handlePost = () => {
    // validation
    if (!title.trim() || !content.trim()) {
      setToastVariant("warning");
      // 5초 후 숨김
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setToastVariant(null);
        timerRef.current = null;
      }, 5000);
      return;
    }

    // 성공
    setToastVariant("success");

    // 실제 API: post ? update(post.id, {title,content}) : create(...)
    if (post) {
      console.log("수정된 글:", { id: post.id, title, content });
    } else {
      console.log("새 글 작성:", { title, content });
    }

    // 5초 후 숨김
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToastVariant(null);
      timerRef.current = null;
    }, 5000);
  };

  // toastVariant 에 따라 메시지 선택
  const toastMessage =
    toastVariant === "success" ? "저장되었습니다." : toastVariant === "warning" ? "내용을 입력해주세요!" : "";

  return (
    <div className="flex flex-col items-center w-full">
      <Header variant="edit" onPost={handlePost} />

      <div className="flex justify-center w-full max-w-[1366px] h-[49px] px-[12px] py-[12px] gap-[32px] opacity-100">
        <div className="flex items-center justify-center w-[103px] h-[25px] px-[8px] py-[2px] gap-[4px] rounded-[2px] cursor-pointer">
          <AddPhoto className="w-[16px] h-[16px] text-[#909090]" />
          <span className="text-[#909090] text-[12px] leading-[19px] whitespace-nowrap">
            사진 추가하기
          </span>
        </div>
      </div>

      {toastVariant && (
        <div className="flex items-center justify-center mt-4 max-w-[688px]">
          <Toast variant={toastVariant} message={toastMessage}/>
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
        />
      </div>
    </div>
  );
};

export default BlogWrite;
