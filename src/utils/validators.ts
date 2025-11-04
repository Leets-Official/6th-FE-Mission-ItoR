import type { FormValues } from "@src/hooks/useForm";

export function validateSignUp(values: FormValues) {
  const err: Record<string, string> = {};
  if (!values.email?.trim()) err.email = "이메일을 입력해주세요.";
  if (!values.password?.trim()) err.password = "비밀번호를 입력해주세요.";
  else if (values.password.length < 6) err.password = "비밀번호는 6자 이상이어야 합니다.";
  if (values.password2?.trim() !== values.password?.trim()) err.password2 = "비밀번호가 일치하지 않습니다.";
  if (!values.nickname?.trim()) err.nickname = "닉네임을 입력해주세요.";
  return err;
}

export const validateOAuthSignUp = validateSignUp;
