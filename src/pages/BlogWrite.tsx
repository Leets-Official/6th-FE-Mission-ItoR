import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import AddPhoto from "@/assets/svgs/add_photo_alternate.svg?react";
import LineEnd from "@/assets/svgs/LineEnd.svg?react";
import Toast from "@/components/Toast";
import { useCreatePost, useUpdatePost, useUploadImage } from "@/hooks/usePosts";
import { PostDetailResponse, PostBody, ContentBlock } from "@/api/posts";

const BlogWrite: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postToEdit = location.state as PostDetailResponse | undefined;

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState<ContentBlock[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createMutate } = useCreatePost();
  const { mutate: updateMutate } = useUpdatePost();
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContents(postToEdit.contents || []);
    } else {
      // Ensure there's always one text block for new posts
      setContents([{ contentOrder: 1, contentType: "TEXT", content: "" }]);
    }
  }, [postToEdit]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleContentChange = (index: number, newText: string) => {
    setContents((prev) =>
      prev.map((block, i) =>
        i === index ? { ...block, content: newText } : block
      )
    );
  };

  const handleAddPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadImage(file, {
      onSuccess: (url) => {
        const newImageBlock: ContentBlock = {
          contentOrder: contents.length + 1,
          contentType: "IMAGE",
          content: url,
        };
        // Add a new empty text block after the image
        const newTextBlock: ContentBlock = {
          contentOrder: contents.length + 2,
          contentType: "TEXT",
          content: "",
        };
        setContents((prev) => [...prev, newImageBlock, newTextBlock]);
      },
      onError: () => {
        showToast("이미지 업로드에 실패했습니다.");
      },
    });
  };

  const handlePost = useCallback(() => {
    const finalContents = contents
      .filter(block => block.content.trim() !== "")
      .map((block, index) => ({ ...block, contentOrder: index + 1 }));

    if (!title.trim() || finalContents.length === 0) {
      showToast("제목과 내용을 입력해주세요!");
      return;
    }

    const payload: PostBody = { title, contents: finalContents };

    const options = {
      onSuccess: (data: PostDetailResponse) => {
        showToast("저장되었습니다.");
        setTimeout(() => navigate(`/blog/${data.postId}`), 1500);
      },
      onError: () => {
        showToast("저장에 실패했습니다.");
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
          <Toast variant={toastMessage.includes("실패") ? "warning" : "success"} message={toastMessage} />
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

        {contents.map((block, index) => {
          if (block.contentType === "TEXT") {
            return (
              <textarea
                key={index}
                placeholder="어떠한 것을 깨달았나요?"
                value={block.content}
                onChange={(e) => handleContentChange(index, e.target.value)}
                className="w-full min-h-[100px] px-[16px] py-[12px] rounded-md text-[#333333] placeholder-[#909090] text-[14px] focus:outline-none resize-none"
              />
            );
          }
          if (block.contentType === "IMAGE") {
            return (
              <img
                key={index}
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
  );
};

export default BlogWrite;
