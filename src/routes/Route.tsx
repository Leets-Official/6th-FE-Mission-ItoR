import { createBrowserRouter, Navigate } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import PostDetailPage from '../pages/PostDetailPage';
import WritePage from '../pages/WritePage';
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import SignUpFormPage from "../pages/SignUpFormPage";

import MyPage from "../pages/MyPage";                     
import AccountProfilePage from "../pages/AccountProfilePage";  

import KakaoRedirectPage from "../pages/KakaoRedirectPage";
import JoinOAuthPage from "../pages/JoinOAuthPage";

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },

  { path: '/post/:id', element: <PostDetailPage /> },
  { path: '/write', element: <WritePage /> },
  { path: '/write/:id', element: <WritePage /> },

  { path: "/login", element: <LoginPage /> },
  { path: "/join",  element: <SignUpPage /> },
  { path: "/join/email", element: <SignUpFormPage /> },

  // My Page (조회/수정)
  { path: "/me", element: <MyPage /> },
  { path: "/me/edit", element: <AccountProfilePage /> },

  // OAuth 관련
  { path: "/oauth/kakao/success", element: <KakaoRedirectPage /> },
  { path: "/join/oauth", element: <JoinOAuthPage /> },

  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router;
