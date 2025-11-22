// src/pages/WritePage.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import imageIcon from "@icons/image.svg";
import {
  useCreatePost,
  useUpdatePost,
  usePostDetail,
} from "@src/hooks/usePosts";
import { buildBlocks } from "@src/utils/blocks";
import { uploadImageToPresignedUrl } from "@src/api/imageApi";
import WriteHeader from "@src/components/write/WriteHeader";
import WriteEditor from "@src/components/write/WriteEditor";

export default function WritePage() {
  const { id } = useParams<{ id: string }>();
  const editingId = id ?? null;

  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const {
    data: detail,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = usePostDetail(editingId ?? "");

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!editingId) return;
    if (!detail) return;
    if (initialized) return;

    if (detail.title) {
      setTitle(detail.title);
    }

    if (Array.isArray(detail.blocks)) {
      const textBlocks = detail.blocks
        .filter((b) => b.type === "TEXT")
        .sort((a, b) => a.order - b.order)
        .map((b) => b.content ?? "");

      if (textBlocks.length > 0) {
        setBody(textBlocks.join("\n\n"));
      }

      const imageBlock = detail.blocks.find((b) => b.type === "IMAGE");
      if (imageBlock) {
        setImageUrl(imageBlock.url);
        setPreviewUrl(imageBlock.url);
      }
    }

    setInitialized(true);
  }, [editingId, detail, initialized]);

  const canPublish =
    title.trim().length > 0 &&
    (body.trim().length > 0 || !!imageUrl);

  const openFile = () => fileRef.current?.click();

  const onFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const localUrl = URL.createObjectURL(f);
    setPreviewUrl(localUrl);

    try {
      setIsUploadingImage(true);
      const uploadedUrl = await uploadImageToPresignedUrl(f);
      setImageUrl(uploadedUrl);
      setPreviewUrl(uploadedUrl);
    } catch (err) {
      console.error(err);
      alert("이미지 업로드에 실패했어요. 다시 시도해주세요.");
      setImageUrl(null);
      setPreviewUrl(null);
      if (fileRef.current) fileRef.current.value = "";
    } finally {
      setIsUploadingImage(false);
      URL.revokeObjectURL(localUrl);
    }
  };

  const resetAll = () => {
    setTitle("");
    setBody("");
    setImageUrl(null);
    setPreviewUrl(null);
    setInitialized(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const createMut = useCreatePost();
  const updateMut = useUpdatePost(editingId ?? "");

  const publish = () => {
    if (!canPublish || isUploadingImage) return;

    const payload = {
      title: title.trim(),
      blocks: buildBlocks(body, imageUrl ?? undefined),
    };

    if (editingId) {
      updateMut.mutate(payload, {
        onSuccess: () => nav(`/post/${editingId}`),
      });
    } else {
      createMut.mutate(payload, {
        onSuccess: (res) => {
          const newId =
            res && typeof res === "object" && "id" in res
              ? (res as { id?: string }).id
              : undefined;
          nav(newId ? `/post/${newId}` : "/");
        },
      });
    }
  };

  if (editingId && isDetailLoading) {
    return (
      <div className="flex min-h-dvh w-full items-center justify-center bg-white text-[14px] text-[var(--Gray56)]">
        게시글을 불러오는 중입니다...
      </div>
    );
  }

  if (editingId && isDetailError) {
    return (
      <div className="flex min-h-dvh w-full items-center justify-center bg-white text-[14px] text-[var(--Gray56)]">
        게시글을 불러오지 못했어요. 다시 시도해주세요.
      </div>
    );
  }

  const isPublishing =
    createMut.isPending || updateMut.isPending;

  return (
    <div className="page-shell">
      <WriteHeader
        canPublish={canPublish}
        isPublishing={isPublishing}
        isUploadingImage={isUploadingImage}
        onReset={resetAll}
        onPublish={publish}
      />

      <div className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="page-header-inner">
          <button
            type="button"
            onClick={openFile}
            className="inline-flex items-center gap-2 rounded-[4px] border border-[var(--Gray90)] bg-white px-3 py-2 text-[14px] font-light leading-[22.4px] text-[var(--Gray20)]"
          >
            <img
              src={imageIcon}
              alt=""
              className="h-[16px] w-[16px]"
            />
            <span>사진 추가하기</span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
        </div>
      </div>

      <WriteEditor
        title={title}
        body={body}
        previewUrl={previewUrl}
        onChangeTitle={setTitle}
        onChangeBody={setBody}
      />
    </div>
  );
}
