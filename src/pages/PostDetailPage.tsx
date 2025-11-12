import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams, Navigate } from "react-router-dom";
import Dropdown from "@ui/Dropdown";
import Modal from "@ui/Modal";
import ProfilePhoto from "@ui/Profile";
import TextBox from "@ui/TextBox";
import PageHeader from "@ui/PageHeader";
import Spacer from "@ui/Spacer";
import TitleSection, { AuthorView } from "@ui/Post/TitleSection";
import DetailBlocks, { DetailBlock } from "@ui/Post/DetailBlocks";
import CommentInput from "@ui/Post/CommentInput";
import ConfirmDialog from "@ui/ConfirmDialog";
import CommentList from "@ui/comment/CommentList";
import type { CommentView } from "@ui/comment/CommentItem";
import { usePostDetail } from "@src/hooks/usePosts";
import { useComments, useCreateComment, useUpdateComment, useDeleteComment } from "@src/hooks/useComments";

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const month = d.toLocaleString("en-US", { month: "short" });
  return `${month} ${d.getDate()}, ${d.getFullYear()}.`;
};

type ApiPostDetail = {
  id: string;
  title: string;
  createdAt?: string;
  author?: { nickname?: string; avatarUrl?: string; introduction?: string };
  blocks?: Array<{ type: "IMAGE"; order: number; url: string } | { type: "TEXT"; order: number; content: string }>;
  mine?: boolean;
};

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [search] = useSearchParams();
  const isLoggedIn = search.get("login") === "1";
  const navigate = useNavigate();

  const { data, isLoading, isError } = usePostDetail(id ?? "");
  const postIdForComments = id ?? "";
  const { data: serverComments = [] } = useComments(postIdForComments);
  const createMut = useCreateComment(postIdForComments);
  const updateMut = useUpdateComment(postIdForComments);
  const deleteMut = useDeleteComment(postIdForComments);

  const d = data as ApiPostDetail | undefined;

  const author: AuthorView | null = d
    ? { name: d.author?.nickname ?? "익명", initial: (d.author?.nickname ?? "U").charAt(0).toUpperCase() }
    : null;

  const blocks: DetailBlock[] = Array.isArray(d?.blocks)
    ? d!.blocks!.map((b) => (b.type === "IMAGE" ? { type: "IMAGE", order: b.order, value: b.url } : { type: "TEXT", order: b.order, value: b.content }))
    : [];

  const [input, setInput] = useState("");
  const [postDeleteOpen, setPostDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const dateText = d?.createdAt ? formatDate(d.createdAt) : "";
  const isMine = !!d?.mine;

  type ServerCommentFlexible = {
    id?: number; commentId?: number; content?: string; createdAt?: string;
    author?: { nickname?: string; avatarUrl?: string };
    nickName?: string; profileUrl?: string; mine?: boolean; isOwner?: boolean;
  };

  const comments: CommentView[] = (serverComments as ServerCommentFlexible[]).map((c) => ({
    id: (c.id ?? c.commentId ?? 0) as number,
    content: String(c.content ?? ""),
    createdAt: c.createdAt ?? new Date().toISOString(),
    nickName: c.author?.nickname ?? c.nickName ?? "익명",
    profileUrl: c.author?.avatarUrl ?? c.profileUrl,
    mine: Boolean(c.mine ?? c.isOwner),
  }));

  if (!id) return <Navigate to="/" replace />;
  if (isLoading) return <div className="min-h-dvh w-full flex items-center justify-center text-[14px] text-[var(--Gray56)]">로딩 중입니다...</div>;
  if (isError || !d || !author) return <Navigate to="/" replace />;

  const handleCreate = () => {
    const v = input.trim();
    if (!v || !isLoggedIn) return;
    createMut.mutate(v, { onSuccess: () => setInput("") });
  };
  const askDelete = (cid: number) => setDeleteId(cid);
  const confirmDelete = () => {
    if (!deleteId) return;
    deleteMut.mutate(deleteId, { onSettled: () => setDeleteId(null) });
  };
  const saveEdit = (cid: number, content: string) => updateMut.mutate({ commentId: cid, content });

  return (
    <div className="min-h-dvh w-full flex flex-col bg-[var(--White)]">
      <header className="w-full bg-white/90 backdrop-blur-[2px] relative">
        <div className="max-w-[1366px] w-full px-4 sm:px-6 md:px-8 mx-auto relative">
          <PageHeader variant="comment" onClickMore={() => {}} />
          {isMine && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50">
              <Dropdown
                position="right"
                trigger={<span className="block w-6 h-6" aria-label="더보기" />}
                items={[
                  { id: "edit", label: <span className="text-[14px] text-[var(--Black)]">수정하기</span>, onSelect: () => navigate(`/write/${id}`) },
                  { id: "delete", label: <span className="text-[14px] text-[var(--Negative)]">삭제하기</span>, onSelect: () => setPostDeleteOpen(true) },
                ]}
                caretOffset="md"
              />
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[688px]">
          <TitleSection title={d.title} author={author} date={dateText} commentCount={comments.length} />
          <Spacer y={32} />
          <DetailBlocks blocks={blocks} />
          <Spacer y={32} />

          <section className="flex flex-col items-start gap-10 flex-[1_0_0]">
            <CommentInput isLoggedIn={isLoggedIn} value={input} onChange={setInput} onSubmit={handleCreate} />
            <CommentList comments={comments} onDelete={askDelete} onEdit={saveEdit} />
            <Spacer y={64} />
          </section>
        </div>

        <section className="mt-6 w-full bg-[var(--Gray96)] border-t border-[var(--Gray96)]">
          <Spacer y={64} className="mx-auto max-w-[688px]" />
          <div className="mx-auto w-full max-w-[688px] px-4 py-3 flex flex-col items-start gap-3">
            <div className="flex w-16 h-16 items-center justify-start">
              <ProfilePhoto size="lg" initial={author.initial} name={author.name} />
            </div>
            <div className="flex flex-col items-start gap-1.5 w-full">
              <TextBox tbStyle="single" text={author.name} className="!m-0 !p-0 !bg-transparent !text-[24px] !leading-[38.4px] !font-medium !text-[var(--Black)] !text-left w-full" />
              <TextBox tbStyle="single" text={d.author?.introduction ?? ""} className="!m-0 !p-0 !bg-transparent !text-[14px] !leading-[22.4px] !font-light !text-[var(--Gray20)] tracking-[-0.07px] !text-left w-full" />
            </div>
          </div>
          <Spacer y={64} className="mx-auto max-w-[688px]" />
        </section>
      </main>

      <Modal
        open={postDeleteOpen}
        onClose={() => setPostDeleteOpen(false)}
        onCancel={() => setPostDeleteOpen(false)}
        onConfirm={() => navigate("/", { replace: true })}
        titleLines={["해당 블로그를 삭제하시겠어요?"]}
        descriptionLines={["삭제된 블로그는 다시 확인할 수 없어요."]}
        confirmText="삭제하기"
        cancelText="취소"
        confirmVariant="negative"
      />

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="댓글을 삭제하시겠어요?"
        description="삭제 후에는 복구할 수 없어요."
        confirmText="삭제"
        variant="negative"
      />
    </div>
  );
}
