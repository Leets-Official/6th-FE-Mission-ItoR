import React from "react";
import Dropdown from "@ui/Dropdown"; 
import TextField from "@ui/TextField"; 
import Button from "@ui/Button/Button"; 
import ProfilePhoto from "@ui/Profile";

export type CommentView = {
  id: number;
  content: string;
  nickName: string;
  profileUrl?: string;
  createdAt: string;
  mine?: boolean;
};

type Props = {
  c: CommentView;
  onRequestDelete: (id: number) => void;
  onSaveEdit: (id: number, content: string) => void;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const m = d.toLocaleString("en-US", { month: "short" });
  return `${m} ${d.getDate()}, ${d.getFullYear()}.`;
};

export default function CommentItem({ c, onRequestDelete, onSaveEdit }: Props) {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(c.content);

  const startEdit = () => {
    setEditing(true);
    setValue(c.content);
  };
  const cancelEdit = () => {
    setEditing(false);
    setValue(c.content);
  };
  const save = () => {
    const v = value.trim();
    if (!v) return;
    onSaveEdit(c.id, v);
    setEditing(false);
  };

  return (
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

        {!editing ? (
          <p className="mt-1 text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[var(--Gray20)]">
            {c.content}
          </p>
        ) : (
          <div className="mt-2 flex items-center gap-2">
            <TextField
              fullWidth
              size="lg"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") save();
                if (e.key === "Escape") cancelEdit();
              }}
            />
            <Button type="button" className="h-10 px-3" onClick={save} disabled={!value.trim()}>
              저장
            </Button>
            <Button type="button" variant="neutralOutline" className="h-10 px-3" onClick={cancelEdit}>
              취소
            </Button>
          </div>
        )}
      </div>

      {c.mine && !editing && (
        <Dropdown
          position="right"
          caretOffset="md"
          trigger={
            <button type="button" aria-label="more" className="px-2 text-[var(--Gray56)]">
              •••
            </button>
          }
          items={[
            { id: "edit", label: <span className="text-[14px]">수정</span>, onSelect: startEdit },
            {
              id: "delete",
              label: <span className="text-[14px] text-[var(--Negative)]">삭제</span>,
              onSelect: () => onRequestDelete(c.id),
            },
          ]}
        />
      )}
    </div>
  );
}
