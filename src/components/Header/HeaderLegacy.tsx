import React from "react";
import { AddPhotoAlternateIcon, FolderOpenIcon } from "@/assets/icons/index";
import { legacyHeader, legacyButtonGroup, legacyButton } from "./Header.styled";

const HeaderLegacy: React.FC = () => {
  return (
    <div className={legacyHeader}>
      <div className={legacyButtonGroup}>
        <button className={legacyButton}>
          <AddPhotoAlternateIcon className="text-brand-gray h-3 w-3" />
          사진 추가하기
        </button>
        <button className={legacyButton}>
          <FolderOpenIcon className="text-brand-gray h-3 w-3" />
          파일 추가하기
        </button>
      </div>
    </div>
  );
};

export default HeaderLegacy;
