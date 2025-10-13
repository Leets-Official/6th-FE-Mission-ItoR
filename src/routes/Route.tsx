import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layout/Layout';
import MainPage from '@/pages/main/MainPage';
import BlogDetailPage from '@/pages/blog/BlogDetailPage';
import MyPage from '@/pages/mypage/MyPage';
import MyPageForm from '@/components/mypage/MyPageForm';
import MyProfileForm from '@/components/mypage/MyProfileForm';
import EditProfileForm from '@/components/mypage/EditProfileForm';
import SignupForm from '@/components/mypage/SignupForm';
import Playground from '@/playground/Playground';
import { PublicRoute } from '@/routes/PublicRoute';
import { PrivateRoute } from '@/routes/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'blog/:id',
        element: <BlogDetailPage />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
        children: [
          {
            index: true,
            element: (
              <PublicRoute>
                <MyPageForm />
              </PublicRoute>
            ),
          },
          {
            path: 'myprofile',
            element: (
              <PrivateRoute>
                <MyProfileForm />
              </PrivateRoute>
            ),
          },
          {
            path: 'editprofile',
            element: (
              <PrivateRoute>
                <EditProfileForm />
              </PrivateRoute>
            ),
          },
          {
            path: 'signup',
            element: (
              <PublicRoute>
                <SignupForm />
              </PublicRoute>
            ),
          },
        ],
      },
      {
        path: 'playground',
        element: <Playground />,
      },
    ],
  },
]);

export default router;
