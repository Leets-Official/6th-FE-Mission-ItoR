import { createBrowserRouter, Navigate } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import PostDetailPage from '../pages/PostDetailPage';
import WritePage from '../pages/WritePage';
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import SignUpFormPage from "../pages/SignUpFormPage";
import ProfilePage from "../pages/ProfilePage";
import AccountProfilePage from "../pages/AccountProfilePage";
import KakaoRedirectPage from "../pages/KakaoRedirectPage";
import OAuthSignUpPage from "../pages/OAuthSignUpPage";


const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/post/:id', element: <PostDetailPage /> },
  { path: '/write', element: <WritePage /> },
  { path: "/write/:id", element: <WritePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/join",  element: <SignUpPage /> },
  { path: "/join/email", element: <SignUpFormPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/account/profile", element: <AccountProfilePage /> },
  { path: "/oauth/kakao/success", element: <KakaoRedirectPage /> },
  { path: "/join/oauth", element: <OAuthSignUpPage /> },
  { path: '*', element: <Navigate to="/" replace /> },

  ]);

export default router; 