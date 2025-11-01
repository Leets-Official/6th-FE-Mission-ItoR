import Button from "@ui/Button/Button";
import kakaoIcon from "@icons/kakao.svg";

type KakaoLoginButtonProps = {
  disabled?: boolean;
  className?: string;
};

export default function KakaoLoginButton({
  disabled,
  className,
}: KakaoLoginButtonProps) {
  const handleKakaoLogin = () => {
  if (disabled) return;
  import("@src/api/client").then(({ default: api }) => {
    const baseURL = api.defaults.baseURL || "";
    window.location.href = `${baseURL}/auth/kakao`;
  });
};

  return (
    <Button
      type="button"
      variant="kakao"
      className={className}
      onClick={handleKakaoLogin}
      disabled={disabled}
    >
      <>
        <img src={kakaoIcon} alt="" className="h-4 w-4" />
        카카오로 로그인
      </>
    </Button>
  );
}
