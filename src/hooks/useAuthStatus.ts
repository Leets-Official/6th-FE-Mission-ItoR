import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "@src/api/user";

export function useAuthStatus() {
  const { data, isError } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMyInfo,
    retry: false,
  });

  return {
    isLoggedIn: !!data?.data && !isError,
    user: data?.data ?? null,
  };
}
