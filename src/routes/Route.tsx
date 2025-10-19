// src/routes/Route.tsx
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import PostDetailPage from '../pages/PostDetailPage';
import WritePage from '../pages/WritePage';
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";


// 라우터 "객체" 생성
const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/post/:id', element: <PostDetailPage /> },
  { path: '/write', element: <WritePage /> },
  { path: '*', element: <Navigate to="/" replace /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/join",  element: <SignUpPage /> },
]);

export default router; 