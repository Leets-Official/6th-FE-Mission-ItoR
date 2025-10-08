import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import { SidebarProps } from "./Sidebar.types";
import {
  baseSidebar,
  profileSection,
  container,
  nickname,
  intro,
  singleButtonWrapper,
  doubleButtonWrapper,
  footerButtons,
} from "./Sidebar.styled";

const Sidebar: React.FC<SidebarProps> = ({
  variant,
  nickname: userNickname,
  intro: userIntro,
  profileSrc,
  onMyPageClick,
  onSettingClick,
  onLogoutClick,
}) => {
  return (
    <aside className={baseSidebar}>
      {variant === "guest" && (
        <div className={profileSection}>
          <Avatar size="lg" src={profileSrc} />
          <p className={intro}>{"You can make anything by writing"}</p>
          <div className={singleButtonWrapper}>
            <Button label="깃로그 시작하기" variant="primaryOutline" size="sm" />
          </div>
        </div>
      )}

      {variant === "user" && (
        <>
          <div className={container}>
            <div onClick={onMyPageClick} className={profileSection}>
              <Avatar size="lg" src={profileSrc} />
              <p className={nickname}>{userNickname ?? "%{닉네임}"}</p>
              <p className={intro}>{userIntro ?? "한줄 소개"}</p>
            </div>

            <div className={doubleButtonWrapper}>
              <Button
                label="나의 깃로그"
                variant="primaryOutline"
                size="sm"
                onClick={onMyPageClick}
                fullWidth
              />
              <Button label="깃로그 쓰기" variant="primaryOutline" size="sm" fullWidth />
            </div>
          </div>

          <div className={footerButtons}>
            <Button
              label="설정"
              variant="secondaryOutline"
              size="sm"
              onClick={onSettingClick}
              fullWidth
            />
            <Button
              label="로그아웃"
              variant="secondaryOutline"
              size="sm"
              onClick={onLogoutClick}
              fullWidth
            />
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
