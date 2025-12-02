import React from 'react';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import SignupEmailForm from '@/components/SignupEmailForm';
import { useSignupEmail } from '@/hooks/useSignupEmail';
import { S } from '@/styles/SignupEmail.styles';

const SignupEmail: React.FC = () => {
  const {
    form,
    setForm,
    errors,
    showModal,
    setShowModal,
    isSubmitting,
    isUploading,
    navigate,
    handleSubmit,
    handleProfileChange,
    fields,
  } = useSignupEmail();

  return (
    <div className={S.pageContainer}>
      <Header variant="none" />

      <div className={S.titleContainer}>
        <h1 className={S.titleHeader}>회원가입</h1>
        <p className={S.titleSubtext}>가입을 위해 회원님의 정보를 입력해주세요.</p>
      </div>

      <SignupEmailForm
        form={form}
        setForm={setForm}
        errors={errors}
        isUploading={isUploading}
        isSubmitting={isSubmitting}
        fields={fields}
        onProfileChange={handleProfileChange}
        onSubmit={handleSubmit}
      />

      {showModal && (
        <div className={S.modalOverlay}>
          <Modal
            titleLine1="회원가입이 완료되었습니다!"
            onClose={() => setShowModal(false)}
            onConfirm={() => navigate('/login')}
            cancelText="확인"
            confirmText="로그인하기"
            variant="info"
          />
        </div>
      )}
    </div>
  );
};

export default SignupEmail;
