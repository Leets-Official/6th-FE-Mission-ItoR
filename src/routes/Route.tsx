import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PostDetailPage from '../pages/PostDetailPage';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/post/:id', element: <PostDetailPage /> },
]);

export default router;
