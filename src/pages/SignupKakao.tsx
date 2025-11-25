import React from "react";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import SignupKakaoForm from "@/components/SignupKakaoForm";
import { useSignupKakao } from "@/hooks/useSignupKakao";
import { S } from "@/styles/SignupKakao.styles";

const SignupKakao: React.FC = () => {
  const {
    form,
    errors,
    showModal,
    isSubmitting,
    isUploading,
    setShowModal,
    navigate,
    handleChange,
    handleSubmit,
    handleProfileChange,
  } = useSignupKakao();

  return (
    <div className={S.pageContainer}>
      <Header variant="none" />

      <div className={S.titleContainer}>
        <h1 className={S.titleHeader}>카카오 회원가입</h1>
        <p className={S.titleSubtext}>
          부족한 정보를 입력하고 회원가입을 완료해주세요.
        </p>
      </div>

      <SignupKakaoForm
        form={form}
        errors={errors}
        isUploading={isUploading}
        isSubmitting={isSubmitting}
        onProfileChange={handleProfileChange}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {showModal && (
        <div className={S.modalOverlay}>
          <Modal
            titleLine1="회원가입이 완료되었습니다!"
            onClose={() => {
              setShowModal(false);
              navigate("/", { replace: true });
            }}
            onConfirm={() => navigate("/", { replace: true })}
            cancelText="확인"
            confirmText="메인으로 가기"
            variant="info"
          />
        </div>
      )}
    </div>
  );
};

export default SignupKakao;