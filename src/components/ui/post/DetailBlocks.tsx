import React, { useMemo } from "react";
import TextBox from "@ui/TextBox";

export type DetailBlock =
  | { type: "IMAGE"; order: number; value: string }
  | { type: "TEXT"; order: number; value: string };

export default function DetailBlocks({ blocks }: { blocks: DetailBlock[] }) {
  const sorted = useMemo(() => [...blocks].sort((a, b) => a.order - b.order), [blocks]);
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
}
