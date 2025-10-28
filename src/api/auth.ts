export const kakaoLoginRedirect = async (code: string): Promise<KakaoLoginResult> => {
  try {
    const res = await api.get(`/auth/kakao/redirect?code=${code}`);
    const { accessToken, refreshToken, user } = res.data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return { user, isNewUser: false };
  } catch (error) {
    const axiosError = error as {
      response?: {
        status?: number;
        data?: {
          code?: number;
          message?: string;
          data?: KakaoUserData;
        };
      };
    };

    console.log("카카오 에러 상태:", axiosError.response?.status);
    console.log("카카오 에러 응답:", axiosError.response?.data);

    // 404: 신규 회원
    if (axiosError.response?.status === 404) {
      return {
        user: null,
        isNewUser: true,
        kakaoUser: axiosError.response.data?.data,
      };
    }

    // 500: 서버 에러이지만 카카오 데이터가 있는 경우 회원가입 진행
    if (axiosError.response?.status === 500) {
      const kakaoData = axiosError.response.data?.data;
      if (kakaoData) {
        console.log("500 에러이지만 카카오 데이터 존재, 회원가입 진행:", kakaoData);
        return {
          user: null,
          isNewUser: true,
          kakaoUser: kakaoData,
        };
      }
    }

    throw error;
  }
};
