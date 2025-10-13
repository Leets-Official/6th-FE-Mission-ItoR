import clsx from "clsx";
import type { FrameProps } from "./Frame.types";
import {
  frameBase,
  byVariant,
  topWrap,
  actionsRow,
  bottomWrap,
  avatarBox,
} from "./Frame.variants";
import ProfilePhoto from "@ui/Profile";
import TextBox from "@ui/TextBox";
import Button from "@ui/Button";

export default function Frame({
  variant = "guest",
  name = "%{닉네임}",
  intro = "%{한 줄 소개}",
  avatarSrc,
  initial,
  onStart,
  onMyGitlog,
  onWrite,
  onSettings,
  onLogout,
  className,
}: FrameProps) {
  const ctaBase = "h-[38px] rounded-[25px] whitespace-nowrap";
  const ctaFlexNone = clsx(ctaBase, "flex-none");
  const ctaFlex1 = clsx(ctaBase, "flex-1");
  const ctaFixed = clsx(ctaBase, "w-[99px]");

  return (
    <aside className={clsx(frameBase, byVariant[variant], className)}>
      <div className={topWrap}>
        <div className={avatarBox}>
          <ProfilePhoto size="lg" src={avatarSrc} initial={initial} name={name} />
        </div>

        {variant === "guest" ? (
          <>
            <TextBox tbStyle="primary" title={name} description={intro} className="w-full max-w-full bg-transparent" />
            <div className={actionsRow}>
              <Button variant="outlinePointWhite" className={ctaFlexNone} onClick={onStart}>
                깃로그 시작하기
              </Button>
            </div>
          </>
        ) : (
          <>
            <TextBox tbStyle="primary" title={name} description={intro} className="w-full max-w-full bg-transparent" />
            <div className={actionsRow}>
              <Button variant="outlinePointWhite" className={ctaFlex1} onClick={onMyGitlog}>
                나의 깃로그
              </Button>
              <Button variant="outlinePointWhite" className={ctaFlex1} onClick={onWrite}>
                깃로그 쓰기
              </Button>
            </div>
          </>
        )}
      </div>

      {variant === "member" && (
        <div className={bottomWrap}>
          <Button variant="outlineGrayWhite" className={ctaFixed} onClick={onSettings}>
            설정
          </Button>
          <Button variant="outlineGrayWhite" className={ctaFixed} onClick={onLogout}>
            로그아웃
          </Button>
        </div>
      )}
    </aside>
  );
}
