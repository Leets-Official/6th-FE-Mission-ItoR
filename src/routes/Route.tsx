import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layout/Layout';
import MainPage from '@/pages/main/MainPage';
import MyPage from '@/pages/mypage/MyPage';
import MyProfileForm from '@/components/mypage/MyProfileForm';
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
        path: 'mypage',
        element: <MyPage />,
        children: [
          {
            path: 'myprofile',
            element: (
              <PrivateRoute>
                <MyProfileForm />
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
