import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Blogfind = React.lazy(() => import('@/pages/Blogfind'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));
const BlogWrite = React.lazy(() => import('./pages/BlogWrite'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const SignupEmail = React.lazy(() => import('./pages/SignupEmail'));
const ProfileDetail = React.lazy(() => import('./pages/ProfileDetail'));
const ProfileFind = React.lazy(() => import('./pages/ProfileFind'));
const SignupKakao = React.lazy(() => import('./pages/SignupKakao'));
const KakaoRedirectPage = React.lazy(() => import('./pages/KakaoRedirectPage'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense
          fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}
        >
          <Routes>
            <Route path="/" element={<Blogfind />} />
            <Route path="/post/:id" element={<BlogDetail />} />
            <Route path="/write" element={<BlogWrite />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/email" element={<SignupEmail />} />
            <Route path="/profiledetail" element={<ProfileDetail />} />
            <Route path="/profilefind" element={<ProfileFind />} />
            <Route path="/signup/kakao" element={<SignupKakao />} />
            <Route path="/oauth/kakao/success" element={<KakaoRedirectPage />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
