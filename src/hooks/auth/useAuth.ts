import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useUserStore } from '@/store/userStore';
import {
  signUpRequest,
  loginRequest,
  oauthRegisterRequest,
  reissueToken,
  kakaoRedirectLogin,
  getUserProfile,
  updateUserProfile,
  updateProfilePicture,
  type SignUpBody,
  type LoginBody,
  type OAuthSignUpBody,
  type ReissueBody,
  type UserProfileResponse,
  type UpdateUserProfilePayload,
} from '@src/api/auth';

/** 카카오 리다이렉트 응답에서 토큰을 표준화한 타입 */
export type KakaoTokenPayload = {
  accessToken?: string;
  refreshToken?: string;
  kakaoId?: number;
  email?: string;
  name?: string;
  nickname?: string;
  picture?: string;
  introduction?: string;
  [key: string]: unknown;
};

/** 응답에서 안전하게 토큰 페이로드만 추출 */
export function extractKakaoPayload(res: unknown): KakaoTokenPayload {
  if (res && typeof res === 'object') {
    const obj = res as Record<string, unknown>;
    const inner =
      obj.data && typeof obj.data === 'object' ? (obj.data as Record<string, unknown>) : obj;

    return {
      accessToken: typeof inner.accessToken === 'string' ? inner.accessToken : undefined,
      refreshToken: typeof inner.refreshToken === 'string' ? inner.refreshToken : undefined,
      kakaoId: typeof inner.kakaoId === 'number' ? inner.kakaoId : undefined,
      email: typeof inner.email === 'string' ? inner.email : undefined,
      name: typeof inner.name === 'string' ? inner.name : undefined,
      nickname: typeof inner.nickname === 'string' ? inner.nickname : undefined,
      picture: typeof inner.picture === 'string' ? inner.picture : undefined,
      introduction: typeof inner.introduction === 'string' ? inner.introduction : undefined,
      ...inner,
    };
  }
  return {};
}

export const useSignUp = () =>
  useMutation({
    mutationFn: (body: SignUpBody) => signUpRequest(body),
  });

export const useLogin = () => {
  const { login } = useUserStore();
  return useMutation({
    mutationFn: (body: LoginBody) => loginRequest(body),
    onSuccess: (data) => {
      login({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        nickname: data.nickname || '',
        introduction: data.introduction || '',
        profilePicture: data.profilePicture || '',
      });
    },
  });
};

// OAuth 회원가입
export const useOAuthSignUp = () =>
  useMutation({
    mutationFn: (body: OAuthSignUpBody) => oauthRegisterRequest(body),
  });

export const useReissue = () =>
  useMutation({
    mutationFn: (body: ReissueBody) => reissueToken(body),
  });

export const useKakaoStart = () =>
  useMutation<void, unknown, void>({
    mutationFn: () => {
      // 현재 환경에 맞는 Redirect URI 설정
      const redirectUri = `${window.location.origin}/auth/kakao/success`;

      // 백엔드 카카오 로그인 엔드포인트로 이동
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/kakao`;
      return Promise.resolve();
    },
  });

export const useKakaoRedirectLogin = () =>
  useMutation<KakaoTokenPayload, Error, string>({
    mutationFn: async (code: string) => {
      try {
        const raw = await kakaoRedirectLogin(code);
        const payload = extractKakaoPayload(raw);
        return payload;
      } catch (error) {
        console.error('카카오 로그인 에러:', error);

        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            // 401은 신규 유저를 의미 - 회원가입 필요
            const payload = extractKakaoPayload(error.response.data);

            // kakaoId가 있는지 확인
            if (!payload.kakaoId) {
              console.error('kakaoId가 없습니다:', payload);
              throw new Error('카카오 사용자 정보를 가져올 수 없습니다.');
            }

            return payload;
          }
        }

        // 그 외 다른 에러는 그대로 던지기
        throw error;
      }
    },
  });

export const useUserProfile = () =>
  useQuery<UserProfileResponse>({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(),
  });

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateUserProfilePayload) => updateUserProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};

export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient();
  const { setProfilePicture } = useUserStore();
  return useMutation({
    mutationFn: (payload: { profilePicture: string }) => updateProfilePicture(payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      localStorage.setItem('profilePicture', variables.profilePicture);
      setProfilePicture(variables.profilePicture);
    },
  });
};
