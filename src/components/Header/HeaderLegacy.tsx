import { AddPhotoAlternateIcon, FolderOpenIcon } from "@/assets/icons/index";
import { legacyHeader, legacyButtonGroup, legacyButton } from "./Header.styled";

interface HeaderLegacyProps {
  showPhotoButton?: boolean; // 사진 추가 버튼 표시 여부
  showFileButton?: boolean; // 파일 추가 버튼 표시 여부
}

const HeaderLegacy: React.FC<HeaderLegacyProps> = ({
  showPhotoButton = true,
  showFileButton = true,
}) => {
  return (
    <div className={legacyHeader}>
      <div className={legacyButtonGroup}>
        {showPhotoButton && (
          <button className={legacyButton}>
            <AddPhotoAlternateIcon className="text-brand-gray h-3 w-3" />
            사진 추가하기
          </button>
        )}
        {showFileButton && (
          <button className={legacyButton}>
            <FolderOpenIcon className="text-brand-gray h-3 w-3" />
            파일 추가하기
          </button>
        )}
      </div>
    </div>
  );
};

export default HeaderLegacy;
