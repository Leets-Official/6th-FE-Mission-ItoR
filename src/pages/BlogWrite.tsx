import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import AddPhoto from "@/assets/svgs/add_photo_alternate.svg?react";
import LineEnd from "@/assets/svgs/LineEnd.svg?react";
import Toast from "@/components/Toast";
import { useCreatePost, useUpdatePost, useUploadImage } from "@/hooks/usePosts";
import { PostDetailResponse, PostBody, ContentBlock } from "@/api/posts";

// Add a frontend-only ID for stable keys
type EditorBlock = ContentBlock & { frontendId: string };

const BlogWrite: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postToEdit = location.state as PostDetailResponse | undefined;

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState<EditorBlock[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false); // For IME handling
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const [nextFocusIndex, setNextFocusIndex] = useState<number | null>(null);

  const { mutate: createMutate } = useCreatePost();
  const { mutate: updateMutate } = useUpdatePost();
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  // Helper to create a unique ID
  const createFrontendId = () => `block-${Date.now()}-${Math.random()}`;

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      // Add frontendId to existing blocks
      setContents(
        postToEdit.contents?.map((block) => ({
          ...block,
          frontendId: createFrontendId(),
        })) || []
      );
    } else {
      // Ensure there's always one text block for new posts
      setContents([
        {
          contentOrder: 1,
          contentType: "TEXT",
          content: "",
          frontendId: createFrontendId(),
        },
      ]);
    }
  }, [postToEdit]);

  useEffect(() => {
    if (nextFocusIndex !== null && textInputRefs.current[nextFocusIndex]) {
      const target = textInputRefs.current[nextFocusIndex];
      if (target) {
        target.focus();
        target.setSelectionRange(0, 0);
      }
      setNextFocusIndex(null);
    }
  }, [nextFocusIndex, contents]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleContentChange = (frontendId: string, newText: string) => {
    setContents((prev) =>
      prev.map((block) =>
        block.frontendId === frontendId ? { ...block, content: newText } : block
      )
    );
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    if (isComposing) return; // Do not run on Enter if IME is composing

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const textarea = e.currentTarget;
      const cursorPosition = textarea.selectionStart;
      const currentContent = textarea.value;

      const contentBeforeCursor = currentContent.substring(0, cursorPosition);
      const contentAfterCursor = currentContent.substring(cursorPosition);

      setContents((prevContents) => {
        const currentBlock = prevContents[index];
        const updatedCurrentBlock = {
          ...currentBlock,
          content: contentBeforeCursor,
        };

        const newBlock: EditorBlock = {
          contentOrder: 0, // Placeholder
          contentType: "TEXT",
          content: contentAfterCursor,
          frontendId: createFrontendId(),
        };

        return [
          ...prevContents.slice(0, index),
          updatedCurrentBlock,
          newBlock,
          ...prevContents.slice(index + 1),
        ];
      });

      setNextFocusIndex(index + 1);
    }
  };

  const handleAddPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadImage(file, {
      onSuccess: (url) => {
        const newImageBlock: EditorBlock = {
          contentOrder: 0, // Placeholder
          contentType: "IMAGE",
          content: url,
          frontendId: createFrontendId(),
        };
        const newTextBlock: EditorBlock = {
          contentOrder: 0, // Placeholder
          contentType: "TEXT",
          content: "",
          frontendId: createFrontendId(),
        };
        setContents((prev) => [...prev, newImageBlock, newTextBlock]);
        setNextFocusIndex(contents.length + 1);
      },
      onError: () => {
        showToast("이미지 업로드에 실패했습니다.");
      },
    });
  };

  const handlePost = useCallback(() => {
    // 1. Filter and prepare blocks for backend
    const finalContents = contents
      .filter((block) => {
        if (block.contentType === "IMAGE") return true;
        return block.content.trim() !== "";
      })
      .map((block, index) => {
        // 2. Strip frontendId and set final contentOrder
        const { frontendId, ...backendBlock } = block;
        return { ...backendBlock, contentOrder: index + 1 };
      });

    if (!title.trim() || finalContents.length === 0) {
      showToast("제목과 내용을 입력해주세요!");
      return;
    }

    const payload: PostBody = { title, contents: finalContents };

    const options = {
      onSuccess: () => {
        showToast("저장되었습니다.");
        setTimeout(() => navigate("/"), 1500);
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "저장에 실패했습니다.";
        showToast(errorMessage);
      },
    };

    if (postToEdit) {
      updateMutate({ id: postToEdit.postId, body: payload }, options);
    } else {
      createMutate(payload, options);
    }
  }, [title, contents, postToEdit, createMutate, updateMutate, navigate]);

  return (
    <div className="flex flex-col items-center w-full pb-20">
      <Header variant="edit" onPost={handlePost} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        hidden
      />

      <div className="flex justify-center w-full max-w-[1366px] h-[49px] px-[12px] py-[12px] gap-[32px]">
        <button
          onClick={handleAddPhotoClick}
          disabled={isUploading}
          className="flex items-center justify-center w-[103px] h-[25px] px-[8px] py-[2px] gap-[4px] rounded-[2px] cursor-pointer disabled:opacity-50"
        >
          <AddPhoto className="w-[16px] h-[16px] text-[#909090]" />
          <span className="text-[#909090] text-[12px]">
            {isUploading ? "업로드 중..." : "사진 추가하기"}
          </span>
        </button>
      </div>

      {toastMessage && (
        <div className="flex items-center justify-center mt-4 max-w-[688px]">
          <Toast
            variant={
              toastMessage.includes("실패") || toastMessage.includes("오류")
                ? "warning"
                : "success"
            }
            message={toastMessage}
          />
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

        {/* Content Editor Wrapper */}
        <div className="w-full px-[16px] py-[12px] rounded-md text-[14px] focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500">
          {contents.map((block, index) => {
            if (block.contentType === "TEXT") {
              return (
                <textarea
                  ref={(el) => { textInputRefs.current[index] = el; }}
                  key={block.frontendId}
                  placeholder={
                    index === 0 && contents.length === 1 && block.content === ""
                      ? "어떠한 것을 깨달았나요?"
                      : ""
                  }
                  value={block.content}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => setIsComposing(false)}
                  onChange={(e) =>
                    handleContentChange(block.frontendId, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full bg-transparent text-[#333333] placeholder-[#909090] focus:outline-none resize-none overflow-hidden"
                  rows={1}
                />
              );
            }
            if (block.contentType === "IMAGE") {
              return (
                <img
                  key={block.frontendId}
                  src={block.content}
                  alt={`post-image-${index}`}
                  className="w-full rounded-md my-4 object-cover"
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogWrite;
