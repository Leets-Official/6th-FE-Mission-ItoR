import React from "react";
import clsx from "clsx";
import { useParams, Navigate } from "react-router-dom";

import PageHeader from "../components/ui/PageHeader";
import TextBox from "../components/ui/TextBox";
import TextField from "../components/ui/TextField";
import ProfilePhoto from "../components/ui/Profile";
import type { Post } from "../types/post";

const POSTS: Post[] = [
  { id: 1, title: "32 Title one line", date: "Feb 17, 2025.", author: { name: "닉네임", initial: "G", bio: "한 줄 소개" }, detail: "detail", commentCount: 12 },
  { id: 2, title: "32 Title one line", date: "Feb 17, 2025.", author: { name: "닉네임", initial: "G", bio: "한 줄 소개" }, detail: "detail", commentCount: 8 },
  { id: 3, title: "32 Title one line", date: "Feb 17, 2025.", author: { name: "닉네임", initial: "G", bio: "한 줄 소개" }, detail: "detail", commentCount: 0 },
];

/* ===== 공용 Spacer ===== */
type SpacerProps = { y: 20 | 32 | 64; className?: string };
const Spacer: React.FC<SpacerProps> = ({ y, className }) => {
  const map: Record<number, string> = { 20: "h-5", 32: "h-8", 64: "h-16" };
  return <div aria-hidden className={clsx("w-full", map[y], className)} />;
};

/* ===== 섹션들 ===== */
const TitleSection: React.FC<{ title: string; author: Post["author"]; date: string; commentCount: number }> = ({
  title,
  author,
  date,
  commentCount,
}) => (
  <section className="flex max-w-[688px] py-3 flex-col items-start self-stretch">
    <div className="flex max-w-[688px] px-4 py-3 flex-col justify-center items-start gap-3 self-stretch">
      <TextBox
        tbStyle="primary"
        title={title}
        className="!w-[688px] !max-w-[688px] !p-0 !bg-transparent "
      />
    </div>

    <Spacer y={32} />

    <div className="flex w-[688px] px-4 py-3 flex-col items-start gap-10">
      <div className="flex items-center gap-2">
        <div className="flex w-5 h-5 items-center aspect-square">
          <ProfilePhoto size="sm" initial={author.initial} name={author.name} />
        </div>

        <span className="text-[12px] leading-[19.2px] font-normal text-[var(--Gray20)] ">
          {author.name}
        </span>

        <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)] ">
          · {date}
        </span>

        <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)] ">
          · 댓글 {commentCount}개
        </span>
      </div>
    </div>
  </section>
);

const BodySection: React.FC<{ detail?: string }> = ({ detail }) => (
  <section className="flex flex-col items-center self-stretch">
    <div className="w-full max-w-[688px] px-4">
      <TextBox
        tbStyle="single"
        text={detail ?? "detail"}
        className="!m-0 !p-0  !text-[14px] !leading-[22.4px] !font-light !text-[var(--Gray20)] tracking-[-0.07px]"
      />
    </div>
  </section>
);

const CommentsSection: React.FC<{ count: number }> = ({ count }) => (
  <section className="flex flex-col items-start gap-10 flex-[1_0_0]">
    <div className="flex max-w-[688px] px-4 pt-4 pb-3 items-start gap-10 self-stretch" />

    <div className="flex max-w-[688px] px-4 items-center gap-2">
      <span className="text-[16px] leading-[25.6px] font-normal  tracking-[-0.04px] text-[var(--Black)]">
        댓글
      </span>
      <span className="text-[16px] leading-[25.6px] font-medium  tracking-[-0.04px] text-[var(--Point)]">
        {count}
      </span>
    </div>

    <div className="flex max-w-[688px] px-4 py-3 justify-center items-center gap-[10px] self-stretch">
      <p className="text-center text-[14px] leading-[22.4px] font-light  tracking-[-0.07px] text-[var(--Gray-78,#C8C8C8)]">
        댓글을 입력해 보세요.
      </p>
    </div>

    <Spacer y={20} />

    <div className="flex max-w-[688px] px-4 py-3 flex-col justify-center items-center gap-[10px] self-stretch">
      <div className="flex max-w-[688px] px-4 py-3 flex-col justify-center items-center gap-[10px] self-stretch h-[66px]">
        <TextField
          placeholder="댓글을 입력하세요..."
          fullWidth
          size="lg"
          className="!h-[66px] placeholder:text-gray-78"
        />
      </div>
    </div>

    <Spacer y={64} />
  </section>
);

/* ===== 페이지 ===== */
const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = POSTS.find((p) => String(p.id) === id);
  if (!post) return <Navigate to="/" replace />;

  const commentCount = post.commentCount ?? 0;

  return (
    <div className="min-h-dvh w-full flex flex-col bg-[var(--White)]">
      <header className="w-full bg-white/90 backdrop-blur-[2px]">
        <div className="max-w-[1366px] w-full px-4 sm:px-6 md:px-8 mx-auto">
          <PageHeader variant="comment" />
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[688px]">
          <TitleSection title={post.title} author={post.author} date={post.date} commentCount={commentCount} />

          <Spacer y={32} />

          <BodySection detail={post.detail} />

          <Spacer y={32} />

          <CommentsSection count={commentCount} />
        </div>

        {/* 작성자 정보 섹션 (기존 유지) */}
        <section className="mt-6 w-full bg-[var(--Gray96)] border-t border-[var(--Gray96)]">
          <Spacer y={64} className="mx-auto max-w-[688px]" />

          <div className="mx-auto w-full max-w-[688px] px-4 py-3 flex flex-col items-start gap-3">
            <div className="flex w-16 h-16 items-center justify-start">
              <ProfilePhoto size="lg" initial={post.author.initial} name={post.author.name} />
            </div>

            <div className="flex flex-col items-start gap-1.5 w-full">
              <TextBox
                tbStyle="single"
                text={post.author.name}
                className="!m-0 !p-0 !bg-transparent  !text-[24px] !leading-[38.4px] !font-medium !text-[var(--Black)] !text-left w-full"
              />
              <TextBox
                tbStyle="single"
                text={post.author.bio ?? ""}
                className="!m-0 !p-0 !bg-transparent  !text-[14px] !leading-[22.4px] !font-light !text-[var(--Gray20)] tracking-[-0.07px] !text-left w-full"
              />
            </div>
          </div>

          <Spacer y={64} className="mx-auto max-w-[688px]" />
        </section>

        <section className="w-full bg-[var(--White)]">
          <div className="max-w-[1366px] w-full mx-auto px-4 sm:px-6 md:px-8 py-8" />
        </section>
      </main>
    </div>
  );
};

export default PostDetailPage;
