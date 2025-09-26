import Playground from '@/playground/Playground';
import { useMemo } from 'react';

function App() {
  const isPlayground = useMemo(() => {
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
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-6xl">
        <h1 className="py-12 text-center text-4xl font-bold">블로그 애플리케이션</h1>
        <div className="text-gray-600 text-center">
          <p>실제 블로그 애플리케이션 UI가 여기에 들어갑니다.</p>
          <p className="mt-2">
            컴포넌트 테스트를 보려면 <code className="bg-gray-200 rounded px-2 py-1">?playground=1</code>을 URL에
            추가하세요.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
