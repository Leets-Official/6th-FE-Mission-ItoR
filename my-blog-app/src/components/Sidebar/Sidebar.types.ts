export type SidebarProps = {
  /** 로그인 여부 */
  isLoggedIn?: boolean

  /** 사용자 정보 */
  user?: {
    nickname: string
    bio?: string
  }

  /** 로그아웃 버튼 클릭 시 실행 */
  onLogout?: () => void

  /** 로그인 버튼 클릭 시 실행 */
  onLogin?: () => void

  /** 깃로그 쓰기 버튼 클릭 시 실행 */
  onWriteClick?: () => void
}
