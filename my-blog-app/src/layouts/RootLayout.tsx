import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <>
      <main>
        <Outlet /> {/* 여기 안에 실제 페이지가 렌더링됨 */}
      </main>
    </>
  )
}
