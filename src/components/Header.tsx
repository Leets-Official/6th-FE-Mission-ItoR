import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import CreateIcon from "@/assets/svgs/create.svg?react";
import ChatIcon from "@/assets/svgs/chat.svg?react";
import MoreVertIcon from "@/assets/svgs/more_vert.svg?react";
import ReorderIcon from "@/assets/svgs/reorder.svg?react";
import GitLog from "@/assets/svgs/Frame7.svg?react";
import DropdownMenu from "./DropdownMenu";
import { type Post } from "@/api/Dummy";
import Frame from "./Frame"; // Import Frame

// ✅ none 추가
type HeaderVariant = "write" | "detail" | "edit" | "profile" | "none";

interface HeaderProps {
  variant: HeaderVariant;
  onPost?: () => void;
  onDelete?: () => void;
  isLoggedIn?: boolean;
  isAuthor?: boolean;
  post?: Post;
}

const Header: React.FC<HeaderProps> = ({
  variant,
  onPost,
  onDelete,
  isLoggedIn = false,
  isAuthor = false,
  post,
}) => {
  const navigate = useNavigate();
  const [isFrameVisible, setIsFrameVisible] = useState(false);

  const toggleFrameVisibility = () => {
    setIsFrameVisible((prev) => !prev);
  };

  const handleWriteClick = () => {
    const loggedIn = true;
    if (loggedIn) navigate("/write");
    else navigate("/login");
  };

  return (
    <>
      <header className="relative w-[1366px] h-[72px] bg-white/90 backdrop-blur-sm z-10">
        <div className="absolute inset-0 flex items-center justify-between pl-[12px] pr-[16px]">
          {/* 좌측 로고 및 메뉴 */}
          <div className="flex items-center gap-4">
            <button type="button" aria-label="menu" className="w-6 h-6" onClick={toggleFrameVisibility}>
              <ReorderIcon className="w-6 h-6 text-gray-700" />
            </button>
            <div
              className="font-normal"
              style={{ fontFamily: "Smooch, sans-serif", fontSize: "20px" }}
            >
              <GitLog />
            </div>
          </div>

          {/* 우측 영역 */}
          <div className="flex items-center gap-4">
            {variant === "write" && (
              <Button
                variant="whiteGrayIcon"
                icon={<CreateIcon className="w-6 h-6 text-gray-700" />}
                onClick={handleWriteClick}
              >
                깃로그 쓰기
              </Button>
            )}

            {variant === "detail" && (
              <div className="flex items-center gap-4">
                <ChatIcon className="w-6 h-6 text-gray-700" />
                {isLoggedIn && isAuthor && post && (
                  <DropdownMenu
                    trigger={<MoreVertIcon className="w-6 h-6 text-gray-700 cursor-pointer" />}
                    items={[
                      { label: "수정하기", onClick: () => navigate("/write", { state: post }) },
                      { label: "삭제하기", onClick: onDelete ? () => onDelete() : undefined },
                    ]}
                    position="right"
                  />
                )}
              </div>
            )}

            {variant === "edit" && (
              <div className="flex items-center gap-6">
                <button type="button" className="text-[14px] text-[#FF3F3F]">
                  삭제하기
                </button>
                <button
                  type="button"
                  className="text-[14px] text-black"
                  onClick={onPost}
                >
                  게시하기
                </button>
              </div>
            )}

            {variant === "profile" && (
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  className="text-[14px] text-black"
                  onClick={onPost}
                >
                  수정하기
                </button>
              </div>
            )}

            {/* ✅ none일 경우 — 우측에 아무것도 렌더링하지 않음 */}
            {variant === "none" && null}
          </div>
        </div>
      </header>
      {/* Frame Overlay */}
      {isFrameVisible && (
        <div className="fixed top-0 left-0 z-50">
          <Frame
            username="홍길동"
            onButtonClick={() => alert("깃로그 시작하기 클릭!")}
            onClose={toggleFrameVisibility}
          />
        </div>
      )}
    </>
  );
};

export default Header;
