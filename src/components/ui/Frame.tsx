import clsx from "clsx";
import type { FrameProps } from "@ui/Frame.types";
import {
  frameBase,
  byVariant,
  topWrap,
  actionsRow,
  bottomWrap,
  avatarBox,
} from "@ui/Frame.variants";

import ProfilePhoto from "@ui/Profile";
import TextBox from "@ui/TextBox";
import Button from "@ui/Button";

/** 좌측 사이드 프레임 */
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
  return (
    <aside className={clsx(frameBase, byVariant[variant], className)}>
      {/* 상단 */}
      <div className={topWrap}>
        <div className={avatarBox}>
          <ProfilePhoto size="lg" src={avatarSrc} initial={initial} name={name} />
        </div>

        {variant === "guest" ? (
          <>
            <TextBox
              tbStyle="primary"
              title={name}
              description={intro}
              className="w-full max-w-full bg-transparent"
            />
            <div className={actionsRow}>
              {/* 깃로그 시작하기: 38px, 라운드 25px, 파란 테두리/흰 배경, 줄바꿈 금지 */}
              <Button
                variant="outlinePointWhite"
                className="h-[38px] rounded-[25px] flex-none whitespace-nowrap"
                onClick={onStart}
              >
                깃로그 시작하기
              </Button>
            </div>
          </>
        ) : (
          <>
            <TextBox
              tbStyle="primary"
              title={name}
              description={intro}
              className="w-full max-w-full bg-transparent"
            />
            <div className={actionsRow}>
              {/* 두 버튼: 38px, 라운드 25px, flex-1, 줄바꿈 금지 */}
              <Button
                variant="outlinePointWhite"
                className="h-[38px] rounded-[25px] flex-1 whitespace-nowrap"
                onClick={onMyGitlog}
              >
                나의 깃로그
              </Button>
              <Button
                variant="outlinePointWhite"
                className="h-[38px] rounded-[25px] flex-1 whitespace-nowrap"
                onClick={onWrite}
              >
                깃로그 쓰기
              </Button>
            </div>
          </>
        )}
      </div>

      {/* 하단(member만) */}
      {variant === "member" && (
        <div className={bottomWrap}>
          {/* 설정/로그아웃: 38px, 너비 99px, 회색 테두리/흰 배경, 줄바꿈 금지 */}
          <Button
            variant="outlineGrayWhite"
            className="h-[38px] w-[99px] rounded-[25px] whitespace-nowrap"
            onClick={onSettings}
          >
            설정
          </Button>
          <Button
            variant="outlineGrayWhite"
            className="h-[38px] w-[99px] rounded-[25px] whitespace-nowrap"
            onClick={onLogout}
          >
            로그아웃
          </Button>
        </div>
      )}
    </aside>
  );
}
