export type ButtonVariant =
  | "outlinePointWhite"   // 흰 배경 + 포인트 컬러 테두리/텍스트 (회원가입 완료 등)
  | "outlineGrayWhite"    // 흰 배경 + 회색 테두리/텍스트
  | "solidWhite"          // 흰 배경 + 회색 텍스트, 테두리 없음
  | "outlineGrayGray90"   // 회색계 배경 + 회색 테두리 (기존 유지)
  | "solidGray90"         // 진회색 배경
  | "solidDark"           // 거의 검정 배경 + 흰 글씨
  | "solidDarkAlt"        // 거의 검정 배경 + 회색 글씨
  | "primaryBlue"         // 파란 CTA (로그인: 이메일로 로그인)
  | "kakao"               // 카카오 로그인 버튼
  | "neutralOutline"      // 회색 보더/흰 배경/연한 회색 텍스트 (회원가입 취소 등)
  | "pillNeutral";        // 프로필 상단 우측 "취소하기 / 저장하기" pill 기반 (색상은 className으로 오버라이드)

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  leftIcon?: boolean;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
};
