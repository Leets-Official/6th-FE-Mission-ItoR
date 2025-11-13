/** 이메일 형식 검증 (공백 불가, @와 도메인 필수) */
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** 비밀번호 검증: 영문, 숫자, 특수문자 포함 8자 이상 */
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+~\-=?<>]{8,}$/
