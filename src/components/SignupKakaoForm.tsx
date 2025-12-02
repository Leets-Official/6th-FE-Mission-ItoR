import React from 'react';
import TextFieldSet from './TextFieldSet';
import Profile from '@/assets/svgs/Profile.svg?react';
import KakaoIcon from '@/assets/svgs/kakao.svg?react';
import { S } from '@/styles/SignupKakao.styles';
import { FormState } from '@/hooks/useSignupKakao';

interface SignupKakaoFormProps {
  form: FormState;
  errors: Record<string, string>;
  isUploading: boolean;
  isSubmitting: boolean;
  onProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (key: keyof FormState, value: string) => void;
  onSubmit: () => void;
}

const SignupKakaoForm: React.FC<SignupKakaoFormProps> = ({
  form,
  errors,
  isUploading,
  isSubmitting,
  onProfileChange,
  onChange,
  onSubmit,
}) => {
  return (
    <>
      <div className={S.profileUploadContainer}>
        <div className={S.profileUploadInner}>
          <div className={S.profileUploadTitle}>프로필 사진</div>
          {form.profilePicture ? (
            <img src={form.profilePicture} alt="프로필" className={S.profileImage} />
          ) : (
            <Profile className={S.profileImage} />
          )}
          <label className={S.profileUploadLabel}>
            {isUploading ? '업로드 중...' : '프로필 사진 추가'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onProfileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      <div className={S.formContainer}>
        <div className={S.formInner}>
          <TextFieldSet
            label="소셜로그인"
            value="카카오 로그인"
            disabled={true}
            icon={<KakaoIcon className="w-5 h-5" />}
            inputClassName={S.socialLoginInput}
            className={S.socialLoginSet}
            size="sm"
          />
          <TextFieldSet
            label="이메일"
            value={form.email}
            placeholder="이메일"
            onChange={(v) => onChange('email', v)}
          />
          <TextFieldSet
            label="이름"
            value={form.name}
            placeholder="이름"
            onChange={(v) => onChange('name', v)}
          />
          <TextFieldSet
            label="생년월일"
            value={form.birthDate}
            placeholder="YYYY-MM-DD"
            onChange={(v) => onChange('birthDate', v)}
          />
          <TextFieldSet
            label="닉네임"
            value={form.nickname}
            placeholder="닉네임 (최대 20자)"
            onChange={(v) => onChange('nickname', v)}
          />
          <TextFieldSet
            label="한 줄 소개"
            value={form.introduction}
            placeholder="한 줄 소개 (최대 30자)"
            onChange={(v) => onChange('introduction', v)}
          />

          {Object.keys(errors).length > 0 && (
            <div className={S.errorContainer}>
              {Object.values(errors).map((error, idx) => (
                <div key={idx}>• {error}</div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className={S.submitButton}
          >
            {isSubmitting ? '가입 중...' : '회원가입 완료'}
          </button>
        </div>
      </div>
    </>
  );
};

export default SignupKakaoForm;
