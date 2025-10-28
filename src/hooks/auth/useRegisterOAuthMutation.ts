import { useMutation } from "@tanstack/react-query";
import { registerOAuth } from "@/api/auth";

export const useRegisterOAuthMutation = () => {
  return useMutation({
    mutationFn: registerOAuth,
    onSuccess: () => {
      alert("카카오 회원가입이 완료되었습니다!");
      window.location.href = "/login";
    },
    onError: (error: any) => {
      alert("카카오 회원가입 실패: " + (error.response?.data?.message || "알 수 없는 오류"));
    },
  });
};
