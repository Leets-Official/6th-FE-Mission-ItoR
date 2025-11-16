import CommentItem, { CommentView } from "@ui/comment/CommentItem";

type Props = {
  comments: CommentView[];
  onDelete: (id: number) => void;
  onEdit: (id: number, content: string) => void;
};

export default function CommentList({ comments, onDelete, onEdit }: Props) {
  return (
    <div className="w-full">
      {comments.map((c) => (
        <CommentItem
          key={`${c.id}-${c.createdAt}`}
          c={c}
          onRequestDelete={onDelete}
          onSaveEdit={onEdit}
        />
      ))}
    </div>
  );
}
