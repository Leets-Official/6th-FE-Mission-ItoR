import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import CreateIcon from "@/assets/svgs/create.svg?react";
import ChatIcon from "@/assets/svgs/chat.svg?react";
import MoreVertIcon from "@/assets/svgs/more_vert.svg?react";
import ReorderIcon from "@/assets/svgs/reorder.svg?react";
import GitLog from "@/assets/svgs/Frame7.svg?react";
import DropdownMenu from "./DropdownMenu";
import { type PostDetailResponse } from "@/api/posts";
import Frame from "./Frame";

// ✅ none, profile-edit 추가
type HeaderVariant = "write" | "detail" | "edit" | "profile" | "profile-edit" | "none";

interface HeaderProps {
  variant: HeaderVariant;
  onPost?: () => void;
  onDelete?: () => void;
  onCancel?: () => void; // onCancel prop 추가
  isLoggedIn?: boolean;
  isAuthor?: boolean;
  post?: PostDetailResponse;
}

const Header: React.FC<HeaderProps> = ({
  variant,
  onPost,
  onDelete,
  onCancel, // onCancel prop 받기
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
    const loggedIn = !!localStorage.getItem("accessToken");
    if (loggedIn) navigate("/write");
    else navigate("/login");
  };

  return (
    <>
      <header className="w-full h-[72px] bg-white/90 backdrop-blur-sm flex items-center justify-between px-4">
        {/* 좌측 로고 및 메뉴 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="menu"
            className="p-2"
            onClick={toggleFrameVisibility}
          >
            <ReorderIcon className="w-6 h-6 text-gray-700" />
          </button>
          <GitLog className="cursor-pointer" onClick={() => navigate("/")} />
        </div>

        {/* 우측 영역 (데스크톱) */}
        <div className="hidden md:flex items-center gap-1">
          {variant === "write" && (
            <Button
              variant="whiteGrayIcon"
              icon={<CreateIcon className="w-6 h-6 text-gray-700" />}
              onClick={handleWriteClick}
              className="h-10 py-2 px-3 rounded-full flex items-center justify-center"
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

          {variant === "profile-edit" && (
            <div className="flex items-center gap-6">
                          <button
                            type="button"
                            className="text-[14px] text-[#FF3F3F]"
                            onClick={onCancel}
                          >
                            취소하기
                          </button>              <button
                type="button"
                className="text-[14px] text-black"
                onClick={onPost}
              >
                저장하기
              </button>
            </div>
          )}

          {/* ✅ none일 경우 — 우측에 아무것도 렌더링하지 않음 */}
          {variant === "none" && null}
        </div>
      </header>
      {/* Frame Overlay */}
      {isFrameVisible && (
        <div className="fixed top-0 left-0 z-50">
          <Frame onClose={toggleFrameVisibility} />
        </div>
      )}
    </>
  );
};

export default Header;
