// src/components/post/PostAuthorSection.tsx
import React from "react";
import Spacer from "@ui/Spacer";
import ProfilePhoto from "@ui/Profile";
import TextBox from "@ui/TextBox";

type Props = {
  name: string;
  initial: string;
  introduction?: string;
};

export default function PostAuthorSection({
  name,
  initial,
  introduction,
}: Props) {
  return (
    <section className="mt-6 w-full bg-[var(--Gray96)] border-t border-[var(--Gray96)]">
      <Spacer y={64} className="mx-auto max-w-[688px]" />
      <div className="mx-auto w-full max-w-[688px] px-4 py-3 flex flex-col items-start gap-3">
        <div className="flex w-16 h-16 items-center justify-start">
          <ProfilePhoto size="lg" initial={initial} name={name} />
        </div>
        <div className="flex flex-col items-start gap-1.5 w-full">
          <TextBox
            tbStyle="single"
            text={name}
            className="!m-0 !p-0 !bg-transparent !text-[24px] !leading-[38.4px] !font-medium !text-[var(--Black)] !text-left w-full"
          />
          <TextBox
            tbStyle="single"
            text={introduction ?? ""}
            className="!m-0 !p-0 !bg-transparent !text-[14px] !leading-[22.4px] !font-light !text-[var(--Gray20)] tracking-[-0.07px] !text-left w-full"
          />
        </div>
      </div>
      <Spacer y={64} className="mx-auto max-w-[688px]" />
    </section>
  );
}
