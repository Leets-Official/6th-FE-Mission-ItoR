import { useMutation } from "@tanstack/react-query";
import api from "@/api/axiosInstance";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post("/auth/register", payload);
      return data;
    },
    onSuccess: (res) => {
      console.log("회원가입 성공:", res);
    },
    onError: (err) => {
      console.error("회원가입 실패:", err);
    },
  });
};
