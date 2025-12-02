import { createBrowserRouter } from 'react-router-dom'
import App from '@/App' // App을 루트 element로 등록
import HomePage from '@/pages/HomePage'
import SignUpPage from '@/pages/SignUpPage'
import SignUpEmailPage from '@/pages/SignUpEmailPage'
import SignUpKakaoPage from '@/pages/SignUpKakaoPage'
import BlogDetailPage from '@/pages/BlogDetailPage'
import BlogWritePage from '@/pages/BlogWritePage'
import SettingsPage from '@/pages/SettingsPage'
import AuthKakaoCallback from '@/pages/AuthKakaoCallback'
import RootLayout from '@/layouts/RootLayout'
import ProfilePage from '@/pages/ProfilePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App이 모든 페이지를 감싸는 루트 역할
    children: [
      {
        path: '/',
        element: <RootLayout />, // 공통 UI 감싸기
        children: [
          { index: true, element: <HomePage /> },
          { path: 'signup', element: <SignUpPage /> },
          { path: 'signup/email', element: <SignUpEmailPage /> },
          { path: 'signup/kakao', element: <SignUpKakaoPage /> },
          { path: 'oauth/kakao/callback', element: <AuthKakaoCallback /> },
          { path: 'oauth/kakao/success', element: <AuthKakaoCallback /> },
          { path: 'blog/:postId', element: <BlogDetailPage /> },
          { path: 'blogwrite', element: <BlogWritePage /> },
          { path: 'blogwrite/:postId', element: <BlogWritePage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
])

export default router
