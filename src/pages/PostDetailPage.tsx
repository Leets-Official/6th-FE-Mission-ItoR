// src/pages/PostDetailPage.tsx
import React, { useMemo, useState } from "react";
import clsx from "clsx";
import {
  useNavigate,
  useParams,
  useSearchParams,
  Navigate,
} from "react-router-dom";

import PageHeader from "../components/ui/PageHeader";
import TextBox from "../components/ui/TextBox";
import TextField from "../components/ui/TextField";
import ProfilePhoto from "../components/ui/Profile";
import Dropdown from "@ui/Dropdown";
import Modal from "@ui/Modal";
import Button from "../components/ui/Button/Button";

import { usePostDetail } from "@src/hooks/usePosts";
import { useComments, useCreateComment } from "@src/hooks/useComments";


/** ===== Local view types (UI 전용) ===== */
type AuthorView = {
  name: string;
  initial: string;
  bio?: string;
};

type DetailBlock =
  | { type: "IMAGE"; order: number; value: string }
  | { type: "TEXT"; order: number; value: string };

type CommentModel = {
  id: number;
  content: string;
  nickName: string;
  profileUrl?: string;
  createdAt: string;
  mine?: boolean;
};

/** ===== API 응답 타입(필요한 범위만) ===== */
type ApiPostDetail = {
  id: number;
  title: string;
  createdAt?: string;
  author?: {
    nickname?: string;
    avatarUrl?: string;
    introduction?: string;
  };
  blocks?: Array<
    | { type: "IMAGE"; order: number; url: string }
    | { type: "TEXT"; order: number; content: string }
  >;
  mine?: boolean;
};

/** ===== Spacer / Utils ===== */
const Spacer = ({
  y = 32,
  className,
}: {
  y?: 20 | 32 | 64;
  className?: string;
}) => {
  const map: Record<20 | 32 | 64, string> = {
    20: "h-5",
    32: "h-8",
    64: "h-16",
  };
  return <div aria-hidden className={clsx("w-full", map[y], className)} />;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const month = d.toLocaleString("en-US", { month: "short" });
  return `${month} ${d.getDate()}, ${d.getFullYear()}.`;
};

/** ===== Sections ===== */
const TitleSection: React.FC<{
  title: string;
  author: AuthorView;
  date: string;
  commentCount: number;
}> = ({ title, author, date, commentCount }) => (
  <section className="flex max-w-[688px] py-3 flex-col items-start self-stretch">
    <div className="flex max-w-[688px] px-4 py-3 flex-col justify-center items-start gap-3 self-stretch">
      <TextBox
        tbStyle="primary"
        title={title}
        className="!w-[688px] !max-w-[688px] !p-0 !bg-transparent"
      />
    </div>

    <Spacer y={32} />

    <div className="flex w-[688px] px-4 py-3 flex-col items-start gap-10">
      <div className="flex items-center gap-2">
        <div className="flex w-5 h-5 items-center aspect-square">
          <ProfilePhoto size="sm" initial={author.initial} name={author.name} />
        </div>
        <span className="text-[12px] leading-[19.2px] font-normal text-[var(--Gray20)]">
          {author.name}
        </span>
        <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)]">
          · {date}
        </span>
        <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)]">
          · 댓글 {commentCount}개
        </span>
      </div>
    </div>
  </section>
);

const DetailBlocksSection: React.FC<{ blocks: DetailBlock[] }> = ({
  blocks,
}) => {
  const sorted = useMemo(
    () => [...blocks].sort((a, b) => a.order - b.order),
    [blocks]
  );
  return (
    <section className="flex flex-col items-center self-stretch">
      {sorted.map((b) =>
        b.type === "IMAGE" ? (
          <div key={b.order} className="w-full max-w-[688px] px-4 py-2">
            <img
              src={b.value}
              alt=""
              className="w-full h-auto object-cover rounded-[2px] bg-[var(--Gray96)]"
            />
          </div>
        ) : (
          <div key={b.order} className="w-full max-w-[688px] px-4 py-2">
            <TextBox
              tbStyle="single"
              text={b.value}
              className="!m-0 !p-0 !text-[14px] !leading-[22.4px] !font-light !text-[var(--Gray20)] tracking-[-0.07px]"
            />
          </div>
        )
      )}
    </section>
  );
};

const CommentRow: React.FC<{ c: CommentModel }> = ({ c }) => (
  <div className="flex max-w-[688px] px-4 py-3 items-start gap-3 self-stretch">
    <div className="flex w-5 h-5 items-center">
      <ProfilePhoto
        size="sm"
        initial={c.nickName.charAt(0).toUpperCase()}
        name={c.nickName}
      />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="text-[12px] leading-[19.2px] font-normal text-[var(--Gray20)]">
          {c.nickName}
        </span>
        <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)]">
          · {formatDate(c.createdAt)}
        </span>
        {c.mine && (
          <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)]">
            · 내 댓글
          </span>
        )}
      </div>
      <p className="mt-1 text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[var(--Gray20)]">
        {c.content}
      </p>
    </div>
    {c.mine && (
      <button type="button" aria-label="more" className="px-2 text-[var(--Gray56)]">
        •••
      </button>
    )}
  </div>
);

const CommentInput: React.FC<{
  isLoggedIn: boolean;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}> = ({ isLoggedIn, value, onChange, onSubmit }) => (
  <>
    <div className="flex max-w-[688px] px-4 pt-4 pb-3 items-start gap-10 self-stretch" />
    <div className="flex max-w-[688px] px-4 items-center gap-2">
      <span className="text-[16px] leading-[25.6px] text-[var(--Black)]">댓글</span>
    </div>

    {!isLoggedIn && (
      <>
        <div className="flex max-w-[688px] px-4 py-3 justify-center items-center self-stretch">
          <p className="text-center text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[var(--Gray-78,#C8C8C8)]">
            댓글을 입력하려면 로그인하세요.
          </p>
        </div>
        <div className="flex max-w-[688px] px-4 py-3">
          <Button
            type="button"
            variant="neutralOutline"
            className="px-4 rounded-[4px] h-10"
            onClick={() => (window.location.href = "/me")}
          >
            로그인하러 가기
          </Button>
        </div>
      </>
    )}

    {isLoggedIn && (
      <div className="flex max-w-[688px] px-4 py-3 flex-col gap-[10px] self-stretch">
        <div className="flex h-[66px] items-center">
          <TextField
            placeholder="댓글을 입력하세요..."
            fullWidth
            size="lg"
            className="!h-[66px] placeholder:text-gray-78"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && value.trim()) onSubmit();
            }}
          />
        </div>
      </div>
    )}
  </>
);

/** ===== Page ===== */
const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postIdNum = Number(id);
  const hasValidNumericId = Number.isFinite(postIdNum) && postIdNum > 0;

  const [search] = useSearchParams();
  const isLoggedIn = search.get("login") === "1";
  const navigate = useNavigate();

  // 상세 조회 (훅은 조건 없이 항상 호출)
  const { data, isLoading, isError } = usePostDetail(
    hasValidNumericId ? postIdNum : 0
  );

  // 댓글: 훅 시그니처를 변경하지 않고 사용 (대개 string postId 사용)
  const postIdForComments = (id ?? "").toString();
  const { data: serverComments = [] } = useComments(postIdForComments);
  const createCommentMut = useCreateComment(postIdForComments);

  const d: ApiPostDetail | undefined = data as ApiPostDetail | undefined;

  const author: AuthorView | null = d
    ? {
        name: d.author?.nickname ?? "익명",
        initial: (d.author?.nickname ?? "U").charAt(0).toUpperCase(),
        bio: d.author?.introduction ?? "",
      }
    : null;

  const blocks: DetailBlock[] = Array.isArray(d?.blocks)
    ? d!.blocks!.map((b) =>
        b.type === "IMAGE"
          ? { type: "IMAGE", order: b.order, value: b.url }
          : { type: "TEXT", order: b.order, value: b.content }
      )
    : [];

  const [input, setInput] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const dateText = d?.createdAt ? formatDate(d.createdAt) : "";
  const isMine = !!d?.mine;

  // 서버 댓글을 화면 모델로 정규화 (hook 타입이 어떻게 와도 안전하게 매핑)
  type ServerCommentFlexible = {
    id?: number;
    commentId?: number;
    content?: string;
    createdAt?: string;
    author?: { nickname?: string; avatarUrl?: string };
    nickName?: string;
    profileUrl?: string;
    mine?: boolean;
    isOwner?: boolean;
  };

  const normalizedComments: CommentModel[] = (serverComments as ServerCommentFlexible[]).map(
    (c) => ({
      id: (c.id ?? c.commentId ?? 0) as number,
      content: String(c.content ?? ""),
      createdAt: c.createdAt ?? new Date().toISOString(),
      nickName: c.author?.nickname ?? c.nickName ?? "익명",
      profileUrl: c.author?.avatarUrl ?? c.profileUrl,
      mine: Boolean(c.mine ?? c.isOwner),
    })
  );

  const commentCount = normalizedComments.length;

  if (!hasValidNumericId) {
    return <Navigate to="/" replace />;
  }
  if (isLoading) {
    return (
      <div className="min-h-dvh w-full flex items-center justify-center text-[14px] text-[var(--Gray56)]">
        로딩 중입니다...
      </div>
    );
  }
  if (isError || !d || !author) {
    return <Navigate to="/" replace />;
  }

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
                  {
                    id: "edit",
                    label: (
                      <span className="text-[14px] text-[var(--Black)]">
                        수정하기
                      </span>
                    ),
                    onSelect: () => navigate(`/write/${postIdNum}`),
                  },
                  {
                    id: "delete",
                    label: (
                      <span className="text-[14px] text-[var(--Negative)]">
                        삭제하기
                      </span>
                    ),
                    onSelect: () => setConfirmOpen(true),
                  },
                ]}
                caretOffset="md"
              />
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[688px]">
          <TitleSection
            title={d.title}
            author={author}
            date={dateText}
            commentCount={commentCount}
          />
          <Spacer y={32} />
          <DetailBlocksSection blocks={blocks} />
          <Spacer y={32} />

          <section className="flex flex-col items-start gap-10 flex-[1_0_0]">
            <CommentInput
              isLoggedIn={isLoggedIn}
              value={input}
              onChange={setInput}
              onSubmit={() => {
                const v = input.trim();
                if (!v || !isLoggedIn) return;
                createCommentMut.mutate(v, { onSuccess: () => setInput("") });
              }}
            />

            <div className="w-full">
              {normalizedComments.map((c) => (
                <CommentRow key={`${c.id}-${c.createdAt}`} c={c} />
              ))}
            </div>

            <Spacer y={64} />
          </section>
        </div>

        <section className="mt-6 w-full bg-[var(--Gray96)] border-t border-[var(--Gray96)]">
          <Spacer y={64} className="mx-auto max-w-[688px]" />
          <div className="mx-auto w-full max-w-[688px] px-4 py-3 flex flex-col items-start gap-3">
            <div className="flex w-16 h-16 items-center justify-start">
              <ProfilePhoto
                size="lg"
                initial={author.initial}
                name={author.name}
              />
            </div>
            <div className="flex flex-col items-start gap-1.5 w-full">
              <TextBox
                tbStyle="single"
                text={author.name}
                className="!m-0 !p-0 !bg-transparent !text-[24px] !leading-[38.4px] !font-medium !text-[var(--Black)] !text-left w-full"
              />
              <TextBox
                tbStyle="single"
                text={author.bio ?? ""}
                className="!m-0 !p-0 !bg-transparent !text-[14px] !leading-[22.4px] !font-light !text-[var(--Gray20)] tracking-[-0.07px] !text-left w-full"
              />
            </div>
          </div>
          <Spacer y={64} className="mx-auto max-w-[688px]" />
        </section>
      </main>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => navigate("/", { replace: true })}
        titleLines={["해당 블로그를 삭제하시겠어요?"]}
        descriptionLines={["삭제된 블로그는 다시 확인할 수 없어요."]}
        confirmText="삭제하기"
        cancelText="취소"
        confirmVariant="negative"
      />
    </div>
  );
};

export default PostDetailPage;
