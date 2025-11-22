// src/utils/validators.ts

export function validateEmail(value?: string) {
  const v = value?.trim();
  if (!v) return "이메일을 입력해주세요.";
  const regex =
    /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/;
  if (!regex.test(v)) return "이메일 형식이 올바르지 않습니다.";
  return null;
}

export function validatePassword(value?: string) {
  const v = value?.trim();
  if (!v) return "비밀번호를 입력해주세요.";
  if (v.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
  return null;
}

export function validatePasswordConfirm(pw?: string, pw2?: string) {
  if (!pw?.trim() || !pw2?.trim()) return null;
  if (pw.trim() !== pw2.trim()) return "비밀번호가 일치하지 않습니다.";
  return null;
}

export function validateNickname(value?: string) {
  const v = value?.trim();
  if (!v) return "닉네임을 입력해주세요.";
  if (v.length > 20) return "닉네임은 20자 이내로 입력해주세요.";
  return null;
}
