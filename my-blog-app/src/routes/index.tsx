import { createBrowserRouter } from 'react-router-dom'
import App from '@/App' // ✅ App을 루트 element로 등록
import HomePage from '@/pages/HomePage'
import SignUpPage from '@/pages/SignUpPage'
import SignUpEmailPage from '@/pages/SignUpEmailPage'
import SignUpKakaoPage from '@/pages/SignUpKakaoPage'
import BlogDetailPage from '@/pages/BlogDetailPage'
import BlogWritePage from '@/pages/BlogWritePage'
import AuthKakaoCallback from '@/pages/AuthKakaoCallback'

// test pages
import ButtonTestPage from '@/pages/test/ButtonTestPage'
import ToastTestPage from '@/pages/test/ToastTestPage'
import MenuTestPage from '@/pages/test/MenuTestPage'
import TextCardTestPage from '@/pages/test/TextCardTestPage'
import ConfirmModalTestPage from '@/pages/test/ConfirmModalTestPage'
import HeaderTestPage from '@/pages/test/HeaderTestPage'
import DropdownTestPage from '@/pages/test/DropdownTestPage'
import TextFiledTestPage from '@/pages/test/TextFiledTestPage'
import TextFiledSetTestPage from '@/pages/test/TextFiledSetTestPage'
import ProfileImageTestPage from '@/pages/test/ProfileImageTestPage'
import SidebarTestPage from '@/pages/test/SidebarTestPage'
import PaginationTestPage from '@/pages/test/PaginationTestPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App이 모든 페이지를 감싸는 루트 역할
    children: [
      { index: true, element: <HomePage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'signup/email', element: <SignUpEmailPage /> },
      { path: 'signup/kakao', element: <SignUpKakaoPage /> },
      { path: 'oauth/kakao/callback', element: <AuthKakaoCallback /> },
      { path: 'oauth/kakao/success', element: <AuthKakaoCallback /> },
      { path: 'post/:id', element: <BlogDetailPage /> },
      { path: 'blogwrite', element: <BlogWritePage /> },

      // 테스트 페이지들
      { path: 'test/button', element: <ButtonTestPage /> },
      { path: 'test/toast', element: <ToastTestPage /> },
      { path: 'test/menu', element: <MenuTestPage /> },
      { path: 'test/textcard', element: <TextCardTestPage /> },
      { path: 'test/confirmmodal', element: <ConfirmModalTestPage /> },
      { path: 'test/header', element: <HeaderTestPage /> },
      { path: 'test/dropdown', element: <DropdownTestPage /> },
      { path: 'test/textfiled', element: <TextFiledTestPage /> },
      { path: 'test/textfiledset', element: <TextFiledSetTestPage /> },
      { path: 'test/profileimage', element: <ProfileImageTestPage /> },
      { path: 'test/sidebar', element: <SidebarTestPage /> },
      { path: 'test/pagination', element: <PaginationTestPage /> },
    ],
  },
])

export default router
