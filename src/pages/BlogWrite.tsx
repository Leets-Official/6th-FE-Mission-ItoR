import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import AddPhoto from "@/assets/svgs/add_photo_alternate.svg?react";
import LineEnd from "@/assets/svgs/LineEnd.svg?react";
import Toast from "@/components/Toast";
import { useCreatePost, useUpdatePost } from "@/hooks/usePosts";
import { PostDetailResponse, PostBody, ContentBlock } from "../api/posts";

const BlogWrite: React.FC = () => {
  const location = useLocation();
  const post = location.state as PostDetailResponse | undefined;

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState<ContentBlock[]>([]);
  const [toastVariant, setToastVariant] = useState<"success" | "warning" | null>(null);
  const timerRef = useRef<number | null>(null);

  const showToast = (variant: "success" | "warning") => {
    setToastVariant(variant);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToastVariant(null);
      timerRef.current = null;
    }, 3000);
  };

  // 중앙 관리되는 훅 사용
  const { mutate: createMutate } = useCreatePost();
  const { mutate: updateMutate } = useUpdatePost();

  // 기존 게시글 편집 모드 시 데이터 채우기
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContents(post.contents || []);
    }
  }, [post]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContents((prev) => {
      const hasText = prev.some(c => c.contentType === 'TEXT');
      if (hasText) {
        return prev.map(c => c.contentType === 'TEXT' ? { ...c, content: text } : c);
      } else {
        return [...prev, { contentOrder: prev.length + 1, content: text, contentType: "TEXT" }];
      }
    });
  };

  // 게시하기 버튼
  const handlePost = useCallback(() => {
    if (!title.trim() || contents.length === 0 || (contents.length === 1 && !contents[0].content.trim())) {
      showToast("warning");
      return;
    }

    const payload: PostBody = {
      title,
      contents,
    };

    if (post) {
      updateMutate({ id: post.postId, body: payload }, {
        onSuccess: () => showToast("success"),
      });
    } else {
      createMutate(payload, {
        onSuccess: () => showToast("success"),
      });
    }
  }, [title, contents, post, createMutate, updateMutate]);

  const toastMessage =
    toastVariant === "success"
      ? "저장되었습니다."
      : toastVariant === "warning"
      ? "내용을 입력해주세요!"
      : "";

  return (
    <div className="flex flex-col items-center w-full">
      <Header variant="edit" onPost={handlePost} />

      <div className="flex justify-center w-full max-w-[1366px] h-[49px] px-[12px] py-[12px] gap-[32px]">
        <div className="flex items-center justify-center w-[103px] h-[25px] px-[8px] py-[2px] gap-[4px] rounded-[2px] cursor-pointer">
          <AddPhoto className="w-[16px] h-[16px] text-[#909090]" />
          <span className="text-[#909090] text-[12px]">사진 추가하기</span>
        </div>
      </div>

      {toastVariant && (
        <div className="flex items-center justify-center mt-4 max-w-[688px]">
          <Toast variant={toastVariant} message={toastMessage} />
        </div>
      )}

      <div className="flex flex-col w-full max-w-[688px] mt-4 gap-2">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-[46px] px-[16px] py-[12px] rounded-md text-gray-900 placeholder-gray-400 text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-2 mb-2">
          <LineEnd />
        </div>

        <textarea
          placeholder="어떠한 것을 깨달았나요?"
          value={contents.find((c) => c.contentType === "TEXT")?.content || ""}
          onChange={handleTextChange}
          className="w-full min-h-[500px] px-[16px] py-[12px] rounded-md text-[#333333] placeholder-[#909090] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
    </div>
  );
};

export default BlogWrite;
