import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUserStore } from "@/store/userStore";
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
} from "@src/api/auth";

/** 카카오 리다이렉트 응답에서 토큰을 표준화한 타입 */
export type KakaoTokenPayload = {
  accessToken?: string;
  refreshToken?: string;
  [key: string]: unknown;
};

/** 응답에서 안전하게 토큰 페이로드만 추출 */
export function extractKakaoPayload(res: unknown): KakaoTokenPayload {
  if (res && typeof res === "object") {
    const obj = res as Record<string, unknown>;
    const inner =
      obj.data && typeof obj.data === "object"
        ? (obj.data as Record<string, unknown>)
        : obj;

    return {
      accessToken:
        typeof inner.accessToken === "string" ? inner.accessToken : undefined,
      refreshToken:
        typeof inner.refreshToken === "string" ? inner.refreshToken : undefined,
      ...inner,
    };
  }
  return {};
}

export const useSignUp = () =>
  useMutation({
    mutationFn: (body: SignUpBody) => signUpRequest(body),
  });

export const useLogin = () =>
  useMutation({
    mutationFn: (body: LoginBody) => loginRequest(body),
  });

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
    mutationFn: async () => {
      const api = (await import("@src/api/axiosInstance")).default;
      const baseURL = api.defaults.baseURL || "";
      window.location.href = `${baseURL}/auth/kakao`;
    },
  });

export const useKakaoRedirectLogin = () =>
  useMutation<KakaoTokenPayload, Error, string>({
    mutationFn: async (code: string) => {
      try {
        const raw = await kakaoRedirectLogin(code);
        return extractKakaoPayload(raw);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          // 401은 신규 유저를 의미하므로, 에러가 아닌 성공 케이스로 처리
          // 에러 응답 본문을 payload로 사용
          return extractKakaoPayload(error.response.data);
        }
        // 그 외 다른 에러는 그대로 던져서 onError 콜백을 트리거
        throw error;
      }
    },
  });

export const useUserProfile = () =>
  useQuery<UserProfileResponse>({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(),
  });

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateUserProfilePayload) => updateUserProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};

export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient();
  const { setProfilePicture } = useUserStore();
  return useMutation({
    mutationFn: (payload: { profilePicture: string }) =>
      updateProfilePicture(payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      localStorage.setItem("profilePicture", variables.profilePicture);
      setProfilePicture(variables.profilePicture);
    },
  });
};
