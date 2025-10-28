import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      alert("회원가입이 완료되었습니다!");
      window.location.href = "/login";
    },
    onError: (error: any) => {
      alert("회원가입 실패: " + (error.response?.data?.message || "알 수 없는 오류"));
    },
  });
};
