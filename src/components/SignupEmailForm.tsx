import React from "react";
import TextFieldSet from "./TextFieldSet";
import Profile from "@/assets/svgs/Profile.svg?react";
import { S } from "@/styles/SignupEmail.styles";

type Field = {
  key: string;
  label: string;
  placeholder: string;
};

interface SignupEmailFormProps {
  form: Record<string, any>;
  setForm: (form: any) => void;
  errors: Record<string, string>;
  isUploading: boolean;
  isSubmitting: boolean;
  fields: readonly Field[];
  onProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const SignupEmailForm: React.FC<SignupEmailFormProps> = ({
  form,
  setForm,
  errors,
  isUploading,
  isSubmitting,
  fields,
  onProfileChange,
  onSubmit,
}) => {
  return (
    <>
      <div className={S.profileUploadContainer}>
        <div className={S.profileUploadInner}>
          {form.profilePicture ? (
            <img
              src={form.profilePicture}
              alt="프로필"
              className={S.profileImage}
            />
          ) : (
            <Profile className={S.profileImage} />
          )}
          <label className={S.profileUploadLabel}>
            {isUploading ? "업로드 중..." : "프로필 사진 추가"}
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
          {fields.map(({ key, label, placeholder }) => (
            <div key={key}>
              <TextFieldSet
                label={label}
                value={form[key as keyof typeof form]}
                placeholder={placeholder}
                onChange={(v) => setForm({ ...form, [key]: v })}
                type={key.includes("password") ? "password" : "text"}
              />
              {errors[key] && <p className={S.errorText}>{errors[key]}</p>}
            </div>
          ))}

          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className={S.submitButton}
          >
            {isSubmitting ? "가입 중..." : "회원가입 완료"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SignupEmailForm;
