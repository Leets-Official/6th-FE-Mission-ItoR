import router from '@/routes/Route';
import Playground from '@/playground/Playground';
import { RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';

function App() {
  const isPlayground = useMemo(() => {
    // 빌드 시에는 플레이그라운드 비활성화
    if (ENABLE_PLAYGROUND === 'false') {
      return false;
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get('playground') === '1') {
      return true;
    }
    return import.meta.env.VITE_PLAYGROUND === '1';
  }, []);

  if (isPlayground) {
    return <Playground />;
  }

  return (
    <div className="global-layout">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
