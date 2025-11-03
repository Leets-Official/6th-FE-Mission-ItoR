import React from "react";
import TextField from "@ui/TextField";
import Button from "@ui/Button/Button";

type Props = {
  isLoggedIn: boolean;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
};

export default function CommentInput({ isLoggedIn, value, onChange, onSubmit }: Props) {
  return (
    <>
      <div className="flex max-w-[688px] px-4 items-center gap-2">
        <span className="text-[16px] leading-[25.6px] text-[var(--Black)]">댓글</span>
      </div>

      {!isLoggedIn ? (
        <>
          <div className="flex max-w-[688px] px-4 py-3 justify-center items-center self-stretch">
            <p className="text-center text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[var(--Gray-78,#C8C8C8)]">
              댓글을 입력하려면 로그인하세요.
            </p>
          </div>
          <div className="flex max-w-[688px] px-4 py-3">
            <Button type="button" className="px-4 rounded-[4px] h-10" onClick={() => (window.location.href = "/me")}>
              로그인하러 가기
            </Button>
          </div>
        </>
      ) : (
        <div className="flex max-w-[688px] px-4 py-3 flex-col gap-[10px] self-stretch">
          <div className="flex h-[66px] items-center gap-2">
            <TextField
              placeholder="댓글을 입력하세요..."
              fullWidth
              size="lg"
              className="!h-[66px] placeholder:text-gray-78"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && value.trim()) onSubmit();
              }}
            />
            <Button type="button" className="h-10 px-4" onClick={onSubmit} disabled={!value.trim()}>
              등록
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
