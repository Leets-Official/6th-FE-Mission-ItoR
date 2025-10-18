import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';

import PageHeader from '../components/ui/PageHeader';
import TextBox from '../components/ui/TextBox';
import TextField from '../components/ui/TextField';
import ProfilePhoto from '../components/ui/Profile';
import type { Post } from '../types/post';
import { postDetailMock, type CommentModel, type DetailBlock } from '../lib/mocks';

/* 데모 목록(상단 타이틀/라우팅 가드용) */
const POSTS: Post[] = [
  { id: 1, title: '32 Title one line', date: 'Feb 17, 2025.', author: { name: '닉네임', initial: 'G', bio: '한 줄 소개' }, detail: 'detail', commentCount: 12 },
  { id: 2, title: '32 Title one line', date: 'Feb 17, 2025.', author: { name: '닉네임', initial: 'G', bio: '한 줄 소개' }, detail: 'detail', commentCount: 8 },
  { id: 3, title: '32 Title one line', date: 'Feb 17, 2025.', author: { name: '닉네임', initial: 'G', bio: '한 줄 소개' }, detail: 'detail', commentCount: 0 },
];

/* 공용 Spacer */
const Spacer = ({ y = 32, className }: { y?: 20 | 32 | 64; className?: string }) => {
  const map: Record<20 | 32 | 64, string> = { 20: 'h-5', 32: 'h-8', 64: 'h-16' };
  return <div aria-hidden className={clsx('w-full', map[y], className)} />;
};

/* 유틸: 날짜 포맷 */
const formatDate = (iso: string) => {
  const d = new Date(iso);
  const month = d.toLocaleString('en-US', { month: 'short' });
  return `${month} ${d.getDate()}, ${d.getFullYear()}.`;
};

/* 섹션: 타이틀 + 메타 */
const TitleSection: React.FC<{ title: string; author: Post['author']; date: string; commentCount: number }> = ({
  title,
  author,
  date,
  commentCount,
}) => (
  <section className="flex max-w-[688px] py-3 flex-col items-start self-stretch">
    <div className="flex max-w-[688px] px-4 py-3 flex-col justify-center items-start gap-3 self-stretch">
      <TextBox tbStyle="primary" title={title} className="!w-[688px] !max-w-[688px] !p-0 !bg-transparent" />
    </div>

    <Spacer y={32} />

    <div className="flex w-[688px] px-4 py-3 flex-col items-start gap-10">
      <div className="flex items-center gap-2">
        <div className="flex w-5 h-5 items-center aspect-square">
          <ProfilePhoto size="sm" initial={author.initial} name={author.name} />
        </div>

        <span className="text-[12px] leading-[19.2px] font-normal text-[var(--Gray20)]">{author.name}</span>
        <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)]">· {date}</span>
        <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)]">· 댓글 {commentCount}개</span>
      </div>
    </div>
  </section>
);

/* 섹션: 본문 블록(TEXT/IMAGE) */
const DetailBlocksSection: React.FC<{ blocks: DetailBlock[] }> = ({ blocks }) => {
  const sorted = useMemo(() => [...blocks].sort((a, b) => a.order - b.order), [blocks]);
  return (
    <section className="flex flex-col items-center self-stretch">
      {sorted.map(b =>
        b.type === 'IMAGE' ? (
          <div key={b.order} className="w-full max-w-[688px] px-4 py-2">
            <img src={b.value} alt="" className="w-full h-auto object-cover rounded-[2px] bg-[var(--Gray96)]" />
          </div>
        ) : (
          <div key={b.order} className="w-full max-w-[688px] px-4 py-2">
            <TextBox
              tbStyle="single"
              text={b.value}
              className="!m-0 !p-0 !text-[14px] !leading-[22.4px] !font-light !text-[var(--Gray20)] tracking-[-0.07px]"
            />
          </div>
        ),
      )}
    </section>
  );
};

/* 섹션: 댓글 아이템 */
const CommentRow: React.FC<{ c: CommentModel }> = ({ c }) => (
  <div className="flex max-w-[688px] px-4 py-3 items-start gap-3 self-stretch">
    <div className="flex w-5 h-5 items-center">
      <ProfilePhoto size="sm" initial={c.nickName.charAt(0).toUpperCase()} name={c.nickName} />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="text-[12px] leading-[19.2px] font-normal text-[var(--Gray20)]">{c.nickName}</span>
        <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)]">· {formatDate(c.createdAt)}</span>
        {c.mine && <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)]">· 내 댓글</span>}
      </div>
      <p className="mt-1 text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[var(--Gray20)]">{c.content}</p>
    </div>
    {c.mine && (
      <button type="button" aria-label="more" className="px-2 text-[var(--Gray56)]">
        •••
      </button>
    )}
  </div>
);

/* 섹션: 댓글 입력 */
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
          <button
            type="button"
            onClick={() => (window.location.href = '/me')}
            className="h-10 px-4 rounded-[4px] border border-[var(--Gray90)] text-[14px] text-[var(--Gray33)]"
          >
            로그인하러 가기
          </button>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter' && value.trim()) onSubmit();
            }}
          />
        </div>
      </div>
    )}
  </>
);

/* 페이지 */
const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [search] = useSearchParams();
  const isLoggedIn = search.get('login') === '1';

  const post = POSTS.find(p => String(p.id) === id);
  if (!post) return <Navigate to="/" replace />;

  const detail = useMemo(() => postDetailMock, []);
  const author: Post['author'] = {
    name: detail.author.nickName,
    initial: detail.author.nickName.charAt(0).toUpperCase(),
    bio: detail.author.introduction ?? '',
  };

  /* 댓글 상태: mock 원본만 사용 */
  const [comments, setComments] = useState<CommentModel[]>(detail.comments);
  const [input, setInput] = useState('');

  const dateText = formatDate(detail.createdAt);
  const commentCount = comments.length;

  return (
    <div className="min-h-dvh w-full flex flex-col bg-[var(--White)]">
      <header className="w-full bg-white/90 backdrop-blur-[2px]">
        <div className="max-w-[1366px] w-full px-4 sm:px-6 md:px-8 mx-auto">
          <PageHeader variant="comment" />
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[688px]">
          <TitleSection title={post.title} author={author} date={dateText} commentCount={commentCount} />

          <Spacer y={32} />

          <DetailBlocksSection blocks={detail.contents} />

          <Spacer y={32} />

          <section className="flex flex-col items-start gap-10 flex-[1_0_0]">
            <CommentInput
              isLoggedIn={isLoggedIn}
              value={input}
              onChange={setInput}
              onSubmit={() => {
                const v = input.trim();
                if (!v || !isLoggedIn) return;
                const next: CommentModel = {
                  id: comments.length ? Math.max(...comments.map(x => x.id)) + 1 : 1,
                  content: v,
                  nickName: author.name,
                  profileUrl: detail.author.profileUrl,
                  createdAt: new Date().toISOString(),
                  mine: true,
                };
                setComments([next, ...comments]);
                setInput('');
              }}
            />

            <div className="w-full">
              {comments.map(c => (
                <CommentRow key={c.id} c={c} />
              ))}
            </div>

            <Spacer y={64} />
          </section>
        </div>

        {/* 작성자 정보 */}
        <section className="mt-6 w-full bg-[var(--Gray96)] border-t border-[var(--Gray96)]">
          <Spacer y={64} className="mx-auto max-w-[688px]" />
          <div className="mx-auto w-full max-w-[688px] px-4 py-3 flex flex-col items-start gap-3">
            <div className="flex w-16 h-16 items-center justify-start">
              <ProfilePhoto size="lg" initial={author.initial} name={author.name} />
            </div>
            <div className="flex flex-col items-start gap-1.5 w-full">
              <TextBox
                tbStyle="single"
                text={author.name}
                className="!m-0 !p-0 !bg-transparent !text-[24px] !leading-[38.4px] !font-medium !text-[var(--Black)] !text-left w-full"
              />
              <TextBox
                tbStyle="single"
                text={author.bio ?? ''}
                className="!m-0 !p-0 !bg-transparent !text-[14px] !leading-[22.4px] !font-light !text-[var(--Gray20)] tracking-[-0.07px] !text-left w-full"
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
