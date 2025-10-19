import ReorderIcon from "@icons/reorder.svg?react";
import kakaoIcon from "../assets/icons/kakao.svg";
import Spacer from "../components/ui/Spacer";

export default function SignUpPage() {
  return (
    <div className="min-h-dvh w-full bg-white flex flex-col">
      {/* 헤더 */}
      <header className="w-full bg-white/90 backdrop-blur-[2px] border-b border-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="메뉴 열기"
              className="w-6 h-6 inline-flex items-center justify-center"
            >
              <ReorderIcon className="w-6 h-6" />
            </button>
            <div className="logo-text select-none">GITLOG</div>
          </div>
          <div />
        </div>
      </header>

      {/* 회원가입 영역) */}
      <section className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8">
          <Spacer y={32} />
          <div className="mx-auto w-full max-w-[688px] px-4 py-3 flex flex-col justify-center items-start gap-3">
            <h1 className="text-[24px] leading-[38.4px] font-medium text-[var(--Black)]">회원가입</h1>
          </div>
          <Spacer y={20} />
        </div>
      </section>

      {/* 본문 */}
      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8">
          <div className="flex flex-col items-center gap-2 px-4 pt-0 pb-0 min-h-[548px]">
            {/* 중앙 컨테이너 */}
            <div className="w-full max-w-[782px] rounded-[9px] bg-[var(--White)] py-20 flex flex-wrap justify-center items-center">
              {/* 좌측 */}
              <div className="w-[308px] h-[160px] px-3 flex flex-col items-center justify-center">
                <div className="logo-text text-[64px] leading-none text-[var(--Black)] select-none">
                  GITLOG
                </div>
                <p className="mt-3 text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[var(--Gray56)]">
                  You can make anything by writing
                </p>
              </div>

              {/* 우측 */}
              <div className="flex min-w-[240px] max-w-[344px] w-full px-4 flex-col items-stretch gap-3">
                {/* 이메일로 회원가입 */}
                <button
                  type="button"
                  className="h-[45px] px-[14px] rounded-[6px] bg-[var(--Point)] text-[var(--White)]
                             text-[14px] leading-[22.4px] tracking-[-0.07px] flex items-center justify-center"
                >
                  이메일로 회원가입
                </button>

                {/* 구분선 */}
                <div className="flex items-center justify-center gap-2">
                  <span className="w-[123px] h-px bg-[var(--Gray96)]" />
                  <span className="text-[12px] leading-[19.2px] text-[var(--Gray56)]">또는</span>
                  <span className="w-[123px] h-px bg-[var(--Gray96)]" />
                </div>

                {/* 카카오로 회원가입 */}
                <button
                  type="button"
                  className="h-[45px] px-[14px] rounded-[6px] bg-[var(--KakaoBg)] text-[var(--KakaoText)]
                             text-[14px] leading-[22.4px] tracking-[-0.07px] flex items-center justify-center gap-1.5"
                >
                  <img src={kakaoIcon} alt="" className="w-[18px] h-[18px]" />
                  카카오로 회원가입
                </button>
              </div>
            </div>
          </div>

          <Spacer y={64} />
        </div>
      </main>
    </div>
  );
}
