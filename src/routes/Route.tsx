import { Routes, Route } from 'react-router-dom';
import Layout from '@/layout/Layout';
import MainPage from '@/pages/main/MainPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
}
