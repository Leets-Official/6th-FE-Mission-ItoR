import { KakaoIcon } from "@/assets/icons";
import * as styles from "./Signup.styled";

interface SignupSectionProps {
  onSelect: (type: "email") => void; // ✅ 카카오는 직접 리다이렉트하므로 email만 필요
}

/**
 * ✅ 회원가입 선택 화면
 * - 이메일 / 카카오 중 선택
 * - 카카오는 바로 백엔드 OAuth 경로로 리다이렉트
 */
const SignupSection: React.FC<SignupSectionProps> = ({ onSelect }) => {
  const handleEmailSignup = () => onSelect("email");

  const handleKakaoSignup = () => {
    // ✅ 백엔드 카카오 OAuth 시작 경로로 이동
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/kakao`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoBox}>
        <h1 className={styles.logo}>GITLOG</h1>
        <p className={styles.subtitle}>You can make anything by writing</p>
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.emailButton} onClick={handleEmailSignup}>
          이메일로 회원가입
        </button>

        <p className={styles.divider}>또는</p>

        <button className={styles.kakaoButton} onClick={handleKakaoSignup}>
          <KakaoIcon className="h-5 w-5" />
          카카오로 회원가입
        </button>
      </div>
    </div>
  );
};

export default SignupSection;
