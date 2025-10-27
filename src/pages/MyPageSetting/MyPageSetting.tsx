import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header/Header";
import Avatar from "@/components/Avatar/Avatar";
import TextFieldSet from "@/components/Text/TextFieldSet";
import Modal from "@/components/Modal/Modal";
import { PlusIcon, KakaoIcon } from "@/assets/icons";
import * as S from "./MyPageSetting.styled";
import TextField from "@/components/Text/TextField";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useLogout } from "@/hooks/useLogout";

interface MyPageSettingProps {
  loginType: "email" | "kakao";
}

export default function MyPageSetting({ loginType }: MyPageSettingProps) {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isLogoutModalOpen, handleLogoutClick, handleConfirmLogout, handleCloseLogoutModal } =
    useLogout();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [form, setForm] = useState({
    email: "chaemin@example.com",
    name: "김채민",
    birth: "2002-07-14",
    nickname: "닉채민",
    intro: "You can make anything by writing.",
    profile: "https://i.pravatar.cc/120?img=8",
  });
  const [tempForm, setTempForm] = useState(form);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleChange = (field: string, value: string) =>
    setTempForm((prev) => ({ ...prev, [field]: value }));

  const handleEditClick = () => setIsEditMode(true);
  const handleCancelClick = () => setIsCancelModalOpen(true);
  const handleConfirmCancel = () => {
    setTempForm(form);
    setIsEditMode(false);
    setIsCancelModalOpen(false);
  };

  const handleSaveClick = () => {
    setForm(tempForm);
    setIsEditMode(false);
    navigate("/mypage", { state: { toastMessage: "저장되었습니다!" } });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setTempForm((prev) => ({ ...prev, profile: reader.result as string }));
    reader.readAsDataURL(file);
  };

  type FormFieldKey = keyof typeof form;

  const formFields = [
    { title: "이메일", field: "email", placeholder: "이메일", type: "text" },
    ...(loginType === "email"
      ? [
          { title: "비밀번호", field: "password", placeholder: "......", type: "password" },
          {
            title: "비밀번호 확인",
            field: "passwordConfirm",
            placeholder: "......",
            type: "password",
          },
        ]
      : []),
    { title: "이름", field: "name", placeholder: "이름", type: "text" },
    { title: "생년월일", field: "birth", placeholder: "YYYY-MM-DD", type: "text" },
  ];

  return (
    <div className={S.container}>
      <div className="fixed top-0 left-0 z-50 w-full">
        <Header
          title="GITLOG"
          variant={isEditMode ? "saveCancel" : "edit"}
          onMenuClick={() => setIsSidebarOpen(true)}
          onEditClick={handleEditClick}
          onCancelClick={handleCancelClick}
          onSaveClick={handleSaveClick}
        />
      </div>
      <div className="h-[60px]" />

      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)} />
          <aside className="animate-slideIn fixed top-0 left-0 z-50 h-full w-64">
            <Sidebar variant="user" onLogoutClick={handleLogoutClick} />
          </aside>
        </>
      )}

      <section className={S.profileSection}>
        <div className={S.profileSectionInner}>
          <div className={S.avatarWrapper}>
            <Avatar src={tempForm.profile} alt="프로필 이미지" size="lg" />
            {isEditMode && (
              <>
                <button className={S.addIconButton} onClick={() => fileInputRef.current?.click()}>
                  <PlusIcon width={22} height={22} />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </>
            )}
          </div>

          <main className={S.profileHeader}>
            <TextFieldSet
              variant="backless"
              size="lg"
              className={S.nickname}
              value={tempForm.nickname}
              helperText="20자 이내"
              disabled={!isEditMode}
              onChange={(e) => handleChange("nickname", e.target.value)}
            />
            <TextFieldSet
              variant="backless"
              value={tempForm.intro}
              disabled={!isEditMode}
              onChange={(e) => handleChange("intro", e.target.value)}
            />
          </main>
        </div>
      </section>

      <main className={S.formWrapper}>
        {loginType === "kakao" && (
          <div className={S.socialWrapper}>
            <KakaoIcon className={S.kakaoIcon} />
            <TextField value="카카오 로그인" disabled fullWidth className={S.kakaoTextField} />
          </div>
        )}

        {formFields.map(({ title, field, placeholder, type }) => (
          <TextFieldSet
            key={field}
            title={title}
            placeholder={placeholder}
            type={type}
            value={tempForm[field as FormFieldKey] ?? ""}
            disabled={!isEditMode}
            onChange={(e) => handleChange(field as FormFieldKey, e.target.value)}
          />
        ))}
      </main>

      <Modal
        open={isCancelModalOpen}
        title="변경을 취소하시겠습니까?"
        description="지금까지의 수정 내용이 저장되지 않습니다."
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        confirmText="취소하기"
        cancelText="계속 수정하기"
        confirmColor="bg-brand-red text-white hover:opacity-90"
      />

      <Modal
        open={isLogoutModalOpen}
        title="로그아웃을 진행할게요."
        onClose={handleCloseLogoutModal}
        onConfirm={handleConfirmLogout}
        confirmText="로그아웃"
        cancelText="취소"
        confirmColor="bg-brand-blue text-white hover:opacity-90"
      />
    </div>
  );
}
