// src/hooks/useAuthStatus.ts
import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "@src/api/user";
import { hasAnyToken } from "@src/lib/authStorage";

export function useAuthStatus() {
  const hasToken = hasAnyToken();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMyInfo,
    enabled: hasToken,
    retry: false,
  });

  return {
    isLoggedIn: hasToken && !!data?.data && !isError,
    user: data?.data ?? null,
    isChecking: hasToken && isLoading,
  };
}
