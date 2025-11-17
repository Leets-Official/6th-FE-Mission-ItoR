import React, { useState, useRef, useEffect } from "react";
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
import { useUserStore, type User } from "@/store/useUserStore";
import { updateUserInfo } from "@/api/userApi";
import { useToast } from "@/contexts/ToastContext";

export default function MyPageSetting() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user, setUser } = useUserStore();
  const { showToast } = useToast();

  const loginType = user?.loginType ?? "email";

  const { isLogoutModalOpen, handleLogoutClick, handleConfirmLogout, handleCloseLogoutModal } =
    useLogout();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  type FormState = {
    email: string;
    name: string;
    birth: string;
    nickname: string;
    intro: string;
    profile: string;
  };

  const emptyForm: FormState = {
    email: "",
    name: "",
    birth: "",
    nickname: "",
    intro: "",
    profile: "",
  };

  const [form, setForm] = useState<FormState>(emptyForm);
  const [tempForm, setTempForm] = useState<FormState>(emptyForm);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loaded: FormState = {
      email: user.email,
      name: user.name,
      birth: user.birthDate,
      nickname: user.nickname,
      intro: user.introduction,
      profile: user.profilePicture,
    };

    setForm(loaded);
    setTempForm(loaded);
  }, [user]);

  const handleChange = (field: keyof FormState, value: string) =>
    setTempForm((prev) => ({ ...prev, [field]: value }));

  const handleEditClick = () => setIsEditMode(true);

  const handleCancelClick = () => setIsCancelModalOpen(true);

  const handleConfirmCancel = () => {
    setTempForm(form);
    setIsEditMode(false);
    setIsCancelModalOpen(false);
  };

  const handleSaveClick = async () => {
    try {
      await updateUserInfo({
        email: tempForm.email,
        name: tempForm.name,
        birthDate: tempForm.birth,
        nickname: tempForm.nickname,
        introduction: tempForm.intro,
        profilePicture: tempForm.profile,
      });

      const updated: User = {
        id: user?.id ?? 0,
        email: tempForm.email,
        name: tempForm.name,
        birthDate: tempForm.birth,
        nickname: tempForm.nickname,
        introduction: tempForm.intro,
        profilePicture: tempForm.profile,
        loginType: user?.loginType ?? "email",
      };

      setUser(updated);
      setForm(tempForm);
      setIsEditMode(false);

      navigate("/mypage", { state: { toastMessage: "저장되었습니다!" } });
    } catch {
      showToast("수정 중 오류가 발생했습니다.", "error");
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setTempForm((prev) => ({ ...prev, profile: reader.result as string }));
    reader.readAsDataURL(file);
  };

  type BaseField = {
    title: string;
    field: keyof FormState;
    placeholder: string;
    type: string;
  };

  const BASE_FIELDS: BaseField[] = [
    { title: "이메일", field: "email", placeholder: "이메일", type: "text" },
    { title: "이름", field: "name", placeholder: "이름", type: "text" },
    { title: "생년월일", field: "birth", placeholder: "YYYY-MM-DD", type: "text" },
  ];

  const RENDER_FIELDS = BASE_FIELDS;

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

        {RENDER_FIELDS.map(({ title, field, placeholder, type }) => (
          <TextFieldSet
            key={field}
            title={title}
            placeholder={placeholder}
            type={type}
            value={tempForm[field]}
            disabled={!isEditMode}
            onChange={(e) => handleChange(field, e.target.value)}
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
      />

      <Modal
        open={isLogoutModalOpen}
        title="로그아웃을 진행할게요."
        onClose={handleCloseLogoutModal}
        onConfirm={handleConfirmLogout}
        confirmText="로그아웃"
        cancelText="취소"
      />
    </div>
  );
}
