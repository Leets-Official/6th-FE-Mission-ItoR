import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import AddPhoto from "@/assets/svgs/add_photo_alternate.svg?react";
import LineEnd from "@/assets/svgs/LineEnd.svg?react";
import Toast from "@/components/Toast";
import { type Post } from "@/api/Dummy";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/axiosInstance";

// ✅ 게시글 본문 타입
interface ContentBlock {
  contentOrder: number;
  content: string;
  contentType: "TEXT";
}

// ✅ 게시글 생성/수정에 공통으로 쓰일 Payload 타입
interface PostPayload {
  title: string;
  contents: ContentBlock[];
}

const BlogWrite: React.FC = () => {
  const location = useLocation();
  const post = location.state as Post | undefined;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "warning" | null>(null);
  const timerRef = useRef<number | null>(null);

  // ✅ 게시글 생성 API
  const createPost = async (payload: PostPayload) => {
    const { data } = await api.post("/posts", payload);
    return data;
  };

  // ✅ 게시글 수정 API
  const updatePost = async ({
    id,
    payload,
  }: {
    id: number;
    payload: PostPayload;
  }) => {
    const { data } = await api.patch(`/posts/${id}`, payload);
    return data;
  };

  // ✅ React Query Hooks
  const { mutate: createMutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => showToast("success"),
    onError: (err: any) =>
      alert(err.response?.data?.message || "게시글 작성 중 오류가 발생했습니다."),
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => showToast("success"),
    onError: (err: any) =>
      alert(err.response?.data?.message || "게시글 수정 중 오류가 발생했습니다."),
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showToast = (variant: "success" | "warning") => {
    setToastVariant(variant);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToastVariant(null);
      timerRef.current = null;
    }, 3000);
  };

  // ✅ 게시하기 버튼
  const handlePost = () => {
    if (!title.trim() || !content.trim()) {
      showToast("warning");
      return;
    }

    const payload: PostPayload = {
      title,
      contents: [
        {
          contentOrder: 1,
          content,
          contentType: "TEXT",
        },
      ],
    };

    if (post) {
      updateMutate({ id: post.id, payload });
    } else {
      createMutate(payload);
    }
  };

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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[500px] px-[16px] py-[12px] rounded-md text-[#333333] placeholder-[#909090] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
    </div>
  );
};

export default BlogWrite;
