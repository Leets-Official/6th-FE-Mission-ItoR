import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "@src/api/user";

export function useAuthStatus() {
  const hasToken =
    !!localStorage.getItem("accessToken") ||
    !!localStorage.getItem("refreshToken");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMyInfo,
    enabled: hasToken, // 토큰 없으면 /me 호출 안 함
    retry: false,
  });

  return {
    isLoggedIn: hasToken && !!data?.data && !isError,
    user: data?.data ?? null,
    isChecking: hasToken && isLoading,
  };
}
