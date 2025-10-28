export type ProfileImageProps = {
  /** 프로필 이미지 주소 (선택) */
  src?: string

  /** 프로필에 표시할 텍스트 */
  label?: string

  /** 사이즈 옵션 */
  size?: 'xl' | 'lg' | 'md' | 'sm'
}
