export type HeaderVariant = "write" | "chatMenu" | "action";

export interface HeaderProps {
  title?: string;
  variant?: HeaderVariant;
  onWriteClick?: () => void;
  onChatClick?: () => void;
  onMenuClick?: () => void;
  onDeleteClick?: () => void;
  onPublishClick?: () => void;
}
