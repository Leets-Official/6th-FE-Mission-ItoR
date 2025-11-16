// src/pages/WritePage.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import imageIcon from "@icons/image.svg";
import { useCreatePost, useUpdatePost, usePostDetail } from "@src/hooks/usePosts";
import { buildBlocks } from "@src/utils/blocks";
import { uploadImageToPresignedUrl } from "@src/api/imageApi";

export default function WritePage() {
  const { id } = useParams<{ id: string }>();
  const editingId = id ?? null;

  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // 실제 서버에 저장할 이미지 URL
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // 화면에 보여줄 미리보기(로컬/원격 둘 다 가능)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const {
    data: detail,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = usePostDetail(editingId ?? "");

  const [initialized, setInitialized] = useState(false);

  // 수정 모드일 때 기존 글 프리필
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
    title.trim().length > 0 && (body.trim().length > 0 || !!imageUrl);

  const openFile = () => fileRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // 로컬 미리보기 먼저
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
      // 필요하면 로컬 URL 정리
      URL.revokeObjectURL(localUrl);
    }
  };

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = el.scrollHeight + "px";
  }, [body]);

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

  return (
    <div className="flex min-h-dvh w-full flex-col bg-white">
      <header className="w-full border-b border-[var(--Gray96)] bg-white/90 backdrop-blur-[2px]">
        <div className="mx-auto flex h-[56px] w-full max-w-[1366px] items-center justify-between px-4 sm:px-6 md:px-8">
          <div className="logo-text text-[24px] leading-[1.2] text-[var(--Black)]">
            GITLOG
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={resetAll}
              className="rounded-[25px] border border-[var(--Gray90)] px-4 py-[6px] text-[14px] font-light leading-[22.4px] text-[var(--Negative)]"
            >
              삭제하기
            </button>
            <button
              type="button"
              onClick={publish}
              disabled={
                !canPublish ||
                createMut.isPending ||
                updateMut.isPending ||
                isUploadingImage
              }
              className={`rounded-[25px] border px-4 py-[6px] text-[14px] font-light leading-[22.4px] ${
                canPublish &&
                !createMut.isPending &&
                !updateMut.isPending &&
                !isUploadingImage
                  ? "border-[var(--Point,#00A1FF)] text-[var(--Point,#00A1FF)]"
                  : "border-[var(--Gray90)] text-[var(--Gray56)] opacity-40 cursor-not-allowed"
              }`}
            >
              {isUploadingImage ? "이미지 업로드 중..." : "게시하기"}
            </button>
          </div>
        </div>
      </header>

      <div className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto flex w-full max-w-[1366px] items-center px-4 py-2 sm:px-6 md:px-8">
          <button
            type="button"
            onClick={openFile}
            className="inline-flex items-center gap-2 rounded-[4px] border border-[var(--Gray90)] bg-white px-3 py-2 text-[14px] font-light leading-[22.4px] text-[var(--Gray20)]"
          >
            <img src={imageIcon} alt="" className="h-[16px] w-[16px]" />
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

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[688px] px-4 py-6">
          <section className="mb-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
              className={`w-full border-none px-0 text-[24px] font-medium leading-[38.4px] text-[var(--Black)] placeholder-[var(--Gray-78,#C8C8C8)] outline-none ${
                title ? "text-[var(--Black)]" : ""
              }`}
            />
          </section>

          <div
            className="mb-4 h-[1px] w-full bg-[var(--Gray90)]"
            role="separator"
            aria-hidden="true"
          />

          <section className="mb-6">
            <textarea
              ref={bodyRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="어떠한 것을 깨달았나요?"
              className="w-full resize-none border-none px-0 text-[14px] font-light leading-[22.4px] text-[var(--Gray20)] placeholder-[var(--Gray-78,#C8C8C8)] outline-none"
            />
          </section>

          {previewUrl && (
            <section className="mb-6">
              <img
                src={previewUrl}
                alt="preview"
                className="max-h-[400px] w-full rounded-[4px] object-cover"
              />
            </section>
          )}

          <div className="h-16" />
        </div>
      </main>
    </div>
  );
}
