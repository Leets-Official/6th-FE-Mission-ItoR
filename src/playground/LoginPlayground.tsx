import { FC, useState } from 'react';
import { LoginModal } from '@/components/auth';
import LoginPage from '@/pages/auth/LoginPage';

const LoginPlayground: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          로그인 컴포넌트 플레이그라운드
        </h1>

        {/* 컨트롤 패널 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">테스트 컨트롤</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              로그인 모달 열기
            </button>
          </div>
        </div>

        {/* 로그인 페이지 미리보기 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            로그인 페이지 미리보기
          </h2>
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
            <LoginPage />
          </div>
        </div>

        {/* 모달 상태 표시 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">상태 정보</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              모달 상태: <span className="font-semibold">{isModalOpen ? '열림' : '닫힘'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 로그인 모달 */}
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default LoginPlayground;
