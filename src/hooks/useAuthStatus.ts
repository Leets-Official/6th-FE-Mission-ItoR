// src/hooks/useAuthStatus.ts
import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "@src/api/user";
import { hasAccessToken } from "@src/lib/authStorage";

export function useAuthStatus() {
  // 로그인 여부는 "accessToken 존재 여부"로만 판단
  const hasAccess = hasAccessToken();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMyInfo,
    enabled: hasAccess, // accessToken 있을 때만 /me 호출
    retry: false,
  });

  const isLoggedIn = hasAccess && !!data?.data && !isError;

  return {
    isLoggedIn,
    user: data?.data ?? null,
    isChecking: hasAccess && isLoading,
  };
}
