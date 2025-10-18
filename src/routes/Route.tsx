// src/routes/Route.tsx
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import PostDetailPage from '../pages/PostDetailPage';


// 라우터 "객체" 생성
const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/post/:id', element: <PostDetailPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router; 