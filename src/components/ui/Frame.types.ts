export type FrameVariant = "guest" | "member";

export interface FrameProps {
  variant?: FrameVariant;

  name?: string;
  intro?: string;
  avatarSrc?: string;
  initial?: string;

  /** 액션 핸들러 */
  onStart?: () => void;      // guest CTA
  onMyGitlog?: () => void;   // member 상단 좌측 버튼
  onWrite?: () => void;      // member 상단 우측 버튼
  onSettings?: () => void;   // member 하단 좌측 버튼
  onLogout?: () => void;     // member 하단 우측 버튼

  className?: string;
}
