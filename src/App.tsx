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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center py-12">블로그 애플리케이션</h1>
        <div className="text-center text-gray-600">
          <p>실제 블로그 애플리케이션 UI가 여기에 들어갑니다.</p>
          <p className="mt-2">
            컴포넌트 테스트를 보려면 <code className="bg-gray-200 px-2 py-1 rounded">?playground=1</code>을 URL에
            추가하세요.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
