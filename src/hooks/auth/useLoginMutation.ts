import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      window.location.href = "/"; // 로그인 성공 후 메인으로 이동
    },
    onError: (error: any) => {
      alert("로그인 실패: " + (error.response?.data?.message || "알 수 없는 오류"));
    },
  });
};
