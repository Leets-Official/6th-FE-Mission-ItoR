import React from "react";
import TextBox from "@ui/TextBox";
import ProfilePhoto from "@ui/Profile";

export type AuthorView = {
  name: string;
  initial: string;
};

type Props = {
  title: string;
  author: AuthorView;
  date: string;
  commentCount: number;
};

export default function TitleSection({ title, author, date, commentCount }: Props) {
  return (
    <section className="flex max-w-[688px] py-3 flex-col items-start self-stretch">
      <div className="flex max-w-[688px] px-4 py-3 flex-col justify-center items-start gap-3 self-stretch">
        <TextBox
          tbStyle="primary"
          title={title}
          className="!w-[688px] !max-w-[688px] !p-0 !bg-transparent"
        />
      </div>

      <div className="flex w-[688px] px-4 py-3 flex-col items-start gap-10">
        <div className="flex items-center gap-2">
          <div className="flex w-5 h-5 items-center aspect-square">
            <ProfilePhoto size="sm" initial={author.initial} name={author.name} />
          </div>
          <span className="text-[12px] leading-[19.2px] font-normal text-[var(--Gray20)]">
            {author.name}
          </span>
          <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)]">· {date}</span>
          <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)]">
            · 댓글 {commentCount}개
          </span>
        </div>
      </div>
    </section>
  );
}
