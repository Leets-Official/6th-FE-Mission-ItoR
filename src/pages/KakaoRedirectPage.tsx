import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'signup_needed'>(
    'loading'
  );
  const hasProcessed = useRef(false);

  useEffect(() => {
    // 중복 실행 방지
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const handleKakaoLogin = async () => {
      if (!code) {
        console.error('인증 코드가 없습니다.');
        setStatus('error');
        return;
      }

      try {
        console.log('백엔드로 코드 전송:', code);

        // 순수 axios 사용 (인터셉터 없이)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/kakao/redirect`, {
          params: { code: code },
        });

        console.log('백엔드 응답:', response);

        // 응답 데이터 구조 확인
        const responseData = response.data;

        // 토큰이 있는 경우 (로그인 성공)
        let accessToken: string | null = null;
        let refreshToken: string | null = null;

        // 다양한 응답 구조 처리
        if (responseData.data?.accessToken) {
          accessToken = responseData.data.accessToken;
          refreshToken = responseData.data.refreshToken;
        } else if (responseData.accessToken) {
          accessToken = responseData.accessToken;
          refreshToken = responseData.refreshToken;
        }

        if (accessToken) {
          // 토큰 저장
          localStorage.setItem('accessToken', accessToken);
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
          }

          // 추가 사용자 정보 저장 (있다면)
          if (responseData.data?.nickname) {
            localStorage.setItem('nickname', responseData.data.nickname);
          }
          if (responseData.data?.profilePicture) {
            localStorage.setItem('profilePicture', responseData.data.profilePicture);
          }
          if (responseData.data?.introduction) {
            localStorage.setItem('introduction', responseData.data.introduction);
          }

          console.log('로그인 성공 - 토큰 저장 완료');
          setStatus('success');

          // 짧은 지연 후 메인 페이지로 이동
          setTimeout(() => {
            window.location.href = '/';
          }, 500);
        } else {
          // 토큰이 없으면 회원가입 필요
          console.log('회원가입이 필요합니다.');
          setStatus('signup_needed');
          setTimeout(() => {
            navigate('/signup/kakao', {
              state: {
                ...responseData.data,
                ...responseData,
              },
            });
          }, 1500);
        }
      } catch (error: any) {
        console.error('카카오 로그인 처리 중 에러:', error);

        // 401 에러는 회원가입 필요
        if (error.response?.status === 401) {
          console.log('401 에러 - 회원가입 필요');
          console.log('에러 응답 데이터:', error.response?.data);

          setStatus('signup_needed');
          setTimeout(() => {
            navigate('/signup/kakao', {
              state: error.response?.data?.data || error.response?.data,
            });
          }, 1500);
        } else {
          setStatus('error');
          console.error('에러 상세:', error.response?.data || error.message);
        }
      }
    };

    handleKakaoLogin();
  }, [code, navigate]);

  // 로딩 상태별 UI
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">카카오 로그인 처리 중...</h2>
          <p className="text-gray-600">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center p-8">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-xl font-semibold mb-2">로그인 성공!</h2>
          <p className="text-gray-600">메인 페이지로 이동합니다...</p>
        </div>
      </div>
    );
  }

  if (status === 'signup_needed') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold mb-2">회원가입이 필요합니다</h2>
          <p className="text-gray-600">회원가입 페이지로 이동합니다...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center p-8">
          <div className="text-red-500 text-5xl mb-4">✕</div>
          <h2 className="text-xl font-semibold mb-2">로그인 처리 중 오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-4">다시 시도해주세요</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default KakaoRedirectPage;
